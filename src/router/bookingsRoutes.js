import i18n from "@/i18n";

export const bookingsRoutes = [
  {
    path: "bookings",
    component: () => import("../views/bookings/BookingsView.vue"),
    children: [
      {
        path: "",
        name: "bookings",
        meta: { title: i18n.global.t("booking.nav") },
        component: () => import("../views/bookings/BookingsList.vue"),
      },
      {
        path: "statuses",
        name: "statuses",
        meta: { title: i18n.global.t("bookingStatus.nav") },
        component: () => import("../views/bookings/statuses/StatusesList.vue"),
      },
      {
        path: "statuses/edit/:id",
        name: "statusEdit",
        meta: { title: i18n.global.t("bookingStatus.nav") },
        component: () => import("../views/bookings/statuses/StatusesList.vue"),
      },
    ],
  },
  {
    path: "bookings/add",
    name: "bookingAdd",
    meta: { title: i18n.global.t("booking.add") },
    component: () => import("../views/bookings/BookingAddView.vue"),
  },
  {
    path: "bookings/edit/:id",
    name: "bookingEdit",
    redirect: { name: "bookingInfo" },
    component: () => import("../views/bookings/BookingEditView.vue"),
    children: [
      {
        path: "",
        name: "bookingInfo",
        component: () => import("../views/bookings/BookingInfo.vue"),
      },
      {
        path: "services",
        name: "bookingServices",
        component: () => import("../views/bookings/BookingServices.vue"),
      },
    ],
  },
];
