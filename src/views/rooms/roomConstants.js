import i18n from "@/i18n";

export const structureInfo = {
  imgId: "",
  imgInfo: {
    left: [{ id: "num" }],
    right: [{ id: "type" }],
  },
  info: {
    left: [{ id: "name", type: "title" }],
    right: [
      { id: "price", type: "price", unit: "₽/ночь" },
      { id: "rating", type: "rating" },
    ],
  },
  actions: ["edit", "delete"],
};

export const bookingTableInfo = {
  titles: [
    {
      id: "numbers",
      name: i18n.global.t("booking.fields.number"),
      width: 15,
      type: "array",
    },
    { id: "name", name: i18n.global.t("room.fields.name"), width: 35 },
    {
      id: "type",
      name: i18n.global.t("room.fields.type"),
      width: 22,
      type: "background",
    },
    {
      id: "price",
      name: i18n.global.t("price"),
      width: 16,
      type: "price",
      unit: "₽/ночь",
    },
  ],
  actions: ["view"],
};

export const sortInfo = {
  options: [
    { id: "default", title: i18n.global.t("default") },
    { id: "price:asc", title: "Стоимость (↑)" },
    { id: "price:desc", title: "Стоимость (↓)" },
    { id: "rating:asc", title: "Рейтинг (↑)" },
    { id: "rating:desc", title: "Рейтинг (↓)" },
  ],
};

export const filters = [
  {
    id: "typeId",
    type: "checkbox",
    title: i18n.global.t("room.fields.type"),
    options: [],
    values: [],
  },
];

export const searchInfo = {
  fields: [
    { id: "name" },
    { id: "type.title" },
    { id: "numbers", type: "numberIncludes" },
  ],
};
