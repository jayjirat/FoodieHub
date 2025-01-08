import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";
import HomeView from "../views/HomeView.vue";
import RestaurantView from "../views/RestaurantView.vue";
import CartView from "../views/CartView.vue";
import SuccessView from "../views/SuccessView.vue";

import { useAccountStore } from "@/stores/account";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login-view",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register-view",
      component: RegisterView,
    },
    {
      path: "/home",
      name: "home-view",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile-view",
      component: ProfileView,
    },
    {
      path: "/restaurant/:id",
      name: "restaurant-view",
      component: RestaurantView,
    },
    {
      path: "/cart",
      name: "cart-view",
      component: CartView,
    },
    {
      path: "/success",
      name: "success-view",
      component: SuccessView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userAccountStore = useAccountStore();
  await userAccountStore.checkAuthState();

  if (
    !userAccountStore.isLoggedIn &&
    to.name !== "login-view" &&
    to.name !== "register-view"
  ) {
    next({ name: "login-view" });
    login;
  } else {
    next();
  }
});

export default router;
