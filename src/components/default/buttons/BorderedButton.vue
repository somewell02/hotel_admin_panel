<template>
  <button>
    <slot />
  </button>
</template>

<script>
export default {
  name: "bordered-button",
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  padding: 10px 20px;
  height: 40px;
  font-size: 15px;
  margin: 0;
  border-radius: 5px;
  min-width: 120px;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  background: none;
  &:hover {
    background: var(--border-color);
  }
}
</style>
