<template>
  <div class="relative h-full">
    <AppButton
      v-if="builds.length"
      class="flex items-center px-5 py-3 mx-auto mb-8"
      variant="gray"
      @click.native="createBuild"
    >
      <span>New Build</span>
      <PlusIcon size="20" class="ml-1" />
    </AppButton>
    <Card v-for="build in builds" :key="build.id" :build="build" class="mb-8" />
    <div
      v-if="!builds.length"
      class="absolute flex flex-col items-center space-y-2 text-center transform -translate-x-1/2 -translate-y-1/2 opacity-50 top-1/2 left-1/2"
    >
      <PackageIcon
        size="10x"
        stroke-width="0.8"
        fill="currentColor"
        class="stroke-gray-100 dark:stroke-gray-800"
      />
      <p class="font-medium">Add Products to Create a New Build</p>
    </div>
  </div>
</template>

<script>
import Card from "./CardItem";
import AppButton from "@/components/ui/PButton";
import PackageIcon from "vue-feather-icons/icons/PackageIcon";
import PlusIcon from "vue-feather-icons/icons/PlusIcon";
import { mapGetters } from "vuex";

export default {
  name: "CardGroup",
  components: { Card, PackageIcon, AppButton, PlusIcon },
  computed: mapGetters({
    builds: "builds/builds",
  }),
  methods: {
    createBuild() {
      this.$store.dispatch("builds/createBuild");
    },
  },
};
</script>
