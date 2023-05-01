import i18n from "@/i18n";

export const msToHourMin = (ms) => {
  const date = new Date(ms);
  const options = {
    hour: "numeric",
    minute: "numeric",
  };

  const result = date.toLocaleTimeString(i18n.global.locale, options);

  return result.toString();
}; // 16:30

export const msToDayMonthLong = (ms) => {
  const date = new Date(ms);
  const options = {
    day: "numeric",
    month: "long",
  };

  const result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 11 мая

export const msToDayMonthYearLong = (ms) => {
  const date = new Date(ms);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 11 мая 2022 г.

export const msToDayMonthYear = (ms) => {
  const date = new Date(ms);
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 16.10.2021

export const msToDayMonth = (ms) => {
  const date = new Date(ms);
  const options = {
    day: "numeric",
    month: "numeric",
  };

  const result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 16.10

export const msToDay = (ms) => {
  const date = new Date(ms);
  const options = {
    day: "numeric",
  };

  const result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 16

export const msToYear = (ms) => {
  const date = new Date(ms);
  const options = {
    year: "numeric",
  };

  const result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 2021
