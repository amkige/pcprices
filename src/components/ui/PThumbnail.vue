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

    this.imgSrc = CACHE[this.src] = this.src;
  },
};
</script>
