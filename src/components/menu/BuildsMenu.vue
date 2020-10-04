<template>
  <PMenu :is-open="isOpen">
    <transition name="slide-left">
      <CardsGroup v-if="!activeBuild" class="p-6 sm:p-12" />
    </transition>

    <transition name="slide-right">
      <ProductsGroup v-if="activeBuild" class="p-6 sm:p-12" />
    </transition>
  </PMenu>
</template>

<script>
import PMenu from "@/components/ui/PMenu";
import CardsGroup from "./builds-menu/cards/CardsGroup";
import ProductsGroup from "./builds-menu/products/ProductsGroup";

import { mapGetters } from "vuex";
export default {
  name: "BuildsMenu",
  components: { PMenu, CardsGroup, ProductsGroup },
  computed: mapGetters({
    isOpen: "ui/isBuildMenuOpen",
    activeBuild: "builds/activeBuild",
  }),
};
</script>

<style lang="scss" scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  @apply absolute inset-x-0 transition-transform duration-300 transform;
}

.slide-left-enter-to,
.slide-right-enter-to {
  transform: translatex(0);
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translatex(-100%);
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translatex(100%);
}
</style>
