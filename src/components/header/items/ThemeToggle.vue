<template>
  <div title="Theme" @click="toggle">
    <span>{{ currentSetting }}</span>
    <MoonIcon v-if="isDark" class="text-yellow-400" />
    <SunIcon v-else class="text-gray-700" />
  </div>
</template>

<script>
import { SunIcon, MoonIcon } from "vue-feather-icons";
import { mapGetters } from "vuex";

export default {
  name: "ThemeButton",
  components: { SunIcon, MoonIcon },
  computed: {
    ...mapGetters("ui", ["isDark", "isSystemPref"]),

    currentSetting() {
      return this.isSystemPref ? "System" : this.isDark ? "Dark" : "Light";
    },

    isSystemSupported() {
      let prefDark = "(prefers-color-scheme: dark)",
        prefLight = "(prefers-color-scheme: light)";

      return (
        matchMedia &&
        (matchMedia(prefDark).matches || matchMedia(prefLight).matches)
      );
    },
  },
  mounted() {
    this.isSystemSupported
      ? this.watchSystemTheme()
      : this.setSystemPref(false);
  },
  methods: {
    setDark(value) {
      this.$store.commit("ui/setDark", value);
    },

    setSystemPref(value) {
      this.$store.commit("ui/setSystemPref", value);
    },
    setSystemTheme(value) {
      this.$store.commit("ui/setSystemTheme", value);
    },

    watchSystemTheme() {
      const media = matchMedia("(prefers-color-scheme: dark)");

      const handleChange = ({ matches }) => {
        this.setSystemTheme(matches);
        if (this.isDark && matches) this.setSystemPref(true);
        if (!this.isDark && !matches) this.setSystemPref(true);

        if (this.isSystemPref) this.setDark(matches);
      };

      handleChange(media);
      media.addEventListener("change", handleChange);
    },

    toggle() {
      if (this.isSystemSupported)
        this.isSystemPref
          ? this.setSystemPref(false)
          : this.setSystemPref(true);

      this.setDark(!this.isDark);
    },
  },
};
</script>

<style scoped>
.feather path,
.feather circle {
  fill: currentColor;
}
</style>
