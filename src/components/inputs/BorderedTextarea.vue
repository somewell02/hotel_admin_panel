<template>
  <textarea
    :class="inputClass"
    :value="modelValue"
    @input="updateInput"
  ></textarea>
</template>

<script>
export default {
  name: "bordered-textarea",
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

  computed: {
    inputClass() {
      const colors = ["gray"];
      if (!this.color || !colors.includes(this.color)) return "gray";
      else return this.color;
    },
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  @include custom-scroll;
  width: 100%;
  padding: 10px 20px;
  min-height: 40px;
  background: transparent;
  outline: none;
  border-radius: 5px;
  font-size: 14px;
  line-height: 1.3;
  &.gray {
    color: var(--text-color);
    border: 1px solid var(--input-color);
    &:focus {
      border: 2px solid var(--input-color);
      padding: 9px 19px;
    }
    &::placeholder {
      color: var(--secondary-color);
    }
  }
}
</style>
