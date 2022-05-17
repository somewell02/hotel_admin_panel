import i18n from "@/i18n";

export const structureInfo = {
  imgId: "",
  info: {
    left: [{ id: "name", type: "title" }],
    right: [
      { id: "price", type: "price", unit: "₽/ночь" },
      { id: "rating", type: "rating" },
    ],
  },
  actions: ["edit", "delete"],
};

export const sort = {
  options: [
    { id: "default", title: i18n.global.t("default") },
    { id: "email:asc", title: "Посещения (↑)" },
    { id: "email:desc", title: "Посещения (↓)" },
  ],
  value: "default",
};

export const filters = [
  {
    id: "roleId",
    type: "checkbox",
    title: i18n.global.t("user.fields.role"),
    options: [],
    values: [],
  },
];

export const search = {
  value: "",
  fields: ["name", "email", "phone"],
};
