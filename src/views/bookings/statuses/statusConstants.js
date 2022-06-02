import i18n from "@/i18n";

export const table = {
  titles: [
    { id: "title", name: i18n.global.t("title"), width: 25 },
    { id: "id", name: i18n.global.t("id"), width: 15 },
    {
      id: "color",
      name: i18n.global.t("color"),
      width: 12,
      type: "color",
    },
  ],
  actions: ["edit", "delete"],
};
