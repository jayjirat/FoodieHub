import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export const useFoodStore = defineStore("food", {
  state: () => ({
    foods: [],
    isLoading: false,
  }),
  actions: {
    async getFood(resID) {
      this.isLoading = true;
      const resRef = doc(db, "restaurant", resID);
      const resSnapshot = await getDoc(resRef);
      const foodData = resSnapshot.data().foods;
      this.foods = foodData;
      this.isLoading = false;
    },
  },
});
