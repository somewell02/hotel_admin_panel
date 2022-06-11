import i18n from "@/i18n";

export const eventsRoutes = [
  {
    path: "events",
    component: () => import("../views/events/EventsView.vue"),
    children: [
      {
        path: "",
        name: "events",
        meta: { title: i18n.global.t("event.nav") },
        component: () => import("../views/events/EventsList.vue"),
      },
      // {
      //   path: "types",
      //   name: "eventTypes",
      //   meta: { title: i18n.global.t("eventType.nav") },
      //   component: () => import("../views/events/types/TypesList.vue"),
      // },
      // {
      //   path: "types/edit/:id",
      //   name: "eventTypeEdit",
      //   meta: { title: i18n.global.t("eventType.nav") },
      //   component: () => import("../views/events/types/TypesList.vue"),
      // },
    ],
  },
  // {
  //   path: "events/add",
  //   name: "eventAdd",
  //   meta: { title: i18n.global.t("event.add") },
  //   component: () => import("../views/events/EventAddView.vue"),
  // },
  // {
  //   path: "events/edit/:id",
  //   name: "eventEdit",
  //   redirect: { name: "eventInfo" },
  //   component: () => import("../views/events/EventEditView.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "eventInfo",
  //       component: () => import("../views/events/EventInfo.vue"),
  //     },
  //   ],
  // },
];
