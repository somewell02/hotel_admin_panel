import i18n from "@/i18n";

export const table = {
  titles: [
    { id: "shortTitle", name: i18n.global.t("title"), width: 45 },
    {
      id: "shortDesc",
      name: i18n.global.t("description"),
      width: 30,
    },
  ],
  actions: ["edit", "delete"],
};
