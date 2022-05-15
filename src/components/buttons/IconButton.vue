<template>
  <button class="link_item_icon">
    <slot />
  </button>
</template>

<script>
export default {
  name: "icon-button",
};
</script>

<style lang="scss">
.link_item_icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  color: var(--secondary-color);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 5px;
  background: none;
  border: 0;
  &:not(:last-child) {
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
}
</style>
