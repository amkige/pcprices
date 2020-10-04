<template>
  <div
    ref="editable"
    :contenteditable="isEditable"
    class="flex items-center rounded-sm outline-none select-none cursor-text"
    :class="{ 'shadow-outline': isEditable }"
    @dblclick="setEditable"
    @blur="isEditable = false"
    @input="$emit('input', $event.target.innerText)"
  >
    <span v-once>{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: "PEditable",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isEditable: false,
    };
  },
  methods: {
    placeCaretAtEnd() {
      let el = this.$refs.editable;
      el.focus();

      let range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);

      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    },
    setEditable() {
      this.isEditable = true;
      this.$nextTick(() => {
        this.placeCaretAtEnd();
      });
    },
  },
};
</script>
