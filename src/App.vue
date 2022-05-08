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

<style src="@/assets/css/normilize.css"></style>
<style src="@/assets/css/theme.css"></style>
<style src="@/assets/css/index.css"></style>
