<template>
  <div class="color_input">
    <bordered-input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateInput"
    />
    <div
      class="color_btn"
      :style="{ background: modelValue ? `#${modelValue}` : 'none' }"
    ></div>
  </div>
</template>

<script>
import BorderedInput from "./BorderedInput";

export default {
  name: "text-input",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },

  components: {
    BorderedInput,
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.color_input {
  position: relative;
  &:before {
    content: "#";
    position: absolute;
    line-height: 1;
    left: 20px;
    top: 13px;
    top: calc(50% - 7px);
    color: var(--secondary-color);
  }
  input {
    padding-right: 100px;
    padding-left: 37px;
    &:focus {
      padding-right: 99px;
      padding-left: 36px;
    }
  }
  .color_btn {
    position: absolute;
    width: 60px;
    height: 20px;
    right: 20px;
    top: 10px;
    top: calc(50% - 10px);
    border-radius: 5px;
  }
}
</style>
