import i18n from "@/i18n";

export const structureInfo = {
  imgInfo: {
    left: [],
    right: [{ id: "category" }],
  },
  info: {
    left: [{ id: "title", type: "title" }],
    right: [
      { id: "price", type: "price", unit: "" },
      { id: "rating", type: "rating" },
    ],
  },
  actions: ["edit", "delete"],
};

export const tableInfo = {
  titles: [
    { id: "dates", name: i18n.global.t("booking.fields.dates"), width: 25 },
    {
      id: "itemCategory",
      name: i18n.global.t("rent.fields.category"),
      width: 25,
      type: "background",
    },
    {
      id: "rentItemName",
      name: i18n.global.t("title"),
      width: 30,
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

export const sortInfo = {
  options: [
    { id: "default", title: i18n.global.t("default") },
    { id: "price:asc", title: i18n.global.t("price") + " (↑)" },
    { id: "price:desc", title: i18n.global.t("price") + " (↓)" },
    { id: "rating:asc", title: i18n.global.t("rating") + " (↑)" },
    { id: "rating:desc", title: i18n.global.t("rating") + " (↓)" },
  ],
};

export const filters = [
  {
    id: "categoryId",
    type: "checkbox",
    title: i18n.global.t("rent.fields.category"),
    options: [],
    values: [],
  },
];

export const searchInfo = {
  fields: [{ id: "name" }, { id: "type.title" }],
};
