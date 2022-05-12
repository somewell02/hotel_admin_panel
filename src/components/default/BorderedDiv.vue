<template>
  <div class="bordered">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "bordered-div",
};
</script>

<style lang="scss" scoped>
.bordered {
  outline: 1px solid var(--border-color);
  border-radius: 5px;
}
</style>
