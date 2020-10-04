<template>
  <div class="space-y-12">
    <div class="space-y-3">
      <div class="relative w-full">
        <input
          ref="searchInput"
          class="w-full h-16 px-4 bg-gray-100 border-2 border-transparent outline-none rounded-xd focus:bg-gray-200 dark:bg-gray-800 dark:focus:bg-gray-700 focus:border-gray-400 dark:focus:border-gray-600"
          :placeholder="placeholder"
          :value="query"
          spellcheck="false"
          required
          @input="query = $event.target.value"
          @keyup.enter="onSearch"
        />

        <Status
          :state="status"
          class="absolute right-0 transform -translate-y-1/2 top-1/2"
        />
      </div>

      <CategoriesGroup />
    </div>
    <RetailersGroup />
  </div>
</template>
<script>
import { isTouchScreen } from "@/const";
import { mapGetters } from "vuex";
import Status from "./Status";
import CategoriesGroup from "./categories/CategoriesGroup";
import RetailersGroup from "./result/RetailersGroup";

export default {
  name: "Search",
  components: { Status, CategoriesGroup, RetailersGroup },
  computed: {
    isTouchScreen,
    ...mapGetters("ui", ["status"]),
    ...mapGetters("search", ["category"]),
    ...mapGetters("search/result", ["retailers"]),
    query: {
      get() {
        return this.$store.getters["search/query"];
      },
      set(value) {
        this.$store.commit("ui/setStatus", value.trim() ? "typing" : "default");
        this.$store.commit("search/setQuery", value.trim());
      },
    },
    placeholder() {
      return this.isTouchScreen
        ? "Search PC components"
        : 'Search PC components (Press "/" to focus)';
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "/") {
        e.preventDefault();
        this.$refs.searchInput.focus();
      }
    });
  },
  methods: {
    onSearch() {
      this.$store.commit("search/result/resetResults");

      if (this.isTouchScreen) this.$refs.searchInput.blur();
      this.$store.dispatch("search/search");
    },
  },
};
</script>
