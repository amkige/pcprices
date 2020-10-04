<template>
  <div class="flex flex-col space-y-6 rounded-lg">
    <div class="flex">
      <div
        :class="{
          'flex items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-800 hover:bg-opacity-50 py-1 pl-3 pr-2 -mx-3 -my-1 rounded-xd cursor-pointer select-none transition-colors duration-100': canLimit,
        }"
        @click="isLimited = !isLimited"
      >
        <h3 class="text-2xl font-medium md:text-3xl">
          {{ retailer.name }}
        </h3>
        <chevronDownIcon
          v-if="canLimit"
          :class="{ 'transform rotate-180': !isLimited }"
        />
      </div>
    </div>
    <transition-group
      tag="ul"
      enter-active-class="transition-opacity duration-200"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
      class="space-y-12"
    >
      <Product
        v-for="product in retailer.products.slice(0, max)"
        :key="product.id"
        :product="{
          ...retailerMeta,
          ...product,
        }"
      />
    </transition-group>
  </div>
</template>

<script>
import Product from "./RetailerProduct";
import chevronDownIcon from "vue-feather-icons/icons/ChevronDownIcon";
export default {
  name: "RetailerItem",
  components: { Product, chevronDownIcon },
  props: {
    retailer: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      limit: 5,
      isLimited: true,
    };
  },
  computed: {
    retailerMeta() {
      return {
        retailerId: this.retailer.id,
        retailerName: this.retailer.name,
        retailerLogo: this.retailer.logo,
      };
    },
    max() {
      return this.isLimited ? this.limit : this.retailer.products.length;
    },
    canLimit() {
      return this.retailer.products.length > this.limit;
    },
  },
};
</script>
