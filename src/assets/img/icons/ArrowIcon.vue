<template>
  <div class="icon stroke">
    <svg viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 3.37939L8 10.6208L1 3.37939"
        stroke="black"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "arrow-icon",
};
</script>

<style lang="scss" scoped>
.icon {
  @include flex-center;
  width: 16px;
  height: 16px;
}
</style>
