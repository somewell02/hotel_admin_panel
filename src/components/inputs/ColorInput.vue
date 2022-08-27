<template>
  <div class="color_input">
    <bordered-input
      type="text"
      :placeholder="placeholder ?? $t('color')"
      :disabled="disabled"
      :value="modelValue"
      @input="updateInput"
    />
    <div
      class="color_btn"
      :style="{ background: modelValue ? `#${modelValue}` : 'none' }"
      @click="disabled ? null : (isPickerShow = !isPickerShow)"
    ></div>
    <color-picker
      v-if="isPickerShow"
      class="color_picker"
      theme="light"
      :color="color"
      :colors-default="null"
      @changeColor="changeColor"
    />
  </div>
</template>

<script>
import BorderedInput from "./BorderedInput";
import { ColorPicker } from "vue-color-kit";

export default {
  name: "color-input",
  components: {
    BorderedInput,
    ColorPicker,
  },

  data() {
    return {
      color: "#" + this.modelValue,
      isPickerShow: false,
    };
  },

  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    changeColor(color) {
      this.color = color.hex;
      const c = color.hex.replace("#", "");
      this.updateColor(c);
    },

    updateInput(event) {
      this.updateColor(event.target.value);
    },

    updateColor(color) {
      this.$emit("update:modelValue", color);
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
    cursor: pointer;
  }
  .color_picker {
    position: absolute;
    bottom: 120%;
    right: -10%;
  }
}
</style>

<style lang="scss">
@import "vue-color-kit/dist/vue-color-kit.css";
.hu-color-picker {
  .color-set .color-alpha,
  .color-show,
  .color-type {
    display: none;
  }
}
</style>
