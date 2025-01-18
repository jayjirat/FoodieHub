import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/user/ProfileView.vue";
import HomeView from "../views/user/HomeView.vue";
import AboutView from "../views/user/AboutView.vue";
import OrderView from "../views/user/OrderView.vue";

import RestaurantView from "../views/user/RestaurantView.vue";
import CartView from "../views/user/CartView.vue";
import ProcessView from "../views/user/ProcessView.vue";
import SuccessView from "../views/user/SuccessView.vue";
import OwnerView from "../views/owner/OwnerView.vue";
import OwnerManageView from "../views/owner/ManageView.vue";
import OwnerCreateView from "../views/owner/CreateView.vue";
import OwnerRestaurantView from "../views/owner/RestaurantView.vue";
import OwnerAddFoodView from "../views/owner/AddFoodView.vue";

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
      path: "/myorder",
      name: "order-view",
      component: OrderView,
    },
    {
      path: "/about",
      name: "about-view",
      component: AboutView,
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
      path: "/process",
      name: "processs-view",
      component: ProcessView,
    },
    {
      path: "/success",
      name: "success-view",
      component: SuccessView,
    },
    {
      path: "/owner/dashboard",
      name: "owner-view",
      component: OwnerView,
    },
    {
      path: "/owner/manage",
      name: "owner-manage-view",
      component: OwnerManageView,
    },
    {
      path: "/owner/create",
      name: "owner-create-view",
      component: OwnerCreateView,
    },
    {
      path: "/owner/restaurant/:id",
      name: "owner-restaurant-view",
      component: OwnerRestaurantView,
    },
    {
      path: "/owner/restaurant/edit/:id",
      name: "owner-edit-view",
      component: OwnerCreateView,
    },
    {
      path: "/owner/restaurant/:rID/addFood",
      name: "owner-add-food-view",
      component: OwnerAddFoodView,
    },
    {
      path: "/owner/restaurant/:rID/editFood/:fID",
      name: "owner-edit-food-view",
      component: OwnerAddFoodView,
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
