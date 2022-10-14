import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../view/Dashboard.vue";
import Login from "../view/Login.vue";
import NotFound from "../view/NotFound.vue";

// const NotFound = () => import("../view/NotFound.vue");
// const Login = () => import("../view/Login.vue");

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: () => import("../views/Home.vue"),
  // },
  {
    path: "/login",
    // name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    // name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/:pathMatch(.*)*",
    // name: "NotFound",
    component: NotFound,
  }
  // {
  //   path: "/:pathMatch(.*)*",
  //   // name: "NotFound",
  //   component: NotFound,
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;