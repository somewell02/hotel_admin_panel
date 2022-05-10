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
