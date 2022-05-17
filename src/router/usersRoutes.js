import i18n from "@/i18n";

export const usersRoutes = [
  {
    path: "users",
    component: () => import("../views/users/UsersView.vue"),
    children: [
      {
        path: "",
        name: "users",
        meta: { title: i18n.global.t("user.nav") },
        component: () => import("../views/users/UsersList.vue"),
      },
      {
        path: "roles",
        name: "roles",
        meta: { title: i18n.global.t("role.nav") },
        component: () => import("../views/users/RolesList.vue"),
      },
      {
        path: "roles/edit/:id",
        name: "roleEdit",
        meta: { title: i18n.global.t("role.nav") },
        component: () => import("../views/users/RolesList.vue"),
      },
    ],
  },
  {
    path: "users/add",
    name: "userAdd",
    meta: { title: i18n.global.t("user.add") },
    component: () => import("../views/users/UserAddView.vue"),
  },
  {
    path: "users/edit/:id",
    name: "userEdit",
    redirect: { name: "userInfo" },
    component: () => import("../views/users/UserEditView.vue"),
    children: [
      {
        path: "",
        name: "userInfo",
        component: () => import("../views/users/UserInfo.vue"),
      },
      {
        path: "visits",
        name: "userVisits",
      },
    ],
  },
];
