<template>
  <footer
    class="flex items-center justify-center w-full space-x-4 text-sm text-gray-600"
  >
    <a
      class="flex items-center"
      href="https://github.com/samyzkhalil/pcprices"
      target="_blank"
    >
      <GithubIcon size="1.5x" class="mr-1" stroke-width="1.5" /> GitHub
    </a>
    <span class="opacity-50">|</span>
    <a href="https://www.buymeacoffee.com/leondaz" target="_blank">
      <img class="rounded" src="@/assets/images/bmc.svg" width="150" />
    </a>
  </footer>
</template>

<script>
import GithubIcon from "vue-feather-icons/icons/GithubIcon";
export default {
  name: "PFooter",
  components: { GithubIcon },
};
</script>
