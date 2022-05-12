<template>
  <button :class="btnClass">
    <slot />
  </button>
</template>

<script>
export default {
  name: "filled-button",
  props: {
    color: {
      type: String,
      default: "",
      required: false,
    },
  },

  computed: {
    btnClass() {
      const colors = ["primary"];
      if (this.color == null || !colors.includes(this.color)) return "primary";
      else return this.color;
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  padding: 10px;
  height: 40px;
  font-size: 15px;
  border: 0;
  margin: 0;
  border-radius: 5px;
  min-width: 120px;
  &.primary {
    background: var(--primary-color);
    color: white;
    &:hover {
      background: none;
      outline: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
  }
}
</style>
