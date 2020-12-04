import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSignIn: 0,
    state: '',
  },
  mutations: {
    changeIsSignIn(state, token) {
      // state.isSignIn = n;
      state.token = token;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {},
  modules: {},
});
