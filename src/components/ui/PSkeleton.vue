<template>
  <div :class="{ 'bg-gray-200 rounded dark:bg-gray-700': isLoading }">
    <slot v-if="!isLoading" />
  </div>
</template>

<script>
export default {
  name: "PSkeleton",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
