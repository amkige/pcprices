const state = {
  isBuildMenuOpen: false,
};

const mutations = {
  setBuildMenuOpen(state, value) {
    state.isBuildMenuOpen = value;
  },
};

const getters = {
  isBuildMenuOpen: (state) => state.isBuildMenuOpen,
};

export default {
  state,
  mutations,
  getters,
};
