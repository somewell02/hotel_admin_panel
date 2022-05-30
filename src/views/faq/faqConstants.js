import i18n from "@/i18n";

export const table = {
  titles: [
    { id: "image", name: i18n.global.t("image"), width: 20, type: "image" },
    { id: "shortTitle", name: i18n.global.t("title"), width: 35 },
    { id: "shortDesc", name: i18n.global.t("description"), width: 35 },
  ],
  actions: ["edit", "delete"],
};
