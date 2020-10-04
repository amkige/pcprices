<template>
  <aside
    class="fixed inset-y-0 right-0 flex flex-shrink-0 w-full duration-300 transition-spacing lg:relative"
    :is-open="isOpen"
  >
    <div
      class="fixed inset-y-0 overflow-x-hidden bg-gray-100 dark:bg-gray-800 rounded-t-lg"
    >
      <slot></slot>
    </div>
  </aside>
</template>

<script>
export default {
  name: "PMenu",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/const";

$MenuHeight: calc(100% - #{$HeaderHeight});
$headerSafeMargin: 100px; // Browser's header on mobile auto hides on scroll and cause problems.

aside {
  height: $MenuHeight;
  transform: translateY(calc(100% + #{$HeaderHeight} + #{$headerSafeMargin}));
}

aside > div {
  width: 100%;

  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
}

[is-open] {
  transform: translateY(calc(100% - #{$MenuHeight}));
}

@screen sm {
  aside {
    transform: translate(100%, 0);
  }

  aside,
  aside > div {
    width: #{$MenuWidth};
    height: 100%;
    border-radius: 0;
  }

  [is-open] {
    transform: translate(0, 0);
  }
}

@screen lg {
  aside {
    transform: none;
    margin-right: calc(#{$MenuWidth} * -1);
  }

  [is-open] {
    transform: none;
    margin-right: 0;
  }
}
</style>
