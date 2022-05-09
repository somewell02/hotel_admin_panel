<template>
  <div
    class="app"
    :class="{
      'dark-theme': this.$store.state.darkTheme,
    }"
  >
    <router-view />
  </div>
</template>

<style lang="scss">
$qwe: 600px;
</style>

<style src="@/assets/css/normilize.css"></style>
<style src="@/assets/css/theme.css"></style>
<style src="@/assets/css/index.scss" lang="scss"></style>
