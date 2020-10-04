<template>
  <div
    :class="stateProps.wrapperClasses"
    class="box-content flex items-center justify-end p-2 mr-4 overflow-hidden text-white uppercase transition-all duration-200 bg-gray-900 bg-opacity-0 rounded-full sm:p-3"
    style="width: 24px"
  >
    <span
      v-if="stateProps.text"
      class="ml-2 mr-2 sm:mr-3 text-sm whitespace-no-wrap sm:text-base"
    >
      {{ stateProps.text }}
    </span>

    <component
      :is="stateProps.icon"
      class="flex-shrink-0 transform sm:scale-100 transition-transform duration-150"
      :class="stateProps.iconsClasses"
    />
  </div>
</template>

<script>
import { SearchIcon } from "vue-feather-icons";
import { AlertCircleIcon } from "vue-feather-icons";
import Spinner from "@/components/ui/Spinner";

export default {
  name: "Status",
  components: { SearchIcon, AlertCircleIcon, Spinner },
  props: {
    state: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      states: {
        default: {
          icon: "SearchIcon",
          wrapperClasses: "text-gray-500 pointer-events-none",
        },
        typing: {
          icon: "SearchIcon",
          text: "search",
          wrapperClasses: "active sw cursor-pointer",
          iconsClasses: "scale-75",
        },
        loading: {
          icon: "Spinner",
          wrapperClasses: "active pointer-events-none",
        },
        noResult: {
          icon: "AlertCircleIcon",
          text: "no result",
          wrapperClasses: "active aw pointer-events-none",
          iconsClasses: "scale-75",
        },
        importing: {
          icon: "Spinner",
          text: "importing",
          wrapperClasses: "active iw pointer-events-none",
          iconsClasses: "scale-75",
        },
      },
    };
  },
  computed: {
    stateProps() {
      return this.states[this.state];
    },
  },
};
</script>

<style lang="scss" scoped>
// Hardcoded dimensions go brrr
.active {
  @apply bg-opacity-100;

  &.sw {
    width: 87px !important;

    @screen sm {
      width: 108px !important;
    }
  }

  &.aw {
    width: 109px !important;

    @screen sm {
      width: 132.5px !important;
    }
  }

  &.iw {
    width: 106px !important;

    @screen sm {
      width: 132px !important;
    }
  }
}
</style>
