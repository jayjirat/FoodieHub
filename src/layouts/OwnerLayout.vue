<script setup>
import { useRoute, RouterLink } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();

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
        <li class="mb-2"><a>Manage</a></li>
        <li class="mb-2"><a>Logout</a></li>
      </ul>
    </div>
  </div>
</template>
