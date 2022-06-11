import i18n from "@/i18n";

export const rentsRoutes = [
  {
    path: "rents",
    component: () => import("../views/rents/RentsView.vue"),
    children: [
      {
        path: "",
        name: "rents",
        meta: { title: i18n.global.t("rent.nav") },
        component: () => import("../views/rents/RentsList.vue"),
      },
      // {
      //   path: "categories",
      //   name: "categories",
      //   meta: { title: i18n.global.t("rentCategory.nav") },
      //   component: () => import("../views/rents/categories/CategoriesList.vue"),
      // },
      // {
      //   path: "categories/edit/:id",
      //   name: "categoryEdit",
      //   meta: { title: i18n.global.t("rentCategory.nav") },
      //   component: () => import("../views/rents/categories/CategoriesList.vue"),
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
