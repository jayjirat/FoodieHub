<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useAccountStore } from "@/stores/account";
import { useEventStore } from "@/stores/event";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

const eventStore = useEventStore();
const accountStore = useAccountStore();

const router = useRouter();

const email = ref("");
const password = ref("");
const rePassword = ref("");

const popupMsg = (message, status) => {
  eventStore.popup(message, status);
  password.value = "";
  rePassword.value = "";
};

const register = async () => {
  if (password.value != rePassword.value) {
    popupMsg("Password does not match", "error");
    return;
  } else {
    if (password.value.length < 6) {
      popupMsg("Password must be at least 6 characters long", "error");
      return;
    } else {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );

        const userData = {
          uID: result.user.uid,
          email: result.user.email,
        };
        await createUser(userData);
        popupMsg("Register success", "info");
        router.push({
          name: "login-view",
        });
      } catch (error) {
        if (error.message.includes("email-already-in-use")) {
          popupMsg("Email already in use", "error");
        } else {
          console.log(error.message);
        }
      }
    }
  }
};

const createUser = async (userData) => {
  const newUser = {
    ...userData,
    status: "active",
    role: "member",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const userRef = doc(db, "users", userData.uID);
  await setDoc(userRef, newUser);
};
</script>

<template>
  <div class="hero bg-base-200 h-screen">
    <div class="hero-content flex-col w-1/2">
      <div class="text-center mb-4">
        <h1 class="text-5xl font-bold">Register</h1>
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
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="confirm password"
              class="input input-bordered"
              required
              v-model="rePassword"
            />
          </div>
          <div class="form-control mt-6">
            <button type="button" @click="register" class="btn btn-primary">
              Register
            </button>
          </div>
          <div class="flex flex-row justify-start">
            <RouterLink
              :to="{
                name: 'login-view',
              }"
              class="label-text-alt link link-hover"
              >Back</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
