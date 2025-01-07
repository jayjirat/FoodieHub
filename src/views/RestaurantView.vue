<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";

import UserLayout from "@/layouts/UserLayout.vue";
import { useRestaurantStore } from "@/stores/restaurant";

const restaurantStore = useRestaurantStore();
const route = useRoute();

onMounted(() => {
  // Mock api
  restaurantStore.getRestaurant(parseInt(route.params.id));
});
</script>

<template>
  <UserLayout>
    <div class="m-4">
      <div class="text-2xl font-bold text-center">
        {{ restaurantStore.selectedRestaurant.name }}
      </div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 lg:grid-cols-3">
        <div
          class="card bg-base-100 w-96 shadow-xl m-4"
          v-for="(food, index) in restaurantStore.selectedRestaurant.foods"
          :key="index"
        >
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ food }}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
