export const getLocale = () => {
  const locale = localStorage.getItem("locale");
  if (locale) {
    return locale;
  } else {
    setLocale("ru");
    return "ru";
  }
};

export const setLocale = (locale) => {
  localStorage.setItem("locale", locale);
};
