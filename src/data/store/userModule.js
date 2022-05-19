const userModule = {
  state: () => ({
    user: null,
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  namespaced: true,
};

export default userModule;
