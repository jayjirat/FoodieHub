<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useAccountStore } from "@/stores/account";
import { useEventStore } from "@/stores/event";

import UserLayout from "@/layouts/UserLayout.vue";

const eventStore = useEventStore();
const accountStore = useAccountStore();

const router = useRouter();

const newPassword = ref("");
const newRePassword = ref("");

const changepassword = ref(false);

const toggle = (cancel = false) => {
  changepassword.value = !changepassword.value;
  if (cancel) {
    newPassword.value = "";
    newRePassword.value = "";
  }
};

const changePassword = async () => {
  if (newPassword.value !== newRePassword.value) {
    eventStore.popup("Password does not match", "error");
    newPassword.value = "";
    newRePassword.value = "";
  } else {
    try {
      await accountStore.changePassword(newPassword.value);
      eventStore.popup("Password changed successfully", "info");
    } catch (error) {
      if (error.message.includes("weak-password")) {
        eventStore.popup(
          "Password must be at least 6 characters long",
          "error"
        );
      } else {
        eventStore.popup("Fail to change password", "error");
      }
    }
  }
  toggle(true);
};

const deleteUser = async () => {
  const result = confirm("Are you sure to delete this user");
  if (result) {
    try {
      await accountStore.deleteUser();
      router.push({ name: "login-view" });
      eventStore.popup("Delete user success", "info");
    } catch (error) {
      eventStore.popup("Fail to delete user", "error");
    }
  }
};
</script>

<template>
  <UserLayout>
    <div
      class="flex flex-col md:flex-row mx-auto gap-4 w-2/3 p-4  shadow-2xl my-4"
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
                class="input input-bordered w-full"
                :value="accountStore.profile.updatedAt"
                readonly
              />
            </label>
          </div>

          <div class="flex flex-row gap-4" v-show="changepassword">
            <label class="form-control w-full my-4">
              <div class="label">
                <span class="label-text">New password</span>
              </div>
              <input
                type="password"
                class="input input-bordered w-full"
                v-model="newPassword"
              />
            </label>
            <label class="form-control w-full my-4">
              <div class="label">
                <span class="label-text">Confirm password</span>
              </div>
              <input
                type="password"
                class="input input-bordered w-full"
                v-model="newRePassword"
              />
            </label>
          </div>
        </div>

        <div class="flex flex-row gap-4 justify-end">
          <button
            @click="toggle"
            class="btn btn-neutral"
            v-show="!changepassword"
          >
            Change Password
          </button>
          <button
            @click="changePassword"
            class="btn btn-neutral"
            v-show="changepassword"
          >
            Confirm
          </button>
          <button
            @click="toggle(true)"
            class="btn btn-secondary"
            v-show="changepassword"
          >
            Cancel
          </button>
          <button @click="deleteUser" class="btn btn-primary">
            Delete User
          </button>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
