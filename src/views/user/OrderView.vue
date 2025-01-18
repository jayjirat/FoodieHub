<script setup>
import { ref, onMounted } from "vue";
import UserLayout from "@/layouts/UserLayout.vue";
import { useCartStore } from "@/stores/user/cartStore";

const cartStore = useCartStore();
const orders = ref([]);

const steps = ["Payment", "Confirm Order", "Prepared", "Delivery"]; 

onMounted(async () => {
  const savedOrders = JSON.parse(localStorage.getItem("orders")) || null;

  if (savedOrders) {
    orders.value = savedOrders;
  } else {
    const fetchedOrders = await cartStore.loadUserOrder();
    orders.value = fetchedOrders.map((order) => ({
      ...order,
      currentStep: 0, 
    }));
    localStorage.setItem("orders", JSON.stringify(orders.value));
  }

  startStepUpdates();
});

function startStepUpdates() {
  orders.value.forEach((order, index) => {
    let stepInterval = setInterval(() => {
      if (order.currentStep < steps.length - 1) {
        order.currentStep++;
        orders.value[index] = { ...order }; 
        localStorage.setItem("orders", JSON.stringify(orders.value)); 
      } else {
        clearInterval(stepInterval);
      }
    }, 60000);
  });
}
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
              <h2 class="card-title text-xl font-bold">
                Order: {{ order.orderId }}
              </h2>
              <ul class="steps">
                <li
                  v-for="(step, stepIndex) in steps"
                  :key="stepIndex"
                  class="step"
                  :class="{ 'step-primary': stepIndex <= order.currentStep }"
                >
                  {{ step }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
