<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="hero bg-base-200 h-screen">
    <div class="hero-content flex-col">
      <div class="text-center mb-4">
        <h1 class="text-5xl font-bold">E commerce project</h1>
      </div>
      <div class="card bg-base-100 w-full shrink-0 shadow-2xl">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              class="input input-bordered"
              required
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
            />
          </div>
          <div class="form-control mt-6">
            <RouterLink :to="{
                name:'home-view'
            }" class="btn btn-primary">Login</RouterLink>
          </div>
          <a class="label-text-alt link link-hover" href="#"
            >Login via google email</a
          >
        </form>
      </div>
    </div>
  </div>
</template>
