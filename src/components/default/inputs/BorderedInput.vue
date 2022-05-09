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
  border: none;
  border-radius: 3px;
  font-size: 15px;
  &.gray {
    color: var(--text-color);
    outline: 1px solid var(--input-color);
    &:focus {
      outline: 2px solid var(--input-color);
    }
    &::placeholder {
      color: var(--secondary-color);
    }
  }
}
</style>
