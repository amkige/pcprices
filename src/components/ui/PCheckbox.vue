<template>
  <div class="flex items-center space-x-2 select-none">
    <input
      id="strict"
      :checked="value"
      type="checkbox"
      @input="$emit('input', $event.target.checked)"
    />
    <label for="strict">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "PCheckbox",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/const";

input[type="checkbox"] {
  --active: theme("colors.gray.800");
  --active-inner: #fff;
  --border: theme("colors.gray.400");
  --border-hover: theme("colors.gray.600");

  appearance: none;
  width: 19px;
  height: 19px;
  outline: none;
  vertical-align: top;
  position: relative;
  margin: 0;
  cursor: pointer;
  border: 1px solid var(--bc, var(--border));
  background: var(--b);
  transition: background 200ms, border 200ms;
  border-radius: 6px;
}

#{$dark-selector} input[type="checkbox"] {
  --border: theme("colors.gray.700");
}

input[type="checkbox"]:after {
  content: "";
  display: block;
  position: absolute;
  transition: opacity 100ms;
  width: 5px;
  height: 9px;
  border: 2px solid var(--active-inner);
  border-top: 0;
  border-left: 0;
  top: 3px;
  left: 6px;
  transform: rotate(43deg);
}
input[type="checkbox"]:checked {
  --b: var(--active);
  --o: 1;
}

input[type="checkbox"]:not(:checked):hover {
  --bc: var(--border-hover);
}

input[type="checkbox"]:after {
  opacity: var(--o, 0);
}
input[type="checkbox"] + label {
  line-height: 18px;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  margin-left: 8px;
}
</style>
