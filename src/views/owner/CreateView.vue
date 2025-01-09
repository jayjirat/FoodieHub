<script setup>
import { onMounted, ref, computed } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import OwnerLayout from "@/layouts/OwnerLayout.vue";

import { useRestaurantStore } from "@/stores/owner/restaurantStore";
import { useEventStore } from "@/stores/event";

const restaurantStore = useRestaurantStore();
const eventStore = useEventStore();
const router = useRouter();
const route = useRoute();

const name = ref("");
const description = ref("");
const timeOpen = ref("");
const timeClose = ref("");

const mode = ref("create");

const smthRestaurant = async () => {
  const resData = {
    name: name.value,
    description: description.value,
    timeOpen: timeOpen.value,
    timeClose: timeClose.value,
  };
  if (mode.value === "create") {
    try {
      await restaurantStore.createRestaurant(resData);
      router.push({
        name: "owner-manage-view",
      });
      eventStore.popup("Create successfully", "info");
    } catch (error) {
      console.error(error);
    }
  } else if (mode.value === "edit") {
    try {
      await restaurantStore.updateRestaurant(route.params.id, resData);
      router.push(backRoute.value);
    eventStore.popup("Edit successfully", "info");
    } catch (error) {
      console.error(error);
    }
  }
};

const deleteRes = async () => {
  if (route.params.id) {
    const result = confirm("Are you sure you want to delete");
    if (result) {
      await restaurantStore.deleteRestaurant(route.params.id);
      router.push({
        name: "owner-manage-view",
      });
      eventStore.popup("Delete successfully", "error");
    }
  }
};

onMounted(() => {
  console.log(route.params.id);

  if (route.params.id) {
    mode.value = "edit";
    restaurantStore.getRestaurant(route.params.id);

    name.value = restaurantStore.selectedRestaurant.name;
    description.value = restaurantStore.selectedRestaurant.description;
    timeOpen.value = restaurantStore.selectedRestaurant.timeOpen;
    timeClose.value = restaurantStore.selectedRestaurant.timeClose;
  }
});

const backRoute = computed(() => {
  return route.params.id
    ? { name: "owner-restaurant-view" }
    : { name: "owner-manage-view" };
});
</script>

<template>
  <OwnerLayout>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 class="text-3xl font-bold text-center mb-6">
          {{ mode === "create" ? "Create" : "Edit" }} Restaurant
        </h1>
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
              :to="backRoute"
              type="button"
              class="btn btn-neutral w-1/2"
              >Back</RouterLink
            >
            <button
              type="button"
              @click="smthRestaurant"
              class="btn btn-primary w-1/2 ml-1"
            >
              {{ mode === "create" ? "Create" : "Edit" }}
            </button>
          </div>
          <button
            @click="deleteRes"
            v-if="mode === 'edit'"
            class="btn btn-secondary w-full"
            type="button"
          >
            Delete Restaurant
          </button>
        </form>
      </div>
    </div>
  </OwnerLayout>
</template>
