import { ref, computed } from "vue";
import { defineStore } from "pinia";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/firebase";

import { useAccountStore } from "../account";

export const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    restaurants: [],
    selectedRestaurant: {},
    selectedFood: {},
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
    async getfID(resID) {
      const resCol = doc(db, "restaurant", resID);
      const resSnapshot = await getDoc(resCol);
      const restaurantData = resSnapshot.data();
      const foodData = restaurantData.foods || [];
      if (foodData.length > 0) {
        const maxfID = foodData.reduce(
          (max, food) => Math.max(max, food.fID || 0),
          0
        );
        return maxfID + 1;
      } else {
        return 1;
      }
    },
    async addFood(foodData, resID) {
      const newFood = {
        ...foodData,
        remainQuantity: foodData.quantity,
        saled: 0,
      };

      const resRef = doc(db, "restaurant", resID);
      try {
        await updateDoc(resRef, {
          foods: arrayUnion(newFood),
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async getFood(resID, foodID) {
      try {
        const resRef = doc(db, "restaurant", resID);
        const resSnapshot = await getDoc(resRef);
        const foodData = resSnapshot.data().foods;
        this.selectedFood = foodData.find((food) => food.fID === foodID);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deleteFood(resID, foodID) {
      try {
        const resRef = doc(db, "restaurant", resID);
        const resSnapshot = await getDoc(resRef);
        const foodData = resSnapshot.data().foods;

        const foodIndex = foodData.findIndex((food) => food.fID === foodID);

        if (foodIndex === -1) {
          throw new Error(`Food with ID ${foodID} not found`);
        }
        foodData.splice(foodIndex, 1);

        await updateDoc(resRef, {
          foods: foodData,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateFood(resID, foodID, foodData) {
      try {
        const resRef = doc(db, "restaurant", resID);
        const resSnapshot = await getDoc(resRef);
        const foods = resSnapshot.data().foods;

        const foodIndex = foods.findIndex((food) => food.fID === foodID);

        if (foodIndex === -1) {
          throw new Error(`Food with ID ${foodID} not found`);
        }
        
        foods[foodIndex] = { ...foods[foodIndex], ...foodData };

        await updateDoc(resRef, {
          foods: foods,
        });
        
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
});
