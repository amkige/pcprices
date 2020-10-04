<template>
  <div class="relative space-y-8">
    <ProductsGroupHeader />

    <transition-group
      ref="products"
      tag="div"
      class="relative mr-3 space-y-4 sm:mr-0"
      move-class="duration-200 transition-pop ease-how-the-f-do-i-name-easings2"
      enter-active-class="duration-200 transition-pop ease-how-the-f-do-i-name-easings2"
      enter-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="absolute duration-200 transition-pop ease-how-the-f-do-i-name-easings2"
      leave-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div v-for="product in products" :key="product.id">
        <ProductItem :product="product" />
      </div>
      <div
        v-if="products.length"
        id="totalPrice"
        key="totalPrice"
        class="sticky px-6 py-4 mx-auto font-bold text-center text-white bg-gray-900 rounded-full shadow-xl dark:text-black dark:bg-white dark:shadow-none bottom-6 sm:bottom-12 tabular-nums"
        style="width: 180px"
      >
        {{ CURRENCY }} {{ stringifyPrice(activeBuild.totalPrice) }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import stringifyPrice from "@/utils/stringifyPrice";
import { CURRENCY } from "@/const";
import ProductsGroupHeader from "./ProductsGroupHeader";
import ProductItem from "./ProductItem";

export default {
  name: "ProductsGroup",
  components: { ProductsGroupHeader, ProductItem },
  data() {
    return {
      CURRENCY,
    };
  },
  computed: {
    ...mapGetters({
      activeBuild: "builds/activeBuild",
      products: "builds/activeBuildProducts",
    }),
  },
  methods: {
    stringifyPrice,
  },
};
</script>
