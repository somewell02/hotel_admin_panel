import { createRouter, createWebHistory } from "vue-router";

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
    name: "main",
    meta: { title: "Панель администратора" },
    component: () => import("../views/main/MainView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
