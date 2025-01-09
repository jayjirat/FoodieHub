<script setup>
import { useRoute, RouterLink, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const route = useRoute();
const router = useRouter();

const logout = () => {
  accountStore.logout();
  router.push({ name: "login-view" });
};
</script>

<template>
  <div class="drawer drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content mx-4">
      <slot></slot>
    </div>
    <div class="drawer-side">
      <ul class="menu bg-base-200 text-base-content min-h-full w-70 p-4">
        <li class="mb-2">
          <button class="text-xl pb-4 btn-disabled">Owner Management</button>
        </li>
        <li class="mb-2">
          <RouterLink
            :to="{
              name: 'owner-view',
            }"
            :class="route.name === 'owner-view' ? 'btn-active' : ''"
            >Dashboard</RouterLink
          >
        </li>
        <li class="mb-2">
          <RouterLink
            :to="{
              name: 'owner-manage-view',
            }"
            :class="route.name === 'owner-manage-view' ? 'btn-active' : ''"
            >Manage</RouterLink
          >
        </li>
        <li class="mb-2">
          <button @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</template>
