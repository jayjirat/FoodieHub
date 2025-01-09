<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

import UserLayout from "@/layouts/UserLayout.vue";
import { useRestaurantStore } from "@/stores/user/restaurantStore";

import LoadingCom from "@/components/LoadingCom.vue";

const restaurantStore = useRestaurantStore();
const sort = ref(false);

onMounted(async () => {
  await restaurantStore.loadRestaurant();
});

const toggleSort = async () => {
  sort.value = !sort.value;

  if (sort.value) {
    restaurantStore.query.orderedBy = "rate";
  } else {
    restaurantStore.query.orderedBy = "";
  }
  await restaurantStore.loadRestaurant();
};
</script>

<template>
  <UserLayout>
    <LoadingCom v-show="restaurantStore.isLoading"></LoadingCom>
    <div v-show="!restaurantStore.isLoading">
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
        <div class="flex justify-end">
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text mr-4 text-lg">Sort by rating</span>
              <input
                type="checkbox"
                class="checkbox checkbox-primary mr-4"
                @change.prevent="toggleSort"
              />
            </label>
          </div>
        </div>
        <div
          class="card bg-base-100 w-full shadow-xl my-2"
          v-for="(res, index) in restaurantStore.restaurants"
          :key="index"
        >
          <div class="card-body">
            <div class="py-2">
              <div class="flex flex-row justify-between">
                <h2 class="card-title text-3xl font-bold">{{ res.name }}</h2>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                  </svg>
                  <div class="font-bold">{{ res.rate }}</div>
                </div>
              </div>
              <div>
                <p>{{ res.description }}</p>
              </div>
            </div>

            <div class="card-actions justify-end">
              <RouterLink
                :to="{
                  name: 'restaurant-view',
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
    </div>
  </UserLayout>
</template>
