const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const app = express();

const { db, auth } = require("./firebaseConfig.js");

const omise = require("omise")({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2019-05-29",
});

const createCharge = (source, amount, orderId) => {
  return new Promise((resolve, reject) => {
    omise.charges.create(
      {
        amount: amount * 100,
        currency: "THB",
        return_uri: `http://localhost:5173/process?order_id=${orderId}`,
        metadata: {
          orderId,
        },
        source,
      },
      (err, resp) => {
        if (err) {
          return reject(err);
        }
        resolve(resp);
      }
    );
  });
};

app.post("/placeorder", async (req, res) => {
  try {
    const idToken = req.headers.authorization;
    const checkoutData = req.body.checkout;
    const sourceOmise = req.body.source;
    let userUid = "";
    if (idToken) {
      const decodedToken = await auth.verifyIdToken(idToken);
      userUid = decodedToken.uid;
    }

    let summaryPrice = 0;
    let successOrderId = "";
    let omiseResponse = {};

    await db.runTransaction(async (transaction) => {
      // decrease food's quantity
      for (const order of checkoutData.lists) {
        const resRef = db.collection("restaurant").doc(order.rID);
        const resSnapshot = await resRef.get();
        const resData = resSnapshot.data();

        resData.foods = resData.foods.map((food) => {
          const matchedFood = order.foods.find((o) => o.fID === food.fID);
          if (matchedFood) {
            const remain = food.remainQuantity - matchedFood.quantity;
            if (remain < 0) {
              throw new Error(`Not enough quantity for food ${food.name}`);
            }
            summaryPrice += food.price * matchedFood.quantity;

            return {
              ...food,
              remainQuantity: remain,
            };
          }
          return food;
        });
        transaction.update(resRef, { foods: resData.foods });
      }

      // write order to database
      const orderRef = db.collection("orders");
      const orderId = orderRef.doc().id;

      omiseResponse = await createCharge(sourceOmise, summaryPrice, orderId);

      const orderData = {
        chargeId: omiseResponse.id, // omise charge
        email: checkoutData.email,
        address: checkoutData.address,
        name: checkoutData.name,
        tel: checkoutData.tel,
        summaryPrice,
        orderId,
        foods: checkoutData.lists,
        paymentMethod: "rabbit_linepay",
        createdAt: new Date(),
        status: "pending",
        userUid,
      };

      transaction.set(orderRef.doc(orderId), orderData);

      successOrderId = orderId;
    });

    res.json({
      message: "Order successful!",
      successOrderId,
      redirectUrl: omiseResponse.authorize_uri, // หน้าจ่ายเงิน
    });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({
      error: error.message || "Failed to place order.",
    });
  }
});

app.post("/webhook", async (req, res) => {
  console.log(req.body);

  try {
    if (req.body.key === "charge.complete") {
      const webhookData = req.body.data;

      const orderId = webhookData.metadata.orderId;
      const chargeId = webhookData.id;
      const status = webhookData.status;

      const orderRef = db.collection("orders").doc(orderId);
      const orderSnapshot = await orderRef.get();
      const orderData = orderSnapshot.data();

      // Wrong order data
      if (orderData.chargeId !== chargeId) {
        throw new Error("Charge not found");
      }

      if (orderData.status === "pending") {
        await orderRef.update({
          status: status,
        });
      }
      console.log(orderData.foods);

      if (status !== "successful") {
        db.runTransaction(async (transaction) => {
          for (const order of orderData.foods) {
            const resRef = db.collection("restaurant").doc(order.rID);
            const resSnapshot = await resRef.get();
            const resData = resSnapshot.data();

            resData.foods = resData.foods.map((food) => {
              const orderFood = order.foods.find(
                (orderItem) => orderItem.fID === food.fID
              );
              if (orderFood) {
                return {
                  ...food,
                  remainQuantity: food.remainQuantity + orderFood.quantity,
                };
              }
              return food;
            });

            transaction.update(resRef, { foods: resData.foods });
          }
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

exports.api = onRequest(app);
