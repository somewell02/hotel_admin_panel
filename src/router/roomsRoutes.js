import i18n from "@/i18n";

export const roomsRoutes = [
  {
    path: "rooms",
    component: () => import("../views/rooms/RoomsView.vue"),
    children: [
      {
        path: "",
        name: "rooms",
        meta: { title: i18n.global.t("room.nav") },
        component: () => import("../views/rooms/RoomsList.vue"),
      },
      // {
      //   path: "roles",
      //   name: "roles",
      //   meta: { title: i18n.global.t("role.nav") },
      //   component: () => import("../views/users/RolesList.vue"),
      // },
      // {
      //   path: "roles/edit/:id",
      //   name: "roleEdit",
      //   meta: { title: i18n.global.t("role.nav") },
      //   component: () => import("../views/users/RolesList.vue"),
      // },
    ],
  },
  // {
  //   path: "users/add",
  //   name: "userAdd",
  //   meta: { title: i18n.global.t("user.add") },
  //   component: () => import("../views/users/UserAddView.vue"),
  // },
  // {
  //   path: "users/edit/:id",
  //   name: "userEdit",
  //   redirect: { name: "userInfo" },
  //   component: () => import("../views/users/UserEditView.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "userInfo",
  //       component: () => import("../views/users/UserInfo.vue"),
  //     },
  //     {
  //       path: "visits",
  //       name: "userVisits",
  //     },
  //   ],
  // },
];
