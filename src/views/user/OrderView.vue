<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

import UserLayout from "@/layouts/UserLayout.vue";
import { useCartStore } from "@/stores/user/cartStore";

const cartStore = useCartStore();
const orders = ref({});
onMounted(async () => {
  orders.value = await cartStore.loadUserOrder();
});
</script>

<template>
  <UserLayout>
    <div class="flex flex-col m-12">
      <div
        class="card bg-base-100 w-full shadow-xl my-2"
        v-for="(order, index) in orders"
        :key="index"
      >
        <div class="card-body">
          <div class="py-2">
            <div class="flex flex-row justify-between">
              <div class="flex flex-col justify-between">
                <h2 class="card-title text-xl font-bold">
                  Order: {{ order.orderId }}
                </h2>
                <div class="rating">
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                    @click="setRating(1)"
                    checked="checked"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                    @click="setRating(2)"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                    @click="setRating(3)"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                    @click="setRating(4)"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                    @click="setRating(5)"
                  />
                </div>
              </div>

              <ul class="steps">
                <li class="step step-primary">Payment</li>
                <li class="step step-primary">Confirm Order</li>
                <li class="step step-primary">Prepared</li>
                <li class="step step-primary">Delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
