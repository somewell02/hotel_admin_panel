const userModule = {
  state: () => ({
    user: null,
  }),
  getters: {
    includesUpdate(state) {
      return state.user
        ? state.user.role.permissions.includes("update")
        : false;
    },
    includesDelete(state) {
      return state.user
        ? state.user.role.permissions.includes("delete")
        : false;
    },
    includesCreate(state) {
      return state.user
        ? state.user.role.permissions.includes("create")
        : false;
    },
    includesChat(state) {
      return state.user ? state.user.role.permissions.includes("chat") : false;
    },
    includesStats(state) {
      return state.user ? state.user.role.permissions.includes("stats") : false;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  namespaced: true,
};

export default userModule;
