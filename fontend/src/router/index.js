import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";

const NotFound = () => import("../views/NotFound.vue");
// const Dashboard = () => import("../views/Dashboard.vue");

const Overview = () => import("../views/dashboard/Overview.vue");
const Drugs = () => import("../views/dashboard/Drugs.vue");
const Vendors = () => import("../views/dashboard/Vendors.vue");
const SellingHistory = () => import("../views/dashboard/SellingHistory.vue");
const Settings = () => import("../views/dashboard/Settings.vue");


const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    redirect: "/dashboard/overview",
    component: Dashboard,
    children: [
      { path: "overview", component: Overview },
      { path: "drugs", component: Drugs },
      { path: "vendors", component: Vendors },
      { path: "selling-history", component: SellingHistory },
      { path: "settings", component: Settings }
    ]
   },
   {
    path: "/:pathMatch(.*)*",
    component: NotFound,
   }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;