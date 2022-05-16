import { createStore } from "vuex";
import userModule from "./userModule";

export default createStore({
  state: () => ({
    darkTheme: false,
  }),
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user: userModule,
  },
});
