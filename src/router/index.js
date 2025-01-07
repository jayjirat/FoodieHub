import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import RestaurantView from "../views/RestaurantView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LoginView,
    },
    {
      path: "/home",
      name: "home-view",
      component: HomeView,
    },
    {
      path: "/restaurant/:id",
      name: "restaurant",
      component: RestaurantView,
    },
  ],
});

export default router;
