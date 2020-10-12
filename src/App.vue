<template>
  <div
    id="app"
    class="flex"
    :class="{
      'h-screen overflow-hidden sm:overflow-unset': isBuildMenuOpen,
    }"
  >
    <div class="container flex flex-col h-full p-4 mx-auto sm:p-8 sm:pt-8">
      <PHeader />

      <!--   Header height: 58px, top padding: 2rem   -->
      <div
        class="space-y-4 transition-transform duration-700 delay-200 sm:space-y-12"
        :style="{
          transform: `translateY(${
            retailers.length
              ? 'max(100px, min(100px, (50vh - 50% - 58px - 2rem))'
              : 'max(50px, 50vh - 50% - 58px - 2rem)'
          })`,
        }"
      >
        <PLogo class="mx-auto transform scale-75 sm:scale-100" />
        <Search />
      </div>
      <transition
        enter-active-class="transition-opacity duration-200 delay-1000"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <PFooter v-if="!retailers.length" class="mt-auto" />
      </transition>
    </div>

    <BuildsMenu />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { importBuild } from "@/api/share";
import PHeader from "@/components/header/PHeader";
import Search from "@/components/search/Search";
import BuildsMenu from "@/components/menu/BuildsMenu";
import PLogo from "@/components/ui/PLogo";
import PFooter from "@/components/PFooter";

export default {
  name: "App",
  components: {
    PHeader,
    Search,
    BuildsMenu,
    PLogo,
    PFooter,
  },
  computed: {
    ...mapGetters("ui", [
      "isDark",
      "isSystemDark",
      "status",
      "isBuildMenuOpen",
    ]),
    ...mapGetters("search/result", ["retailers"]),
  },
  watch: {
    isDark: {
      handler(dark) {
        document.body.classList[dark ? "add" : "remove"]("dark");
      },
      immediate: true,
    },
    isSystemDark: {
      handler(dark) {
        document.querySelector('link[rel="icon"]').href = dark
          ? require("@/assets/favicon/dark.png")
          : require("@/assets/favicon/default.png");
      },
      immediate: true,
    },
  },
  mounted() {
    let [path, value] = location.pathname.substr(1).split("/");

    if (path === "import" && value) {
      this.$store.commit("ui/setStatus", "importing");
      importBuild(value)
        .then((importedBuild) => {
          this.$store.dispatch("builds/importBuild", importedBuild);
          this.$store.commit("ui/setBuildMenuOpen", true);
        })
        .finally(() => {
          window.history.pushState({}, null, "/");
          this.$store.commit("ui/setStatus", "default");
        });
    }
  },
};
</script>

<style lang="scss">
@import url("https://rsms.me/inter/inter.css");
@import "src/styles/tailwind";
@import "styles/const";

html,
body,
#app {
  height: 100%;
}

:root {
  -webkit-tap-highlight-color: transparent;

  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @supports (font-variation-settings: normal) {
    font-family: "Inter var", sans-serif;
    font-feature-settings: "ss01";
  }
  @supports (font-feature-settings: normal) {
    font-feature-settings: "ss01";
  }

  @apply text-sm;
  @screen sm {
    @apply text-base;
  }
}

#{$dark-selector} {
  @apply text-white bg-gray-900;
}

@layer utilities {
  @responsive {
    .overflow-unset {
      overflow: unset;
    }
  }
}

a {
  line-height: 1.5 !important;
  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
}

.vertical-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
