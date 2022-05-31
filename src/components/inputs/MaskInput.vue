<template>
  <imask-input
    :value="modelValue"
    @input="updateInput"
    class="mask_input gray"
  />
</template>

<script>
import { IMaskComponent } from "vue-imask";

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
    "imask-input": IMaskComponent,
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.mask_input {
  width: 100%;
  padding: 0 20px;
  height: 40px;
  background: transparent;
  outline: none;
  border-radius: 3px;
  font-size: 14px;
  &.gray {
    color: var(--text-color);
    border: 1px solid var(--input-color);
    &:focus {
      border: 2px solid var(--input-color);
      padding: 0 19px;
    }
    &::placeholder {
      color: var(--secondary-color);
    }
  }
}
</style>
