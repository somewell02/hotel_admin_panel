<template>
  <input :class="inputClass" />
</template>

<script>
export default {
  name: "bordered-input",
  props: {
    color: {
      type: String,
      default: "",
      required: false,
    },
  },

  computed: {
    inputClass() {
      const colors = ["gray"];
      if (this.color == null || !colors.includes(this.color)) return "gray";
      else return this.color;
    },
  },
};
</script>

<style lang="scss" scoped>
input {
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
