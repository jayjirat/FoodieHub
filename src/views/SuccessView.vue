<script setup>
import { onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";

import UserLayout from "@/layouts/UserLayout.vue";
import { useCartStore } from "@/stores/user/cartStore";

const router = useRouter();
const cartStore = useCartStore();

onMounted(() => {
  setTimeout(() => {
    router.push({
      name: "home-view",
    });
    cartStore.carts = [];
  }, 3000);
});
</script>

<template>
  <UserLayout>
    <div
      class="flex w-10/12 h-96 shadow-2xl mx-auto my-4 justify-center items-center flex-col p-8 rounded-lg"
    >
      <div class="text-4xl font-bold mb-4">Thank You!</div>
      <p class="text-lg mb-2">Your order has been successfully placed.</p>
      <p class="text-md mb-4">
        We appreciate your purchase and hope you enjoy your meal.
      </p>
      <span class="loading loading-dots loading-lg"></span>
    </div>
  </UserLayout>
</template>
