import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    restaurant: [
      {
        id: 1,
        name: "res1",
        foods: ["hambergur", "chicken"],
        description: "test1",
      },
      {
        id: 2,
        name: "res2",
        foods: ["hambergur", "chicken"],
        description: "test2",
      },
      {
        id: 3,
        name: "res3",
        foods: ["hambergur", "chicken"],
        description: "test3",
      },
    ],
    selectedRestaurant: {},
  }),
  actions: {
    loadRestaurant() {
      return this.restaurant;
    },
    getRestaurant(resId) {
      return (this.selectedRestaurant = this.restaurant.find(
        (res) => res.id === resId
      ));
    },
  },
});
