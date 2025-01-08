<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useAccountStore } from "@/stores/account";
import { useEventStore } from "@/stores/event";

import UserLayout from "@/layouts/UserLayout.vue";

const eventStore = useEventStore();
const accountStore = useAccountStore();

const router = useRouter();

const email = ref("");
const password = ref("");
const rePassword = ref("");
</script>

<template>
  <UserLayout>
    <div
      class="flex flex-col md:flex-row mx-auto gap-4 w-2/3 p-4 bg-white shadow-2xl my-4"
    >
      <!-- image -->
      <div class="w-full md:w-1/3 p-4">
        <div>
          <img
            :src="accountStore.profile.imageUrl"
            class="rounded-full mt-4 mb-8"
          />
          <input type="file" class="file-input file-input-bordered w-full" />
        </div>
      </div>

      <!-- profile data -->
      <div class="w-full md:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <label class="form-control w-full my-4">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              type="email"
              class="input input-bordered w-full"
              :value="accountStore.profile.email"
              readonly
            />
          </label>

          <div class="flex flex-row gap-4">
            <label class="form-control w-full my-4">
              <div class="label">
                <span class="label-text">Created At</span>
              </div>
              <input
                type="text"
                class="input input-bordered w-full"
                :value="accountStore.profile.createdAt"
                readonly
              />
            </label>
            <label class="form-control w-full my-4">
              <div class="label">
                <span class="label-text">Last update</span>
              </div>
              <input
                type="email"
                placeholder="Type here"
                class="input input-bordered w-full"
                :value="accountStore.profile.updatedAt"
                readonly
              />
            </label>
          </div>
        </div>

        <div class="flex flex-row gap-4 justify-end">
          <button class="btn btn-neutral">Change Password</button>
          <button class="btn btn-primary">Delete User</button>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
