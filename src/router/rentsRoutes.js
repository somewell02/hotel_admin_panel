import i18n from "@/i18n";

export const rentsRoutes = [
  {
    path: "rents",
    //component: () => import("../views/rents/RentsView.vue"),
    children: [
      {
        path: "",
        name: "rents",
        meta: { title: i18n.global.t("rent.nav") },
        //component: () => import("../views/rents/RentsList.vue"),
      },
      // {
      //   path: "types",
      //   name: "types",
      //   meta: { title: i18n.global.t("rentType.nav") },
      //   component: () => import("../views/rents/types/TypesList.vue"),
      // },
      // {
      //   path: "types/edit/:id",
      //   name: "typeEdit",
      //   meta: { title: i18n.global.t("rentType.nav") },
      //   component: () => import("../views/rents/types/TypesList.vue"),
      // },
    ],
  },
  // {
  //   path: "rents/add",
  //   name: "rentAdd",
  //   meta: { title: i18n.global.t("rent.add") },
  //   component: () => import("../views/rents/RentAddView.vue"),
  // },
  // {
  //   path: "rents/edit/:id",
  //   name: "rentEdit",
  //   redirect: { name: "rentInfo" },
  //   component: () => import("../views/rents/RentEditView.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "rentInfo",
  //       component: () => import("../views/rents/RentInfo.vue"),
  //     },
  //   ],
  // },
];
