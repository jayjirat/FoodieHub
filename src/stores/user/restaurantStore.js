import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    restaurants: [],
    selectedRestaurant: {},
    isLoading: false,
  }),
  actions: {
    async loadRestaurant() {
      this.isLoading = true;
      const restaurantCol = collection(db, "restaurant");
      const restaurantSnapshot = await getDocs(restaurantCol);
      const restaurantList = restaurantSnapshot.docs.map((doc) => {
        const convertedData = doc.data();
        convertedData.time_open = convertedData.time_open.toDate();
        convertedData.time_close = convertedData.time_close.toDate();
        convertedData.rID = doc.id;
        this.isLoading = false;
        return convertedData;
      });

      if (restaurantList && restaurantList.length > 0) {
        this.restaurants = restaurantList;
      }
    },
    getRestaurant(resId) {
      this.selectedRestaurant = this.restaurants.find(
        (res) => res.rID === resId
      );
    },
  },
});
