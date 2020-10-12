import _cloneDeep from "lodash/cloneDeep";
import _orderBy from "lodash/orderBy";
import _sumBy from "lodash/sumBy";

const state = {
  retailers: [],
  filters: {
    strict: false,
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
  setStrict(state, value) {
    state.filters.strict = value;
  },
  setSort(state, value) {
    state.filters.sort = value;
  },
};

const getters = {
  // eslint-disable-next-line no-unused-vars
  retailers: ({ retailers, filters }, _, __, rootGetters) => {
    let query = rootGetters["search/query"];
    let _retailers = _cloneDeep(retailers);

    let order =
      (filters.sort === "high" && "desc") ||
      (filters.sort === "low" && "asc") ||
      null;

    if (filters.strict)
      _retailers.forEach((retailer) => {
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
      });

    if (order)
      _retailers = _orderBy(
        _retailers,
        [
          (retailer) => {
            if (order) {
              retailer.products = _orderBy(retailer.products, "price", order);
              return retailer.products[0].price;
            }
          },
          "name",
        ],
        order
      );

    return _retailers;
  },
  productsCount: ({ retailers }, { retailers: retailersFiltered }) => {
    return (
      _sumBy(retailersFiltered, "products.length") +
      "/" +
      _sumBy(retailers, "products.length")
    );
  },
  strict: ({ filters }) => filters.strict,
  sort: ({ filters }) => filters.sort,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
