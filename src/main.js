import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/router";
import store from "./data/store/vuex";

import DefaultComponents from "./components/default";
import Images from "./assets/img/img";
import Directives from "./services/directives/directives";

import "./assets/scss/index.scss";

import i18n from "./i18n";

const app = createApp(App);

DefaultComponents.forEach((component) => {
  app.component(component.name, component);
});

Images.forEach((img) => {
  app.component(img.name, img);
});

Directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(store).use(router).use(i18n).mount("#app");
