import i18n from "@/i18n";

export const chatRoutes = [
  {
    path: "chat",
    name: "chat",
    meta: { title: i18n.global.t("chat.nav") },
    component: () => import("../views/chat/ChatView.vue"),
  },
];
