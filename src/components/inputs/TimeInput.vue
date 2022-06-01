<template>
  <mask-input
    :modelValue="modelValue"
    @input="updateInput"
    mask="#0{:}*0"
    :definitions="{ '#': /[0-2]/, '*': /[0-5]/ }"
    :maxLength="5"
  />
</template>

<script>
import MaskInput from "./MaskInput";

export default {
  name: "time-input",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  components: {
    MaskInput,
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
