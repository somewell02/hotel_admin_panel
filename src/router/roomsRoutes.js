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
      {
        path: "types",
        name: "types",
        meta: { title: i18n.global.t("roomType.nav") },
        component: () => import("../views/rooms/types/TypesList.vue"),
      },
      {
        path: "types/edit/:id",
        name: "typeEdit",
        meta: { title: i18n.global.t("roomType.nav") },
        component: () => import("../views/rooms/types/TypesList.vue"),
      },
      {
        path: "tags",
        name: "tags",
        meta: { title: i18n.global.t("roomTag.nav") },
        component: () => import("../views/rooms/tags/TagsList.vue"),
      },
      {
        path: "tags/edit/:id",
        name: "tagEdit",
        meta: { title: i18n.global.t("roomTag.nav") },
        component: () => import("../views/rooms/tags/TagsList.vue"),
      },
    ],
  },
  {
    path: "rooms/add",
    name: "roomAdd",
    meta: { title: i18n.global.t("room.add") },
    component: () => import("../views/rooms/RoomAddView.vue"),
  },
  {
    path: "rooms/edit/:id",
    name: "roomEdit",
    redirect: { name: "roomInfo" },
    component: () => import("../views/rooms/RoomEditView.vue"),
    children: [
      {
        path: "",
        name: "roomInfo",
        component: () => import("../views/rooms/RoomInfo.vue"),
      },
      {
        path: "visits",
        name: "roomVisits",
        component: () => import("../views/rooms/RoomVisits.vue"),
      },
    ],
  },
];
