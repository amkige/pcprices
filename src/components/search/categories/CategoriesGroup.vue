<template>
  <div id="wrapper" class="overflow-hidden sm:px-8 sm:-mx-8">
    <div ref="scrollView">
      <ul class="flex w-0 space-x-3">
        <CategoryItem
          v-for="[name, hasVariants] in components"
          :key="name"
          :name="name"
          :has-variants="hasVariants"
          @click.native="setActive($event, name)"
        />
        <transition
          enter-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <span
            v-show="category"
            ref="indicator"
            class="absolute top-0 left-0 w-32 h-full transition-all duration-150 transform bg-gray-900 rounded-md pointer-events-none h-30 sm:w-52 sm:h-30 dark:bg-gray-200 ease-how-the-f-do-i-name-easings"
            style="margin: 0"
          />
        </transition>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ScrollBooster from "./scrollbooster";
import CategoryItem from "./CategoryItem";
export default {
  name: "CategoriesGroup",
  components: { CategoryItem },
  data() {
    return {
      isDragging: false,
      components: [
        ["cpu"],
        ["gpu"],
        ["ram", true],
        ["motherboard", true],
        ["mouse", true],
        ["keyboard", true],
        ["cooling"],
        ["case", true],
        ["psu", true],
        ["hdd"],
        ["ssd", true],
        ["monitor", true],
      ],
    };
  },
  computed: mapGetters("search", ["category"]),
  mounted() {
    new ScrollBooster({
      viewport: this.$refs.scrollView,
      scrollMode: "transform",
      direction: "horizontal",
      onUpdate: (e) => {
        this.isDragging = e.isDragging;
      },
    });
  },
  methods: {
    setActive({ currentTarget }, name) {
      if (this.isDragging) return;

      const rect = currentTarget.getBoundingClientRect();
      const parentRect = currentTarget.parentNode.getBoundingClientRect();

      this.$refs.indicator.style.setProperty(
        "--transform-translate-x",
        `${rect.x - parentRect.x}px`
      );

      this.$store.commit("search/result/resetResults");
      this.$store.commit("search/setCategory", name);
      if (this.category) this.$store.dispatch("search/search");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/const";

@screen sm {
  #wrapper {
    position: relative;

    &::before,
    &::after {
      content: "";
      width: 2rem;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 2;
      padding: 1px;

      --color: theme("colors.white");
      --dir: to right;

      #{$dark-selector} & {
        --color: theme("colors.gray.900");
      }

      background: linear-gradient(var(--dir), var(--color), transparent);
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
      --dir: to left;
    }
  }
}
</style>
