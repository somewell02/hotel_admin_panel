import i18n from "@/i18n";

export const tableInfo = {
  titles: [
    { id: "name", name: i18n.global.t("user.fields.name"), width: 28 },
    {
      id: "role",
      name: i18n.global.t("user.fields.role"),
      width: 18,
      type: "background",
    },
    { id: "phone", name: i18n.global.t("user.fields.phone"), width: 22 },
    { id: "email", name: i18n.global.t("user.fields.email"), width: 20 },
  ],
  actions: ["edit", "delete"],
};

export const bookingTableInfo = {
  titles: tableInfo.titles,
  actions: ["view"],
};

export const sortInfo = {
  options: [
    { id: "default", title: i18n.global.t("default") },
    { id: "email:asc", title: "Посещения (↑)" },
    { id: "email:desc", title: "Посещения (↓)" },
  ],
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

export const searchInfo = {
  fields: [{ id: "name" }, { id: "email" }, { id: "phone" }],
};
