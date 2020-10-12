<template>
  <transition
    enter-active-class="transition-opacity duration-200"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <transition-group
      v-if="show"
      class="w-full"
      tag="div"
      enter-active-class="transition-opacity duration-200"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <Filters v-show="retailers.length" key="filter" class="mb-4" />
      <Retailer
        v-for="retailer in retailers"
        v-show="retailer.products.length"
        :key="retailer.id"
        :retailer="retailer"
        class="mb-16"
      />
      <PFooter class="mb-12" v-show="retailers.length" key="footer" />
    </transition-group>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import Retailer from "./RetailerItem";
import Filters from "./Filters";

import PFooter from "@/components/PFooter";

export default {
  name: "RetailersGroup",
  components: { Retailer, Filters, PFooter },
  data() {
    return {
      show: false,
    };
  },
  computed: mapGetters("search/result", ["retailers"]),
  watch: {
    retailers(value) {
      value.length > 0
        ? setTimeout(() => (this.show = true), 850)
        : (this.show = false);
    },
  },
};
</script>
