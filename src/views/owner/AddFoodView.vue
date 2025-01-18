<script setup>
import { onMounted, ref, computed } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import OwnerLayout from "@/layouts/OwnerLayout.vue";

import { useRestaurantStore } from "@/stores/owner/restaurantStore";
import { useEventStore } from "@/stores/event";

import { storage } from "@/firebase";
import {
  ref as sRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const restaurantStore = useRestaurantStore();
const eventStore = useEventStore();
const router = useRouter();
const route = useRoute();
const editImg = ref(false);

const name = ref("");
const price = ref(0);
const quantity = ref(0);
const imageUrl = ref("");
let fID = undefined;
const rID = route.params.rID;

const mode = ref("add");

const backRoute = () => {
  router.push({
    name: "owner-restaurant-view",
    params: { id: rID },
  });
};

const smthFood = async () => {
  const foodData = {
    fID,
    name: name.value,
    price: price.value,
    quantity: quantity.value,
  };

  if (mode.value === "add") {
    try {
      foodData.imageUrl =
        imageUrl.value ||
        "https://t4.ftcdn.net/jpg/02/20/23/75/360_F_220237587_kxc7veNNrvvzwcPjSf9yZHzzMiE2ER0p.jpg";

      await restaurantStore.addFood(foodData, rID);
    } catch (error) {
      console.error(error.message);
    }
  } else if (mode.value === "edit") {
    try {
      if (editImg.value) {
        foodData.imageUrl = imageUrl.value;
      }
      await restaurantStore.updateFood(rID, fID, foodData);
    } catch (error) {
      console.error(error);
    }
  }
  backRoute();
  eventStore.popup(`${mode.value} food successfully`, "info");
};

const deleteFood = async () => {
  console.log(fID);

  if (fID) {
    const result = confirm("Are you sure you want to delete");
    if (result) {
      await restaurantStore.deleteFood(rID, fID);
      backRoute();
      eventStore.popup("Delete successfully", "error");
    }
  }
};

const handleFile = async (event) => {
  const file = event.target.files[0];

  if (file) {
    if (fID) {
      const storageRef = sRef(storage, `restaurants/${rID}/${fID}/foodImg.png`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      imageUrl.value = downloadURL;
      editImg.value = true;
    }
  }
};

onMounted(async () => {
  if (route.params.fID) {
    mode.value = "edit";
    fID = parseInt(route.params.fID);
    await restaurantStore.getFood(rID, fID);

    name.value = restaurantStore.selectedFood.name;
    price.value = restaurantStore.selectedFood.price;
    quantity.value = restaurantStore.selectedFood.quantity;
  } else {
    fID = await restaurantStore.getfID(route.params.rID);
  }
});
</script>

<template>
  <OwnerLayout>
    <div class="flex items-center justify-center min-h-screen ">
      <div class="w-full max-w-lg shadow-lg rounded-lg p-6">
        <h1 class="text-3xl font-bold text-center mb-6">
          {{ mode === "add" ? "Add" : "Edit" }} Food
        </h1>
        <form class="space-y-4">
          <!-- Restaurant Name -->
          <label class="form-control w-full">
            <span class="label-text font-semibold">Food Name</span>
            <input
              type="text"
              placeholder="Enter food name"
              class="input input-bordered w-full"
              v-model="name"
            />
          </label>

          <!-- Price -->
          <label class="form-control w-full">
            <span class="label-text font-semibold">Price</span>
            <input
              type="number"
              class="input input-bordered w-full"
              v-model="price"
            />
          </label>

          <!-- Quantity -->
          <label class="form-control w-full">
            <span class="label-text font-semibold">Quantity</span>
            <input
              type="number"
              class="input input-bordered w-full"
              v-model="quantity"
            />
          </label>

          <!-- Image Url -->
          <label class="form-control w-full">
            <span class="label-text font-semibold">Image</span>
            <input
              type="file"
              class="file-input file-input-bordered w-full mb-4"
              @change="handleFile"
            />
          </label>

          <!-- Buttons -->
          <div class="flex justify-between items-center mt-6">
            <RouterLink
              :to="{
                name: 'owner-restaurant-view',
                params: { id: rID },
              }"
              type="button"
              class="btn btn-neutral w-1/2"
              >Back</RouterLink
            >
            <button
              type="button"
              @click="smthFood"
              class="btn btn-primary w-1/2 ml-1"
            >
              {{ mode === "add" ? "Add" : "Edit" }}
            </button>
          </div>
          <button
            @click="deleteFood"
            v-if="mode === 'edit'"
            class="btn btn-secondary w-full"
            type="button"
          >
            Delete Food
          </button>
        </form>
      </div>
    </div>
  </OwnerLayout>
</template>
