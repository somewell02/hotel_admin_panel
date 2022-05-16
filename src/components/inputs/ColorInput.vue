<template>
  <div class="color_input">
    <bordered-input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateInput"
    />
    <div class="color_btn" :style="{ background: modelValue ?? 'none' }"></div>
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
  input {
    padding-right: 100px;
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
