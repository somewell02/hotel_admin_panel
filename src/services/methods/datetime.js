import i18n from "@/i18n";

export const msToHourMin = (ms) => {
  var date = new Date(ms);
  var options = {
    hour: "numeric",
    minute: "numeric",
  };

  var result = date.toLocaleTimeString(i18n.global.locale, options);

  return result.toString();
}; // 16:30

export const msToDayMonthLong = (ms) => {
  var date = new Date(ms);
  var options = {
    day: "numeric",
    month: "long",
  };

  var result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 11 мая

export const msToDayMonthYearLong = (ms) => {
  var date = new Date(ms);
  var options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  var result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 11 мая 2022 г.

export const msToDayMonthYear = (ms) => {
  var date = new Date(ms);
  var options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  var result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 16.10.2021

export const msToDayMonth = (ms) => {
  var date = new Date(ms);
  var options = {
    day: "numeric",
    month: "numeric",
  };

  var result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 16.10

export const msToDay = (ms) => {
  var date = new Date(ms);
  var options = {
    day: "numeric",
  };

  var result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 16

export const msToYear = (ms) => {
  var date = new Date(ms);
  var options = {
    year: "numeric",
  };

  var result = date.toLocaleDateString(i18n.global.locale, options);

  return result.toString();
}; // 2021
