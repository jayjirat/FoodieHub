<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";

import UserLayout from "@/layouts/UserLayout.vue";
import { useRestaurantStore } from "@/stores/restaurantStore";
import { useFoodStore } from "@/stores/foodStore";

const restaurantStore = useRestaurantStore();
const foodStore = useFoodStore();
const route = useRoute();

onMounted(() => {
  // Mock api
  restaurantStore.getRestaurant(parseInt(route.params.id));
  foodStore.getFood(parseInt(route.params.id));
});
</script>

<template>
  <UserLayout>
    <div class="m-4">
      <div class="flex flex-row w-full justify-between">
        <div class="text-2xl font-bold flex-1">
          Restaurant: {{ restaurantStore.selectedRestaurant.name }}
        </div>
        <div class="flex flex-col">
          <div>
            Time open: {{ restaurantStore.selectedRestaurant.time_open }}
          </div>
          <div>
            Time close: {{ restaurantStore.selectedRestaurant.time_close }}
          </div>
        </div>
        <div></div>
      </div>
      <div class="divider"></div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4">
        <div
          class="card bg-base-100 w-96 shadow-xl m-4 p-0"
          v-for="(food, index) in foodStore.selectedFood.foods"
          :key="index"
        >
          <figure>
            <img :src="food.imageUrl" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ food.name }}</h2>
            <p>${{ food.price }}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
