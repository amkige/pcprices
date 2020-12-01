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

let abortController = null;

const actions = {
  search({ commit, state, getters }) {
    if (!state.query && !state.category) return;

    if (abortController) abortController.abort();
    abortController = new AbortController();
    let isAborted = false;

    setTimeout(() => {
      commit("ui/setStatus", "loading", { root: true });
    }, 1);

    searchStores(
      state.query,
      state.category,
      abortController.signal,
      (result) => {
        if (result && result.products && result.products.length)
          commit("result/addResult", result);
      },
      () => {
        commit("result/resetResults");
      },
      (e) => {
        isAborted = e.name === "AbortError";
      },
      () => {
        if (getters["result/retailers"].length && !isAborted)
          commit("ui/setStatus", "default", {
            root: true,
          });
        else if (!getters["result/retailers"].length)
          commit("ui/setStatus", "noResult", {
            root: true,
          });
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
