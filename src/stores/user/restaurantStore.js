import { ref, computed } from "vue";
import { defineStore } from "pinia";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";

export const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    restaurants: [],
    selectedRestaurant: {},
    isLoading: false,
    query: {
      search: "",
      orderedBy: "",
    },
  }),
  actions: {
    async loadRestaurant() {
      this.isLoading = true;
      let restaurantCol = collection(db, "restaurant");

      if (this.query.search) {
        restaurantCol = query(
          restaurantCol,
          where("name", "==", this.query.search)
        );
      }

      if (this.query.orderedBy) {
        restaurantCol = query(
          restaurantCol,
          orderBy(this.query.orderedBy, "desc")
        );
      }

      const restaurantSnapshot = await getDocs(restaurantCol);
      const restaurantList = restaurantSnapshot.docs.map((doc) => {
        const convertedData = doc.data();
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
