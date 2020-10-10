<template>
  <MonoLogo v-if="isDark" />
  <DefaultLogo v-else />
</template>

<script>
import { mapGetters } from "vuex";
import DefaultLogo from "@/assets/logo/default.svg?inline";
import MonoLogo from "@/assets/logo/mono.svg?inline";

export default {
  name: "PLogo",
  components: {
    DefaultLogo,
    MonoLogo,
  },
  computed: mapGetters("ui", ["isDark"]),
};
</script>

<style scoped></style>
