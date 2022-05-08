<template>
  <div class="dashboard_navbar">
    <header class="dashboard_layout_header">
      <main-logo />
    </header>
    <nav class="main_menu">
      <router-link-icon to="/dashboard">
        <graph-icon /> Главная
      </router-link-icon>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dashboard_layout_header {
  padding: 0 20px;
  .main_menu {
    display: flex;
    flex-direction: column;
  }
}
</style>
