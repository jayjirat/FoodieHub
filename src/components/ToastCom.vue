<script setup>
import { defineProps } from "vue";

defineProps({
  status: { type: String },
  message: { type: String },
});
</script>

<template>
  <div class="toast toast-top toast-end z-50">
    <div :class="`alert alert-${status}`">
      <span>{{ message }}</span>
    </div>
  </div>
</template>
