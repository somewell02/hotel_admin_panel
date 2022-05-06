import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router/router";
import store from "@/data/store/vuex";

import directives from "@/services/directives/directives";

const app = createApp(App);

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(store).use(router).mount("#app");
