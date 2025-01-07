import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    restaurants: [
      {
        rID: 1,
        name: "res1",
        description: "test1",
        time_open: new Date().toISOString(),
        time_close: new Date().toISOString(),
      },
      {
        rID: 2,
        name: "res2",
        description: "test2",
        time_open: new Date().toISOString(),
        time_close: new Date().toISOString(),
      },
    ],
    selectedRestaurant: {},
  }),
  actions: {
    loadRestaurant() {
      return this.restaurants;
    },
    getRestaurant(resId) {
      return (this.selectedRestaurant = this.restaurants.find(
        (res) => res.rID === resId
      ));
    },
  },
});
