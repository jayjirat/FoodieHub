<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";

import UserLayout from "@/layouts/UserLayout.vue";
import { useCartStore } from "@/stores/user/cartStore";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const orderId = ref("");

onMounted(async () => {
  setTimeout(async () => {
    orderId.value = route.query.order_id;
    const url = await cartStore.checkStatus(orderId.value);

    if (url.query) {
      router.push({
        name: url.name,
        query: url.query,
      });
    } else {
      router.push({
        name: url.name,
      });
    }
  }, 3000);
});
</script>

<template>
  <UserLayout>
    <div
      class="flex w-10/12 h-96 shadow-2xl mx-auto my-4 justify-center items-center flex-col p-8 rounded-lg"
    >
      <div class="text-4xl font-bold mb-4">Processing, please wait...</div>
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  </UserLayout>
</template>
