<template>
  <router-link class="tabs_nav_item">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: "underlined-tab",
};
</script>

<style lang="scss">
.tabs_nav_item {
  cursor: pointer;
  padding: 10px 20px;
  height: 40px;
  font-size: 14px;
  text-decoration: none;
  color: var(--text-color);
  background: none;
  border: solid var(--border-color);
  border-width: 0 0 1px 0;
  margin: 0;
  border-radius: 5px 5px 0 0;
  min-width: 100px;
  text-align: center;
  &.router-link-exact-active {
    border-width: 1px 1px 0 1px;
    padding: 10px 19px;
  }
}
</style>
