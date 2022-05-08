<template>
  <div class="center_layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "center-layout",
};
</script>

<style lang="scss">
.center_layout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
