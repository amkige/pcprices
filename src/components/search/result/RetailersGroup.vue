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
      <footer
        key="footer"
        class="flex justify-center w-full mb-8 text-sm text-gray-600"
      >
        <a
          class="flex items-center"
          href="https://github.com/samyzkhalil/pcprices"
          target="_blank"
        >
          <GithubIcon size="1.5x" class="mr-1" stroke-width="1.5" /> GitHub
        </a>
      </footer>
    </transition-group>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import Retailer from "./RetailerItem";
import Filters from "./Filters";
import GithubIcon from "vue-feather-icons/icons/GithubIcon";

export default {
  name: "RetailersGroup",
  components: { Retailer, Filters, GithubIcon },
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
