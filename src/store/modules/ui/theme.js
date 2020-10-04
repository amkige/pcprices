const state = {
  isDark: false,
  isSystemPref: true,
  isSystemDark: false,
};

const mutations = {
  setDark(state, value) {
    state.isDark = value;
  },
  setSystemPref(state, value) {
    state.isSystemPref = value;
  },
  setSystemTheme(state, value) {
    state.isSystemDark = value;
  },
};

const getters = {
  isDark: (state) => state.isDark,
  isSystemPref: (state) => state.isSystemPref,
  isSystemDark: (state) => state.isSystemDark,
};

export default {
  state,
  mutations,
  getters,
};
