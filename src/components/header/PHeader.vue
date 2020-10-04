<template>
  <header class="flex justify-between lg:justify-end md:space-x-8">
    <MenuToggle class="space-x-4 item" />
    <ThemeToggle class="space-x-4 item" />
  </header>
</template>

<script>
import MenuToggle from "./items/MenuToggle";
import ThemeToggle from "./items/ThemeToggle";

export default {
  name: "PHeader",
  components: { MenuToggle, ThemeToggle },
};
</script>

<style scoped>
.item {
  @apply flex;
  @apply items-center;
  @apply cursor-pointer;
  @apply select-none;
  @apply p-3;
}

.item:last-child {
  min-width: 125.45px;
  justify-content: flex-end;
}
</style>
