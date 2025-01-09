<script setup>
import { onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import OwnerLayout from "@/layouts/OwnerLayout.vue";

import { useRestaurantStore } from "@/stores/owner/restaurantStore";

const restaurantStore = useRestaurantStore();
const route = useRoute();
const rID = route.params.id;

onMounted(async () => {
  await restaurantStore.loadRestaurant();
  restaurantStore.getRestaurant(rID);
});

const toggleStatus = async (status) => {
  await restaurantStore.toggleRestaurant(rID, status);
};
</script>

<template>
  <OwnerLayout>
    <div class="p-4">
      <div class="flex flex-row justify-between m-4">
        <div class="text-4xl">
          {{ restaurantStore.selectedRestaurant.name }}
          <span class="text-lg ml-2"
            >Status: {{ restaurantStore.selectedRestaurant.status }}</span
          >
        </div>
        <div class="flex gap-2 flex-col md:flex-row">
          <RouterLink
            :to="{
              name: 'owner-manage-view',
            }"
            class="btn"
            >Back</RouterLink
          >
          <button
            class="btn btn-primary btn-wide"
            @click="toggleStatus(restaurantStore.selectedRestaurant.status)"
            type="button"
          >
            {{
              restaurantStore.selectedRestaurant.status === "open"
                ? "Close restaurant"
                : "Open restaurant"
            }}
          </button>
        </div>
      </div>
      <div class="pl-4">
        <button class="btn btn-neutral mr-2">Add food</button
        ><RouterLink
          :to="{
            name: 'owner-edit-view',
            params: { id: rID },
          }"
          class="btn btn-accent"
          >Edit restaurant</RouterLink
        >
      </div>
      <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div
          class="card bg-base-100 w-96 md:w-60 lg:w-96 shadow-xl"
          v-for="(food, index) in restaurantStore.selectedRestaurant.foods"
          :key="index"
        >
          <figure class="m-4">
            <img :src="food.imageUrl" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ food.name }}</h2>
            <p>Saled: {{ food.saled }}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" type="button">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </OwnerLayout>
</template>
