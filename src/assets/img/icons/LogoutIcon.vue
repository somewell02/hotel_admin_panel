<template>
  <div class="icon stroke">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <polyline
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
        points="174.011 86 216 128 174.011 170"
      />
      <line
        x1="104"
        x2="215.971"
        y1="128"
        y2="128"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      />
      <path
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
        d="M104,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h56"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "logout-icon",
};
</script>

<style lang="scss" scoped>
.icon {
  @include flex-center;
  width: 20px;
  height: 20px;
}
.stroke svg * {
  stroke: var(--secondary-color);
}
</style>
