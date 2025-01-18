<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";

import UserLayout from "@/layouts/UserLayout.vue";
import { useRestaurantStore } from "@/stores/user/restaurantStore";
import { useFoodStore } from "@/stores/user/foodStore";
import { useCartStore } from "@/stores/user/cartStore";

import LoadingCom from "@/components/LoadingCom.vue";

const restaurantStore = useRestaurantStore();
const foodStore = useFoodStore();
const cartStore = useCartStore();

const route = useRoute();
const rID = route.params.id;

onMounted(async () => {
  await restaurantStore.loadRestaurant();
  restaurantStore.getRestaurant(rID);
  await foodStore.getFood(rID);
});

const addToCart = (food, rID) => {
  cartStore.addToCart(food, rID);
};
</script>

<template>
  <UserLayout>
    <LoadingCom v-show="foodStore.isLoading"></LoadingCom>
    <div class="m-8" v-show="!foodStore.isLoading">
      <div class="flex flex-row w-full justify-between">
        <div class="text-2xl font-bold flex-1">
          Restaurant: {{ restaurantStore.selectedRestaurant.name }}
        </div>
        <div class="flex flex-col">
          <div>
            Time open: {{ restaurantStore.selectedRestaurant.timeOpen }}
          </div>
          <div>
            Time close: {{ restaurantStore.selectedRestaurant.timeClose }}
          </div>
        </div>
        <div></div>
      </div>
      <div class="divider"></div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4">
        <div
          class="card bg-base-100 w-96 shadow-xl m-4 p-0"
          v-for="(food, index) in foodStore.foods"
          :key="index"
        >
          <figure>
            <img :src="food.imageUrl" class="w-64 h-64 object-cover" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ food.name }}</h2>
            <p>${{ food.price }}</p>
            <p>remain: {{ food.remainQuantity }}</p>
            <div class="card-actions justify-end">
              <button @click="addToCart(food, rID)" class="btn btn-primary">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
