<template>
  <button
    class="transition-transform duration-100 transform rounded-full hover:scale-105 active:scale-75 focus:outline-none"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "PButton",
};
</script>

<style lang="scss" scoped>
@import "src/styles/const";

button {
  &:not([variant]) {
    @apply text-white bg-gradient-to-br from-brand1 to-brand2 shadow-brand;
  }

  &[variant="gray"] {
    @apply bg-gray-200;

    #{$dark-selector} & {
      @apply bg-gray-700;
    }
  }
}
</style>
