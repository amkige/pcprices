import _cloneDeep from "lodash/cloneDeep";
import _orderBy from "lodash/orderBy";
import _sumBy from "lodash/sumBy";

const state = {
  retailers: [],
  filters: {
    strict: true,
    sort: "default",
  },
};

const mutations = {
  addResult(state, value) {
    state.retailers.push(value);
  },
  resetResults(state) {
    state.retailers = [];
  },
  setFilters(state, value) {
    state.filters = value;
  },
};

const getters = {
  // eslint-disable-next-line no-unused-vars
  retailers: ({ retailers, filters }, _, __, rootGetters) => {
    let query = rootGetters["search/query"];
    let _retailers = _cloneDeep(retailers);

    _retailers.forEach((retailer) => {
      if (filters.strict)
        retailer.products = retailer.products.filter((product) =>
          query
            .toLowerCase()
            .split(/\s/g)
            .every((one) => {
              let fullname = product.brand
                ? `${product.brand} ${product.name}`
                : product.name;
              return fullname.toLowerCase().includes(one);
            })
        );

      if (filters.sort === "high")
        retailer.products = retailer.products.sort((f, s) =>
          f.price < s.price ? 1 : -1
        );

      if (filters.sort === "low")
        retailer.products = retailer.products.sort((f, s) =>
          f.price > s.price ? 1 : -1
        );
    });

    return _orderBy(_retailers, ["name"]);
  },
  productsCount: ({ retailers }, { retailers: retailersFiltered }) => {
    return (
      _sumBy(retailersFiltered, "products.length") +
      "/" +
      _sumBy(retailers, "products.length")
    );
  },
  filters: ({ filters }) => filters,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
