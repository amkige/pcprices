import theme from "./theme";
import toggles from "./toggles";

const state = {
  status: "default",
};

const mutations = {
  setStatus(state, value) {
    state.status = value;
  },
};

const getters = {
  status: (state) => state.status,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  modules: { theme, toggles },
};
