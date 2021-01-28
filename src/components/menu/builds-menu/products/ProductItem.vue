<template>
  <div
    class="relative flex items-center w-full px-6 py-5 space-x-4 bg-white rounded-lg product dark:bg-gray-900 group"
  >
    <div class="flex flex-col items-center" style="max-width: 1.5rem">
      <div class="flex" @click="changeQty(1)">
        <PButton class="w-6 h-6" variant="gray">
          <PlusIcon class="m-auto" size="1x" />
        </PButton>
      </div>
      <div class="my-1 tabular-nums">
        {{ product.qty }}<span class="opacity-50">x</span>
      </div>
      <div class="flex" @click="changeQty(-1)">
        <PButton class="w-6 h-6" variant="gray">
          <MinusIcon class="m-auto" size="1x" />
        </PButton>
      </div>
    </div>

    <PThumbnail
      :src="product.thumb"
      class="flex-shrink-0 object-cover w-16 h-16 flex"
    />

    <div class="flex flex-col w-full h-full space-y-1">
      <div>
        <a
          :href="product.href"
          class="text-sm leading-tight vertical-truncate"
          target="_blank"
        >
          {{ product.name.full || product.name }}
        </a>
      </div>

      <div class="flex items-center justify-between">
        <span class="flex items-center flex-shrink-0 font-medium">
          <span class="mr-1 sm:text-sm">{{ CURRENCY }}</span>
          <span>{{ product.price }}</span>
        </span>
        <img
          style="width: 60px; height: 22px"
          class="object-contain text-xs dark:invert"
          :src="product.retailerLogo"
          :alt="product.retailerName"
          :title="product.retailerName"
        />
      </div>

      <div
        class="absolute right-0 transform translate-x-1/2 -translate-y-1/2 top-1/2"
        :class="{
          ' transition-pop opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 duration-150 delay-200 in-out-expo': !isTouchScreen,
        }"
        @click="removeProduct"
      >
        <PButton class="p-2">
          <TrashIcon size="20" />
        </PButton>
      </div>
    </div>
  </div>
</template>

<script>
import { isTouchScreen } from "@/const";
import { CURRENCY } from "@/const";
import PThumbnail from "@/components/ui/PThumbnail";
import PButton from "@/components/ui/PButton";
import PlusIcon from "vue-feather-icons/icons/PlusIcon";
import MinusIcon from "vue-feather-icons/icons/MinusIcon";
import TrashIcon from "vue-feather-icons/icons/Trash2Icon";

export default {
  name: "ProductItem",
  components: { PThumbnail, PButton, PlusIcon, MinusIcon, TrashIcon },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { CURRENCY };
  },
  computed: {
    isTouchScreen,
  },
  methods: {
    removeProduct() {
      this.$store.dispatch("builds/deleteProduct", this.product.id);
    },
    changeQty(step) {
      this.$store.dispatch("builds/setQty", {
        productId: this.product.id,
        newQty: this.product.qty + step,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@layer utilities {
  @variants dark {
    .invert {
      filter: brightness(0) invert(1);
    }
  }
}
</style>
