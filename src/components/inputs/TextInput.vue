<template>
  <bordered-input type="text" :value="modelValue" @input="updateInput" />
</template>

<script>
import BorderedInput from "./BorderedInput";

export default {
  name: "text-input",
  props: {
    modelValue: {
      type: String,
      default: "",
      required: true,
    },
    color: {
      type: String,
      default: "",
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

<style lang="scss" scoped></style>
