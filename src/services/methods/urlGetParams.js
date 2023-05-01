import router from "@/router/router";

export const setGetParams = async (params) => {
  if (params) {
    let url = window.location.pathname;
    let i = 0;
    for (const [key, value] of Object.entries(params)) {
      if (i === 0) url += "?" + key + "=" + value;
      else url += "&" + key + "=" + value;
      i++;
    }
    await router.push(url);
    history.replaceState({ ...history.state }, document.title);
  }
};

export const getGetParams = () => {
  return Object.fromEntries(new URL(window.location).searchParams.entries());
};
