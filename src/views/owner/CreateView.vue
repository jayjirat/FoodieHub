<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import OwnerLayout from "@/layouts/OwnerLayout.vue";

import { useRestaurantStore } from "@/stores/owner/restaurantStore";
import { useEventStore } from "@/stores/event";

const restaurantStore = useRestaurantStore();
const eventStore = useEventStore();
const router = useRouter();

const name = ref("");
const description = ref("");
const timeOpen = ref("");
const timeClose = ref("");

const createRestaurant = async () => {
  const resData = {
    name: name.value,
    description: description.value,
    timeOpen: timeOpen.value,
    timeClose: timeClose.value,
  };

  try {
    await restaurantStore.createRestaurant(resData);
    router.push({
      name: "owner-manage-view",
    });
    eventStore.popup("Create successfully", "info");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <OwnerLayout>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 class="text-3xl font-bold text-center mb-6">Create Restaurant</h1>
        <form class="space-y-4">
          <!-- Restaurant Name -->
          <label class="form-control w-full">
            <span class="label-text font-semibold">Restaurant Name</span>
            <input
              type="text"
              placeholder="Enter restaurant name"
              class="input input-bordered w-full"
              v-model="name"
            />
          </label>

          <!-- Description -->
          <label class="form-control w-full">
            <span class="label-text font-semibold">Description</span>
            <textarea
              placeholder="Enter description"
              class="textarea textarea-bordered w-full"
              v-model="description"
            ></textarea>
          </label>

          <!-- Time Open -->
          <label class="form-control w-full">
            <span class="label-text font-semibold">Time Open</span>
            <input
              type="time"
              class="input input-bordered w-full"
              v-model="timeOpen"
            />
          </label>

          <!-- Time Close -->
          <label class="form-control w-full">
            <span class="label-text font-semibold">Time Close</span>
            <input
              type="time"
              class="input input-bordered w-full"
              v-model="timeClose"
            />
          </label>

          <!-- Buttons -->
          <div class="flex justify-between items-center mt-6">
            <RouterLink
              :to="{
                name: 'owner-manage-view',
              }"
              type="button"
              class="btn btn-neutral w-1/2"
              >Back</RouterLink
            >
            <button
              type="button"
              @click="createRestaurant"
              class="btn btn-primary w-1/2 ml-4"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </OwnerLayout>
</template>
