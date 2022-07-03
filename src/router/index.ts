import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "@/views/LoginView.vue";
import AdminDashboard from "@/views/dashboard/AdminDashboard.vue";
import UserDashboard from "@/views/dashboard/UserDashboard.vue";
import SellerDashboard from "@/views/dashboard/SellerDashboard.vue";
import UserProfile from "@/views/dashboard/profile/UserProfile.vue";
import SellerProfile from "@/views/dashboard/profile/SellerProfile.vue";
import SellerProducts from "@/views/dashboard/SellerProducts.vue";
import SingleProduct from "@/views/SingleProduct.vue";
import SellerReport from "@/views/SellerReport.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/dashboard/user",
      name: "UserDashboard",
      component: UserDashboard,
    },
    {
      path: "/dashboard/admin",
      name: "AdminDashboard",
      component: AdminDashboard,
    },
    {
      path: "/dashboard/seller",
      name: "SellerDashboard",
      component: SellerDashboard,
    },
    {
      path: "/dashboard/user/profile",
      name: "UserProfile",
      component: UserProfile,
    },
    {
      path: "/dashboard/seller/profile",
      name: "SellerProfile",
      component: SellerProfile,
    },
    {
      path: "/dashboard/seller/products",
      name: "SellerProducts",
      component: SellerProducts,
    },
    {
      path: "/products/:id",
      name: "SingleProduct",
      component: SingleProduct,
    },
    {
      path: "/dashboard/seller/reports",
      name: "SellerReports",
      component: SellerReport,
    }
  ],
});

router.beforeEach(async (to, from) => {
  if (
    !localStorage.getItem("token") &&
    to.name !== "Login" &&
    to.name !== "Signup" &&
    to.name !== "Home"
  ) {
    return { name: "Login" };
  }
});

export default router;
