import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

const routes = [
  {
    path: "/",
    redirect: { name: "main" },
  },
  {
    path: "/auth",
    name: "authorization",
    component: () => import("../views/auth/AuthView.vue"),
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "main",
        meta: { title: "Панель администратора" },
        component: () => import("../views/main/MainView.vue"),
      },
      {
        path: "users",
        name: "users",
        meta: { title: "Пользователи" },
        component: () => import("../views/users/UsersListView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
