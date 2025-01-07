<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

import UserLayout from "@/layouts/UserLayout.vue";
import { useRestaurantStore } from "@/stores/restaurantStore";

const restaurantStore = useRestaurantStore();

onMounted(() => {
  // Mock api
  restaurantStore.loadRestaurant();
});
</script>

<template>
  <UserLayout>
    <div class="hero bg-base-200 h-96">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Foodie Hub</h1>
          <p class="py-6">
            Satisfy your cravings with the best meals in town. Browse, order,
            and enjoy delicious food delivered straight to your door.
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col m-12">
      <div
        class="card bg-base-100 w-full shadow-xl my-2"
        v-for="(res, index) in restaurantStore.restaurants"
        :key="index"
      >
        <div class="card-body">
          <h2 class="card-title">{{ res.name }}</h2>
          <p>{{ res.description }}</p>
          <div class="card-actions justify-end">
            <RouterLink
              :to="{
                name: 'restaurant',
                params: {
                  id: res.rID,
                },
              }"
              class="btn btn-primary"
              >Go to restaurant</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
