<template>
  <div class="icon stroke">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L13 13M13 1L1 13L13 1Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "close-icon",
};
</script>

<style lang="scss" scoped>
.icon {
  @include flex-center;
  width: 14px;
  height: 14px;
  &.stroke * {
    stroke: var(--primary-color);
  }
}
</style>
