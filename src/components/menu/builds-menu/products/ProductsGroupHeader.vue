<template>
  <div class="flex w-full">
    <div class="flex cursor-pointer select-none" @click="backToBuilds">
      <ChevronLeftIcon />
    </div>

    <PEditable
      ref="BuildName"
      v-model="buildName"
      class="px-2 mx-auto font-medium text-center"
      title="Double-click to edit"
    >
      <h3>{{ activeBuild.name }}</h3>
    </PEditable>

    <PDropdown ref="dropdown">
      <MoreHorizontalIcon slot="button" />

      <div slot="items">
        <PDropdownItem v-if="imageSrc" class="cursor-default">
          <a target="_blank" :href="imageSrc" class="w-full">
            <ExternalLinkIcon
              size="1.4x"
              stroke-width="1.5"
              class="box-content absolute p-1 mr-2 text-white rounded-full pointer-events-none bg-gradient-to-br from-brand1 to-brand2"
            />
            <img
              :src="imageSrc"
              class="object-contain w-48 h-24 mx-auto rounded-md"
              :alt="activeBuild.name"
            />
          </a>
        </PDropdownItem>

        <PDropdownItem
          v-if="shareUrl"
          class="relative"
          style="cursor: default !important"
        >
          <input
            ref="urlInput"
            readonly
            class="px-2 py-1 bg-gray-900 border border-gray-700 rounded outline-none select-none dark:border-gray-300 dark:bg-white"
            :value="shareUrl"
            @click="copyText"
          />
          <span
            class="absolute hidden px-2 py-1 text-xs transform -translate-y-1/2 bg-gray-900 rounded-l-full pointer-events-none dark:bg-white right-5 top-1/2"
          >
            Copied
          </span>
        </PDropdownItem>

        <PDropdownItem v-if="products.length" @click.native="createSummary">
          <ClipboardIcon size="1.4x" class="mr-2" stroke-width="1.5" /> View
          summary
        </PDropdownItem>

        <PDropdownItem v-if="products.length" @click.native="shareBuild">
          <LinkIcon size="1.4x" class="mr-2" stroke-width="1.5" /> Share
        </PDropdownItem>

        <PDropdownItem @click.native="toggleRename">
          <EditIcon size="1.4x" class="mr-2" stroke-width="1.5" /> Rename
        </PDropdownItem>
        <PDropdownItem @click.native="deleteBuild">
          <TrashIcon size="1.4x" class="mr-2" stroke-width="1.5" /> Delete
        </PDropdownItem>
      </div>
    </PDropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { CURRENCY } from "@/const";
import createSummary from "./create-summary";
import { exportBuild } from "@/api/share";
import PDropdownItem from "@/components/ui/dropdown/PDropdownItem";
import PDropdown from "@/components/ui/dropdown/PDropdown";
import PEditable from "@/components/ui/PEditable";
import ChevronLeftIcon from "vue-feather-icons/icons/ChevronLeftIcon";
import MoreHorizontalIcon from "vue-feather-icons/icons/MoreHorizontalIcon";
import ClipboardIcon from "vue-feather-icons/icons/ClipboardIcon";
import LinkIcon from "vue-feather-icons/icons/Link2Icon";
import EditIcon from "vue-feather-icons/icons/Edit2Icon";
import TrashIcon from "vue-feather-icons/icons/Trash2Icon";
import ExternalLinkIcon from "vue-feather-icons/icons/ExternalLinkIcon";

export default {
  name: "ProductsGroupHeader",
  components: {
    PDropdownItem,
    PDropdown,
    PEditable,
    ChevronLeftIcon,
    MoreHorizontalIcon,
    ClipboardIcon,
    LinkIcon,
    EditIcon,
    TrashIcon,
    ExternalLinkIcon,
  },
  data() {
    return {
      CURRENCY,
      shareUrl: null,
      imageSrc: null,
    };
  },
  computed: {
    ...mapGetters({
      activeBuild: "builds/activeBuild",
      products: "builds/activeBuildProducts",
    }),
    buildName: {
      get() {
        return this.activeBuild.name;
      },
      set(newName) {
        this.$store.dispatch("builds/renameBuild", {
          id: this.activeBuild.id,
          name: newName,
        });
      },
    },
  },
  watch: {
    products() {
      this.shareUrl = null;
      this.imageSrc = null;
    },
  },
  methods: {
    async createSummary() {
      this.imageSrc = await createSummary(
        this.products,
        this.activeBuild.totalPrice
      );
    },

    copyText() {
      this.$refs.urlInput.select();
      document.execCommand("copy");
    },
    backToBuilds() {
      this.$store.dispatch("builds/setActiveBuildId", null);
    },
    toggleRename() {
      this.$refs.BuildName.setEditable();
      this.$refs.dropdown.close();
    },
    deleteBuild() {
      this.$store.dispatch("builds/deleteBuild", this.activeBuild.id);
    },
    async shareBuild() {
      const build = {
        name: this.activeBuild.name,
        totalPrice: this.activeBuild.totalPrice,
        products: this.products,
      };

      let id = await exportBuild(build);
      if (id) {
        this.shareUrl = `${location.origin}/import/${id}`;
        this.$nextTick(() => {
          this.copyText();
        });
      }
    },
  },
};
</script>

<style scoped>
input:focus ~ span {
  display: block;
}
</style>
