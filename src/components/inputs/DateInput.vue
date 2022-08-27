<template>
  <mask-input
    :modelValue="date"
    @input="updateInput"
    mask="00{.}00{.}0000"
    :definitions="{ '#': /[0-3]/, '*': /[0-1]/, $: /[0-2]/ }"
    :maxLength="10"
  />
</template>

<script>
import MaskInput from "./MaskInput";

import { msToDayMonthYear } from "@/services/methods/datetime";

export default {
  name: "date-input",
  data() {
    return {
      date: msToDayMonthYear(this.modelValue),
    };
  },

  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },

  components: {
    MaskInput,
  },

  methods: {
    updateInput(event) {
      if (event.target.value.length == 10) {
        const d = Date.parse(event.target.value);
        if (d && d >= 0) {
          this.$emit("update:modelValue", d);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
