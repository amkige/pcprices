<template>
  <div class="flex">
    <span class="m-auto" />
  </div>
</template>

<script>
export default {
  name: "Spinner",
};
</script>

<style scoped>
div {
  width: 24px;
  height: 24px;
}

span {
  display: block;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  @apply animate-spin;
}
</style>
