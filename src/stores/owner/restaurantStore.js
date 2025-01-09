import { ref, computed } from "vue";
import { defineStore } from "pinia";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";

import { useAccountStore } from "../account";

export const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    restaurants: [],
    selectedRestaurant: {},
    isLoading: false,
  }),
  actions: {
    async loadRestaurant() {
      const accountStore = useAccountStore();

      this.isLoading = true;
      let restaurantCol = query(
        collection(db, "restaurant"),
        where("owner", "==", accountStore.user.uid)
      );

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
    async createRestaurant(resData) {
      const newRes = {
        ...resData,
        owner: useAccountStore().user.uid,
        status: "open",
        createdAt: new Date(),
        updatedAt: new Date(),
        rate: 0,
        reviewer: 0,
        score: 0,
        foods: [],
      };

      try {
        const resCol = collection(db, "restaurant");
        await addDoc(resCol, newRes);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async deleteRestaurant(resID) {
      try {
        const resRef = doc(db, "restaurant", resID);
        await deleteDoc(resRef);
        this.restaurants = this.restaurants.filter((res) => res.rID !== resID);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async updateRestaurant(resID, resData) {
      try {
        const resRef = doc(db, "restaurant", resID);
        const updateData = {
          ...resData,
          updatedAt: new Date(),
        };
        await updateDoc(resRef, updateData);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async toggleRestaurant(resID, status) {
      let newStatus = status === "open" ? "close" : "open";
      const resRef = doc(db, "restaurant", resID);
      await updateDoc(resRef, { status: newStatus });

      const restaurant = this.restaurants.find((res) => res.rID === resID);
      if (restaurant) {
        restaurant.status = newStatus;
      }
    },
  },
});
