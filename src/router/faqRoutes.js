import i18n from "@/i18n";

export const faqRoutes = [
  {
    path: "faq",
    name: "faq",
    meta: { title: i18n.global.t("faq.title") },
    component: () => import("../views/faq/FaqList.vue"),
  },
  {
    path: "faq/edit/:id",
    name: "faqEdit",
    meta: { title: i18n.global.t("faq.title") },
    component: () => import("../views/faq/FaqList.vue"),
  },
];
