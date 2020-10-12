import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import search from "./modules/search";
import builds from "./modules/builds";
import ui from "./modules/ui";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search,
    builds,
    ui,
  },
  plugins: [
    createPersistedState({
      paths: ["ui.theme", "builds", "search.result.filters"],
    }),
  ],
});
