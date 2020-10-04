import Vue from "vue";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _sumBy from "lodash/sumBy";
import { findLowestMissing } from "./_utils/findLowestMissingInt";

const state = {
  activeBuildId: null,
  builds: [],
};

const mutations = {
  /** ============
   * 	Builds
   * ============
   */
  setActiveBuildId(state, id) {
    state.activeBuildId = id;
  },

  addBuild(state, build) {
    state.builds.push(build);
  },

  deleteBuild(state, id) {
    Vue.delete(state.builds, _findIndex(state.builds, { id }));
  },

  renameBuild(state, { id, name }) {
    _find(state.builds, { id }).name = name;
  },

  /** ============
   * 	Products
   * ============
   */
  addProduct({ activeBuildId, builds }, Product) {
    let activeBuild = _find(builds, { id: activeBuildId });

    activeBuild.products.push(Product);
  },

  deleteProduct({ activeBuildId, builds }, productId) {
    let activeBuild = _find(builds, { id: activeBuildId });
    let productIndex = _findIndex(activeBuild.products, { id: productId });

    Vue.delete(activeBuild.products, productIndex);
  },

  setQty({ activeBuildId, builds }, { productId, newQty }) {
    let activeBuild = _find(builds, { id: activeBuildId });
    let product = _find(activeBuild.products, { id: productId });

    product.qty = newQty;
    product.totalPrice = product.price * newQty;
  },
};

const actions = {
  /** ============
   * 	Builds
   * ============
   */

  setActiveBuildId({ commit }, id) {
    commit("setActiveBuildId", id);
  },
  createBuild({ commit, getters: { builds } }, build = {}) {
    let id = findLowestMissing(builds, "id");
    let name = `Build ${id}`;

    let newBuild = {
      name,
      products: [],
      ...build,
      id,
    };

    commit("addBuild", newBuild);
    commit("setActiveBuildId", id);
  },

  importBuild({ dispatch }, importedBuild) {
    importedBuild.imported = true;
    dispatch("createBuild", importedBuild);
  },

  deleteBuild({ commit }, id) {
    commit("deleteBuild", id);
    commit("setActiveBuildId", null);
  },

  renameBuild({ commit }, { id, name }) {
    commit("renameBuild", { id, name });
  },

  /** ============
   * 	Products
   * ============
   */
  addProduct({ commit, dispatch, getters: { activeBuild } }, product) {
    if (!activeBuild) dispatch("createBuild");

    let newProduct = { ...product, qty: 1, totalPrice: product.price };
    commit("addProduct", newProduct);
  },

  deleteProduct({ commit }, id) {
    commit("deleteProduct", id);
  },

  setQty({ commit }, { productId, newQty }) {
    if (newQty > 0 && newQty < 100) commit("setQty", { productId, newQty });
  },
};

const getters = {
  activeBuildId: ({ activeBuildId }) => activeBuildId,

  builds: ({ builds }) =>
    builds.map((build) => ({
      ...build,
      totalPrice: _sumBy(build.products, "totalPrice"),
    })),

  activeBuild: (state, { activeBuildId, builds }) =>
    activeBuildId && _find(builds, { id: activeBuildId }),

  activeBuildProducts: (state, { activeBuild }) =>
    (activeBuild && activeBuild.products) || [],

  buildsCount: (state, { builds }) => builds.length,

  activeBuildProductsCount: (state, { activeBuildProducts }) =>
    activeBuildProducts.length,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
