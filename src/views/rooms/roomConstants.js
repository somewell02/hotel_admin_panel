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
  fields: ["name", "type.title"],
};
