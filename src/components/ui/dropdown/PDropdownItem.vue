<template>
  <span
    class="block px-4 py-3 text-sm leading-5 text-white rounded-md cursor-pointer select-none hover:bg-gray-800 dark:text-black dark:hover:bg-gray-100 flex items-center"
    style="min-width: 120px"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: "DropdownItem",
};
</script>
