import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import i18n from "@/i18n";

import { usersRoutes } from "./usersRoutes";
import { roomsRoutes } from "./roomsRoutes";
import { chatRoutes } from "./chatRoutes";
import { bookingsRoutes } from "./bookingsRoutes";

const routes = [
  {
    path: "/",
    redirect: { name: "authorization" },
  },
  {
    path: "/auth",
    name: "authorization",
    component: () => import("../views/auth/AuthView.vue"),
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    name: "dashboard",
    redirect: { name: "main" },
    children: [
      {
        path: "main",
        name: "main",
        meta: { title: i18n.global.t("dashboard.title") },
        component: () => import("../views/main/MainView.vue"),
      },
      ...usersRoutes,
      ...roomsRoutes,
      ...chatRoutes,
      ...bookingsRoutes,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
