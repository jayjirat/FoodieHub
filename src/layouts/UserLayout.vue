<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useCartStore } from "@/stores/user/cartStore";
import { useRestaurantStore } from "@/stores/user/restaurantStore";
import { useAccountStore } from "@/stores/account";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { storage } from "@/firebase";
const router = useRouter();

const restaurantStore = useRestaurantStore();
const accountStore = useAccountStore();
const cartStore = useCartStore();

let ig = "";

const isDark = ref(false);
const saveTheme = localStorage.getItem("theme");

onMounted(async () => {
  isDark.value = localStorage.getItem("theme") === "dracula";
  document.documentElement.setAttribute(
    "data-theme",
    isDark.value ? "dracula" : "autumn"
  );

  await cartStore.loadCart();
});

const logout = async () => {
  await accountStore.logout();
  router.push({
    name: "login-view",
  });
};

const search = async () => {
  await restaurantStore.loadRestaurant();
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? "dracula" : "autumn";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <RouterLink
              :to="{
                name: 'home-view',
              }"
              >Homepage</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="{
                name: 'order-view',
              }"
              >My order</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="{
                name: 'about-view',
              }"
              >About</RouterLink
            >
          </li>
        </ul>
      </div>

      <!-- swap mode -->
      <div class="ml-4">
        <label class="swap swap-rotate">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" @change.prevent="toggleTheme" />

          <!-- sun icon -->
          <svg
            class="h-10 w-10 fill-current"
            :class="saveTheme === 'dracula' ? 'swap-off' : 'swap-on'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>

          <!-- moon icon -->
          <svg
            class="h-10 w-10 fill-current"
            :class="saveTheme === 'dracula' ? 'swap-on' : 'swap-off'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>
      </div>
    </div>
    <div class="navbar-center">
      <RouterLink
        :to="{
          name: 'home-view',
        }"
        class="btn btn-ghost text-xl"
        >Foodie Hub</RouterLink
      >
    </div>
    <div class="navbar-end">
      <div class="form-control">
        <input
          type="text"
          placeholder="Search Restaurant..."
          class="input input-bordered w-12 md:w-auto mr-2"
          v-model="restaurantStore.query.search"
        />
      </div>
      <button @click="search" class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item">{{
              cartStore.summaryAllQuantity
            }}</span>
          </div>
        </div>
        <div
          tabindex="0"
          class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
        >
          <div
            class="card-body"
            v-for="(res, index) in cartStore.carts"
            :key="index"
          >
            <div class="">
              <div class="font-bold text-lg">{{ res.name }}</div>
              <div
                class="flex flex-row justify-between w-full"
                v-for="(food, index) in res.foods"
                :key="index"
              >
                <div>{{ food.name }} - {{ food.quantity }}</div>
                <div>${{ food.price }}</div>
              </div>
              <div class="flex flex-row justify-between w-full">
                <div>{{ cartStore.summaryQuantityByRes(res.rID) }} Items</div>
                <div>${{ cartStore.summaryPriceByRes(res.rID) }}</div>
              </div>
              <div class="divider"></div>
            </div>
          </div>
          <div class="flex flex-row justify-between w-full">
            <div class="card-body text-info">
              Items: {{ cartStore.summaryAllQuantity }}
            </div>
            <div class="card-body text-info">
              Total: ${{ cartStore.summaryAllPrice }}
            </div>
          </div>
          <div class="card-actions card-body">
            <RouterLink
              :to="{
                name: 'cart-view',
              }"
              class="btn btn-primary btn-block"
              :class="cartStore.summaryAllQuantity === 0 ? 'btn-disabled' : ''"
              >View cart</RouterLink
            >
          </div>
        </div>
      </div>

      <!-- Profile -->
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :src="accountStore.profile.imageUrl" />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <RouterLink
              :to="{
                name: 'profile-view',
              }"
            >
              Profile
            </RouterLink>
          </li>
          <li><button @click="logout">Logout</button></li>
        </ul>
      </div>
    </div>
  </div>
  <slot></slot>
  <footer class="footer bg-neutral text-neutral-content p-10">
    <aside>
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        class="fill-current"
      >
        <path
          d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
        ></path>
      </svg>
      <p>
        Foodie Hub - Order your favorite food anytime!
        <br />
        © 2025 Foodie Hub. All rights reserved.
      </p>
    </aside>
    <nav>
      <h6 class="footer-title">Social</h6>
      <div class="grid grid-flow-col gap-4">
        <a> <img src="../assets/GitHub_Logo_White.png" class="h-6" /> </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
            ></path>
          </svg>
        </a>
      </div>
    </nav>
  </footer>
</template>
