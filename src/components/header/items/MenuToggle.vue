<template>
  <div class="flex items-center" @click="toggle">
    <span>{{ activeBuild ? "My Products" : "My Builds" }}</span>
    <div
      class="relative flex text-gray-700 dark:text-white"
      :class="{ fill: isBuildMenuOpen }"
    >
      <span class="absolute w-full text-sm font-bold text-center lh">
        {{ activeBuild ? activeBuildProductsCount : buildsCount }}
      </span>
      <HexagonIcon stroke-width="1.5" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { HexagonIcon } from "vue-feather-icons";

export default {
  name: "MenuToggle",
  components: { HexagonIcon },
  computed: {
    ...mapGetters("ui", ["isBuildMenuOpen"]),
    ...mapGetters("builds", [
      "activeBuild",
      "buildsCount",
      "activeBuildProductsCount",
    ]),
  },

  methods: {
    toggle() {
      this.$store.commit("ui/setBuildMenuOpen", !this.isBuildMenuOpen);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/const";
$size: 2.125rem;

.feather {
  width: $size;
  height: $size;
}

.fill {
  span {
    @apply text-white;

    #{$dark-selector} & {
      @apply text-gray-900;
    }
  }

  path {
    fill: currentColor;
  }
}

.lh {
  line-height: $size;
}
</style>
