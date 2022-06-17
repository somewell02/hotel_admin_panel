<template>
  <div
    class="app preloader_wrap"
    :class="{
      'dark-theme': this.$store.state.darkTheme,
    }"
  >
    <router-view v-if="$store.state.user.user" />
    <preloader-spinner v-else ref="preloader" />
  </div>
</template>

<style lang="scss" scoped>
.app {
  position: relative;
  .preloader {
    top: calc(50vh - 30px);
  }
}
</style>
