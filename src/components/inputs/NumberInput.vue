<template>
  <bordered-input type="number" :value="modelValue" @input="updateInput" />
</template>

<script>
import BorderedInput from "./BorderedInput";

export default {
  name: "text-input",
  props: {
    modelValue: {
      type: Number,
      default: 0,
      required: true,
    },
  },

  components: {
    BorderedInput,
  },

  methods: {
    updateInput(event) {
      const value = parseInt(event.target.value);
      this.$emit("update:modelValue", value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
