<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

import UserLayout from "@/layouts/UserLayout.vue";

import { useRestaurantStore } from "@/stores/user/restaurantStore";
import { useFoodStore } from "@/stores/user/foodStore";
import { useCartStore } from "@/stores/user/cartStore";

const restaurantStore = useRestaurantStore();
const foodStore = useFoodStore();
const cartStore = useCartStore();

const name = ref("");
const email = ref("");
const address = ref("");
const tel = ref("");

const deleteCart = (rID, fID) => {
  cartStore.deleteCart(rID, fID);
};
</script>

<template>
  <UserLayout>
    <div class="flex flex-col md:flex-row gap-4 p-4">
      <div class="flex-auto w-full md:w-16 shadow-2xl p-6">
        <div
          class="flex flex-col w-full"
          v-for="(res, index) in cartStore.carts"
          :key="index"
        >
          <div class="text-lg font-bold">Restaurant: {{ res.name }}</div>
          <div class="divider"></div>
          <div
            class="flex flex-row justify-between"
            v-for="(food, index) in res.foods"
            :key="index"
          >
            <div>{{ food.name }} - {{ food.quantity }}</div>
            <div class="flex flex-row justify-between">
              <div>${{ food.price }}</div>
              <button
                @click="deleteCart(res.rID, food.fID)"
                class="text-lg font-bold ml-4"
              >
                X
              </button>
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <div>Subtotal: {{ cartStore.summaryQuantityByRes(res.rID) }}</div>
            <div>${{ cartStore.summaryPriceByRes(res.rID) }}</div>
          </div>
          <div class="divider"></div>
          <div></div>
        </div>
        <div class="flex flex-row justify-between">
          <div>Total: {{ cartStore.summaryAllQuantity }}</div>
          <div>${{ cartStore.summaryAllPrice }}</div>
        </div>
      </div>

      <!-- Submit Data -->
      <div class="flex-auto w-full md:w-96 shadow-2xl p-2">
        <div class="grid grid-cols-2 gap-4 p-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              class="input input-bordered w-full"
              v-model="name"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              class="input input-bordered w-full"
              v-model="email"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Payment method</span>
            </div>
            <input
              type="text"
              class="input input-bordered w-full"
              value="Rabbit_Linepay"
              readonly
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Tel.</span>
            </div>
            <input
              type="text"
              placeholder="Tel."
              class="input input-bordered w-full"
              v-model="tel"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Address</span>
            </div>

            <textarea
              rows="5"
              class="textarea textarea-bordered"
              placeholder="Address"
            ></textarea>
          </label>
        </div>
        <div class="flex w-full justify-end p-4">
          <button
            class="btn btn-neutral w-1/3"
            :class="cartStore.carts.length === 0 ? 'btn-disabled' : ''"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
