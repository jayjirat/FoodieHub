import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { useRestaurantStore } from "@/stores/user/restaurantStore";

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
  },

  actions: {
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

    updateCart(cartData) {
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
  },
});
