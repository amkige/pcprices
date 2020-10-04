<template>
  <PSkeleton :is-loading="false">
    <img
      :src="imgSrc"
      class="object-contain"
      alt=""
      @load="isLoading = false"
    />
  </PSkeleton>
</template>

<script>
import whiteToAlpha from "@/image-processing/white-to-alpha";
import PSkeleton from "./PSkeleton";

const CACHE = {};

export default {
  name: "PThumbnail",
  components: { PSkeleton },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imgSrc: "",
      isLoading: true,
    };
  },
  async beforeMount() {
    if (CACHE[this.src]) {
      this.imgSrc = CACHE[this.src];
      return;
    }

    this.imgSrc = CACHE[this.src] = await whiteToAlpha(this.src);
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/const";
img {
  #{$dark-selector} & {
    filter: brightness(1.2);
  }
}
</style>
