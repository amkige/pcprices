<template>
  <div class="flex items-center justify-between">
    <PCheckbox v-model="strict">
      <span class="hidden sm:block"
        >Filter by keywords ({{ productsCount }} results)</span
      >
      <span class="sm:hidden">Filter ({{ productsCount }} results)</span>
    </PCheckbox>

    <div class="space-x-2">
      <label for="sort">Sort</label>
      <select
        id="sort"
        v-model="sort"
        class="px-3 py-2 bg-gray-100 rounded outline-none appearance-none dark:bg-gray-800"
      >
        <option value="default">Default</option>
        <option value="high">High Price</option>
        <option value="low">Low Price</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PCheckbox from "@/components/ui/PCheckbox";

export default {
  name: "Filters",
  components: { PCheckbox },
  computed: {
    ...mapGetters("search/result", ["filters", "productsCount"]),
    strict: {
      get() {
        return this.filters.strict;
      },
      set(value) {
        this.$store.commit("search/result/setFilters", {
          sort: this.sort,
          strict: value,
        });
      },
    },
    sort: {
      get() {
        return this.filters.sort;
      },
      set(value) {
        this.$store.commit("search/result/setFilters", {
          sort: value,
          strict: this.strict,
        });
      },
    },
  },
};
</script>
