<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useEventStore } from "@/stores/event";
import { useAccountStore } from "@/stores/account";

const eventStore = useEventStore();
const accountStore = useAccountStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const pushPath = () => {
  let destination = "";
  if (accountStore.profile.role === "user") {
    destination = "home-view";
  } else if (accountStore.profile.role === "owner") {
    destination = "owner-view";
  } else if (accountStore.profile.role === "admin") {
    destination = "admin-view";
  } else {
    throw new Error("Something went wrong");
  }
  router.push({
    name: destination,
  });
};

const loginViaGoogle = async () => {
  try {
    await accountStore.loginViaGoogle();
    pushPath();
  } catch (error) {
    console.log(error);
  }
};

const loginViaUsernameAndPassword = async () => {
  try {
    await accountStore.loginViaUsernameAndPassword(email.value, password.value);
    pushPath();
  } catch (error) {
    if (error.message.includes("wrong-password")) {
      eventStore.popup("Wrong password please try again", "error");
      email.value = "";
      password.value = "";
    } else {
      eventStore.popup("Something went wrong please try again", "error");
      email.value = "";
      password.value = "";
    }
  }
};
</script>

<template>
  <div class="hero bg-base-200 h-screen">
    <div class="hero-content flex-col w-1/2">
      <div class="text-center mb-4">
        <h1 class="text-5xl font-bold">Foodie Hub</h1>
      </div>
      <div class="card bg-base-100 w-full shrink-0 shadow-2xl">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              class="input input-bordered"
              required
              v-model="email"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              required
              v-model="password"
            />
          </div>
          <div class="form-control mt-6">
            <button
              type="button"
              @click="loginViaUsernameAndPassword()"
              class="btn btn-primary"
            >
              Login
            </button>
          </div>
          <div class="flex flex-row justify-between">
            <div>
              <button
                @click="loginViaGoogle()"
                class="label-text-alt link link-hover"
              >
                Login via google email
              </button>
            </div>
            <RouterLink
              :to="{
                name: 'register-view',
              }"
              class="label-text-alt link link-hover"
              >Register</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
