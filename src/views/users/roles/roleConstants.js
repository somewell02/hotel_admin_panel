import i18n from "@/i18n";

export const table = {
  titles: [
    { id: "title", name: i18n.global.t("role.fields.title"), width: 25 },
    { id: "id", name: i18n.global.t("role.fields.id"), width: 15 },
    {
      id: "staff",
      name: i18n.global.t("role.fields.staff"),
      width: 15,
      type: "bool",
    },
    {
      id: "permissions",
      name: i18n.global.t("role.fields.permissions"),
      width: 20,
      type: "array",
    },
    {
      id: "color",
      name: i18n.global.t("color"),
      width: 12,
      type: "color",
    },
  ],
  actions: ["edit", "delete"],
};
