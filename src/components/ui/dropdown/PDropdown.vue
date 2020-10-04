<template>
  <div v-click-outside="close" class="relative">
    <div class="cursor-pointer select-none" @click="toggle">
      <slot name="button" />
    </div>
    <transition
      enter-active-class="duration-150 transform transition-pop"
      enter-class="scale-75 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="duration-100 transform transition-pop"
      leave-class="scale-100 opacity-100"
      leave-to-class="scale-75 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 z-10 mt-2 origin-top-right bg-gray-900 rounded-md shadow-md min-w-32 dark:bg-white"
        style="width: max-content"
      >
        <div>
          <ul class="px-2 py-3">
            <slot name="items" />
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "PDropdown",
  directives: { ClickOutside },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>
