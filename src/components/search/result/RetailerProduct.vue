<template>
  <li class="flex items-center space-x-4 sm:space-x-6">
    <PThumbnail class="flex-shrink-0 w-26 h-26" :src="product.thumb" />

    <div class="flex flex-col justify-around w-full">
      <div>
        <p class="text-sm uppercase opacity-50">{{ product.name.brand }}</p>
        <a class="vertical-truncate" :href="product.href" target="_blank">
          {{
            (product.name.brand ? product.name.part : product.name.full) ||
            product.name
          }}
        </a>
      </div>
      <div class="flex items-center justify-between mt-3">
        <span class="font-medium sm:text-lg">
          <span v-if="product.price > 0">
            <span class="text-base">{{ CURRENCY }}</span>
            {{ product.price }}
          </span>
          <span v-else>unavailable</span>
        </span>

        <div @click="toggleProduct">
          <PButton class="right-0 invisible px-4 py-3 text-sm">
            <span v-if="inCurrentBuild" class="hidden sm:block">
              Remove Product
            </span>
            <span v-else class="hidden sm:block">Add Product</span>
            <PlusIcon class="block sm:hidden" />
          </PButton>

          <transition
            enter-class="scale-75 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-class="scale-100 opacity-100"
            leave-to-class="scale-75 opacity-0"
          >
            <PButton
              v-if="inCurrentBuild"
              :key="1"
              class="absolute right-0 p-2 text-sm sm:py-3 sm:p-4"
              variant="gray"
            >
              <span class="hidden sm:block">Remove Product</span>
              <XIcon class="block sm:hidden" />
            </PButton>

            <PButton
              v-else
              :key="2"
              class="absolute right-0 p-2 text-sm sm:py-3 sm:p-4"
            >
              <span class="hidden sm:block">Add Product</span>
              <PlusIcon class="block sm:hidden" />
            </PButton>
          </transition>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
import _find from "lodash/find";
import { CURRENCY } from "@/const";
import { PlusIcon, XIcon } from "vue-feather-icons";
import PButton from "@/components/ui/PButton";
import PThumbnail from "@/components/ui/PThumbnail";

export default {
  name: "RetailerProduct",
  components: { PButton, PlusIcon, XIcon, PThumbnail },
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
    ...mapGetters("builds", ["activeBuild"]),
    inCurrentBuild() {
      return (
        this.activeBuild &&
        _find(this.activeBuild.products, { id: this.product.id })
      );
    },
  },
  methods: {
    addToBuild() {
      this.$store.dispatch("builds/addProduct", this.product);
    },
    removeFromBuild() {
      this.$store.dispatch("builds/deleteProduct", this.product.id);
    },
    toggleProduct() {
      this.inCurrentBuild ? this.removeFromBuild() : this.addToBuild();
    },
  },
};
</script>
