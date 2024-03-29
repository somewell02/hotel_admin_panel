import i18n from "@/i18n";

export const tableInfo = {
  titles: [
    { id: "dates", name: i18n.global.t("booking.fields.dates"), width: 25 },
    {
      id: "status",
      name: i18n.global.t("status"),
      width: 20,
      type: "background",
    },
    {
      id: "roomNumber",
      name: i18n.global.t("booking.fields.number"),
      width: 13,
    },
    {
      id: "roomType",
      name: i18n.global.t("booking.fields.roomType"),
      width: 18,
      type: "background",
    },
    {
      id: "totalPrice",
      name: i18n.global.t("booking.fields.totalPrice"),
      width: 10,
      type: "price",
      unit: "₽",
    },
  ],
  actions: ["edit", "delete"],
};

export const shortTableInfo = {
  titles: tableInfo.titles,
  actions: ["view"],
};

export const sortInfo = {
  options: [
    { id: "default", title: i18n.global.t("default") },
    { id: "totalPrice:asc", title: "Счет (↑)" },
    { id: "totalPrice:desc", title: "Счет (↓)" },
  ],
};

export const filters = [
  {
    id: "statusId",
    type: "checkbox",
    title: i18n.global.t("status"),
    options: [],
    values: [],
  },
  {
    id: "roomTypeId",
    type: "checkbox",
    title: i18n.global.t("booking.fields.roomType"),
    options: [],
    values: [],
  },
];

export const searchInfo = {
  fields: [
    { id: "id" },
    { id: "dates" },
    { id: "roomId" },
    { id: "roomType.title" },
  ],
};
