import searchStores from "@/api/search";

const state = {
  query: "",
  category: "",
};

const mutations = {
  setQuery(state, value) {
    state.query = value;
  },
  setCategory(state, value) {
    state.category = state.category !== value ? value : "";
  },
};

const actions = {
  search({ commit, state, getters }) {
    commit("ui/setStatus", "loading", { root: true });
    searchStores(
      state.query,
      state.category,
      (result) => {
        if (result && result.products && result.products.length)
          commit("result/addResult", result);
      },
      () => {
        commit("result/resetResults");
      },
      console.error,
      (isAborted) => {
        commit(
          "ui/setStatus",
          getters["result/retailers"].length || isAborted
            ? "default"
            : "noResult",
          {
            root: true,
          }
        );
      }
    );
  },
};

const getters = {
  query: ({ query }) => query,
  category: ({ category }) => category,
};

import result from "./result";
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: { result },
};
