export const setGetParams = (params) => {
  if (params) {
    let url = window.location.pathname;
    let i = 0;
    for (const [key, value] of Object.entries(params)) {
      if (i == 0) url += "?" + key + "=" + value;
      else url += "&" + key + "=" + value;
      i++;
    }
    window.history.pushState(null, document.title, url);
  }
};

export const getGetParams = () => {
  const windowData = Object.fromEntries(
    new URL(window.location).searchParams.entries()
  );
  return windowData;
};
