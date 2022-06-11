import i18n from "@/i18n";

export const structureInfo = {
  imgInfo: {
    left: [{ id: "status" }],
    right: [{ id: "type" }],
  },
  info: {
    left: [{ id: "title", type: "title" }],
    right: [{ id: "dateStartTitle" }, { id: "dateEndTitle" }],
  },
  actions: ["edit", "delete"],
};

export const sortInfo = {
  options: [
    { id: "default", title: i18n.global.t("default") },
    {
      id: "dateStart:asc",
      title: i18n.global.t("booking.fields.dateStart") + " (↑)",
    },
    {
      id: "dateStart:desc",
      title: i18n.global.t("booking.fields.dateStart") + " (↓)",
    },
  ],
};

export const filters = [
  {
    id: "typeId",
    type: "checkbox",
    title: i18n.global.t("event.fields.type"),
    options: [],
    values: [],
  },
];

export const searchInfo = {
  fields: ["name", "type.title"],
};
