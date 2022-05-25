<template>
  <router-link class="link_item_icon">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: "router-link-icon",
};
</script>

<style lang="scss">
.link_item_icon {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  color: var(--secondary-color);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 5px;
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
  .icon {
    margin-right: 20px;
    &.stroke * {
      stroke: var(--secondary-color);
    }
    &.fill * {
      fill: var(--secondary-color);
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
  &.router-link-exact-active {
    background: var(--primary-light-color);
    color: var(--primary-color);
    .icon.stroke * {
      stroke: var(--primary-color);
    }
    .icon.fill * {
      fill: var(--primary-color);
    }
  }
}
</style>
