import { defineStore } from "pinia";

import { db, realtimeDB } from "@/firebase";

import { useRestaurantStore } from "@/stores/user/restaurantStore";
import { useAccountStore } from "@/stores/account";

import { onValue, ref, set } from "firebase/database";
import axios from "axios";

Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY);

const createSource = (amount) => {
  return new Promise((resolve, reject) => {
    Omise.createSource(
      "rabbit_linepay",
      {
        amount: amount * 100,
        currency: "THB",
      },
      (statusCode, response) => {
        if (statusCode !== 200) {
          return reject(response);
        }
        resolve(response);
      }
    );
  });
};

export const useCartStore = defineStore("cart", {
  state: () => ({
    carts: [],
  }),
  getters: {
    summaryAllPrice(state) {
      return state.carts.reduce((total, cart) => {
        return (
          total +
          cart.foods.reduce(
            (subTotal, food) => subTotal + food.price * food.quantity,
            0
          )
        );
      }, 0);
    },
    summaryAllQuantity(state) {
      return state.carts.reduce((total, cart) => {
        return (
          total +
          cart.foods.reduce((subTotal, food) => subTotal + food.quantity, 0)
        );
      }, 0);
    },
    user(state) {
      const accountStore = useAccountStore();
      return accountStore.user;
    },
    cartRef(state) {
      return ref(realtimeDB, `carts/${this.user.uid}`);
    },
  },

  actions: {
    async loadCart() {
      if (this.user.uid) {
        onValue(this.cartRef, (snapshot) => {
          const data = snapshot.val();
          this.carts = data || [];
        });
      }
    },
    addToCart(food, rID) {
      const restaurantStore = useRestaurantStore();
      const name = restaurantStore.restaurants.find((r) => r.rID === rID).name;

      const cartData = {
        rID,
        name,
        foods: [
          {
            fID: food.fID,
            name: food.name,
            price: food.price,
            quantity: 1,
          },
        ],
      };

      this.updateCart(cartData);
    },

    async updateCart(cartData) {
      const existingResIndex = this.carts.findIndex(
        (cart) => cart.rID === cartData.rID
      );

      if (existingResIndex != -1) {
        const existingRes = this.carts[existingResIndex];

        const existingFoodIndex = existingRes.foods.findIndex(
          (food) => food.fID === cartData.foods[0].fID
        );

        if (existingFoodIndex != -1) {
          existingRes.foods[existingFoodIndex].quantity++;
        } else {
          existingRes.foods.push(...cartData.foods);
        }
      } else {
        this.carts.push(cartData);
      }

      await set(this.cartRef, this.carts);
    },

    summaryPriceByRes(rID) {
      const resCart = this.carts.find((cart) => cart.rID === rID);

      return resCart.foods.reduce(
        (total, food) => total + food.price * food.quantity,
        0
      );
    },

    summaryQuantityByRes(rID) {
      const resCart = this.carts.find((cart) => cart.rID === rID);

      return resCart.foods.reduce((total, food) => total + food.quantity, 0);
    },

    async deleteCart(rID, fID) {
      const resCart = this.carts.find((cart) => cart.rID === rID);
      const foodIndex = resCart.foods.findIndex((food) => food.fID === fID);
      if (foodIndex != -1) {
        resCart.foods.splice(foodIndex, 1);
        if (resCart.foods.length === 0) {
          const cartIndex = this.carts.findIndex((cart) => cart.rID === rID);
          if (cartIndex != -1) {
            this.carts.splice(cartIndex, 1);
          }
        }
      }
      await set(this.cartRef, this.carts);
    },

    async checkout(checkoutData) {
      try {
        const omiseResponse = await createSource(this.summaryAllPrice);

        const response = await axios.post(
          "/api/placeorder",
          {
            source: omiseResponse.id, // Omise source token
            checkout: checkoutData,
          },
          {
            headers: {
              Authorization: this.user.accessToken,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error.message);
      }
    },

    async clearCart() {
      await set(this.cartRef, []);
      this.carts = [];
    },
  },
});
