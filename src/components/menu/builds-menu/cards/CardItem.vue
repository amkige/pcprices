<template>
  <div
    :class="`gradient-${build.id % 8 || 8}`"
    class="relative flex items-center justify-between w-full text-white transition-transform duration-150 rounded-md cursor-pointer card"
    @click="setActive"
  >
    <div class="flex flex-col items-start justify-between h-full font-semibold">
      <div class="flex items-center px-2 py-1 bg-black rounded bg-opacity-05">
        <span class="mr-1 text-sm">{{ CURRENCY }}</span>
        <span>{{ stringifyPrice(build.totalPrice) }}</span>
      </div>
      <div class="flex items-center space-x-4">
        <span v-if="build.imported" title="Imported">
          <AnchorIcon size="20" />
        </span>
        <span class="whitespace-pre-wrap">{{ build.name }}</span>
      </div>
    </div>
    <CaseImage />
  </div>
</template>

<script>
import AnchorIcon from "vue-feather-icons/icons/AnchorIcon";
import CaseImage from "@/assets/images/case.svg?inline";
import { CURRENCY } from "@/const";
import stringifyPrice from "@/utils/stringifyPrice";

export default {
  name: "CardItem",
  components: {
    AnchorIcon,
    CaseImage,
  },
  props: {
    build: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      CURRENCY,
    };
  },
  methods: {
    stringifyPrice,
    setActive() {
      this.$store.dispatch("builds/setActiveBuildId", this.build.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/const";

.card {
  height: 180px;
  padding: 30px 35px;

  $shadows: (
    (#15eded, #029cf5),
    (#ffdf40, #ff8359),
    (#46eeaa, #2cbfc7),
    (#ff63de, #b122e5),
    (#aff57a, #54d169),
    (#5496ff, #8739e5),
    (#ff7c6e, #f5317f),
    (#59c2ff, #1270e3)
  );

  @each $from, $to in $shadows {
    $i: index($shadows, ($from, $to));

    &.gradient-#{$i} {
      background-image: linear-gradient(150deg, $from, $to 85%);
      box-shadow: 0 15px 25px -5px rgba($to, 0.3);

      #{$dark-selector} & {
        box-shadow: none;
      }
    }
  }

  &:hover {
    transform: scale(1.02);
  }
}
</style>
