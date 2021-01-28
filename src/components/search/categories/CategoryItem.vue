<template>
  <li
    class="flex flex-shrink-0 w-32 space-y-3 bg-gray-100 rounded-md cursor-pointer h-24 dark:bg-gray-800 sm:w-52 sm:h-30"
    :active="isActive"
  >
    <div
      class="relative z-10 flex flex-col items-center m-auto space-y-1 sm:space-y-3"
    >
      <div class="w-16 h-12 sm:w-24 sm:h-16">
        <transition
          enter-active-class="duration-150 ease-how-the-f-do-i-name-easings"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-150 ease-how-the-f-do-i-name-easings"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <img
            :key="imageSrc"
            :src="imageSrc"
            :alt="name"
            class="absolute object-contain"
            style="width: inherit; height: inherit"
          />
        </transition>
      </div>

      <span
        class="text-xs uppercase transition-all duration-150 opacity-50 ease-how-the-f-do-i-name-easings"
      >
        {{ name }}
      </span>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CategoryItem",
  props: {
    name: {
      type: String,
      required: true,
    },
    hasVariants: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("ui", ["isDark"]),
    ...mapGetters("search", ["category"]),
    isActive() {
      return this.name === this.category;
    },
    imageSrc() {
      const filename = this.name;

      if (this.hasVariants) {
        const light = `https://res.cloudinary.com/dfgjeebfv/image/upload/c_fit,f_auto,h_64,q_auto,w_96/pcprices/cat_parts/${filename}-dark`;
        const dark = `https://res.cloudinary.com/dfgjeebfv/image/upload/c_fit,f_auto,h_64,q_auto,w_96/pcprices/cat_parts/${filename}-light`;

        return (this.isDark && !this.isActive) ||
          (!this.isDark && this.isActive)
          ? dark
          : light;
      } else {
        return `https://res.cloudinary.com/dfgjeebfv/image/upload/c_fit,f_auto,h_64,q_auto,w_96/pcprices/cat_parts/${filename}`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/const";

[active] span {
  @apply text-white;
  @apply opacity-100;

  #{$dark-selector} & {
    @apply text-black;
  }
}
</style>
