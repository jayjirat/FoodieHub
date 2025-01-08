<script setup>
import { RouterView } from "vue-router";
import ToastCom from "@/components/ToastCom.vue";

import { useEventStore } from "@/stores/event";

const eventStore = useEventStore();
</script>

<template>
  <ToastCom
    v-show="eventStore.alert"
    :message="eventStore.message"
    :status="eventStore.status"
  ></ToastCom>
  <RouterView />
</template>
