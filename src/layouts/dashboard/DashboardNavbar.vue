<template>
  <div class="dashboard_navbar">
    <header class="dashboard_layout_header dashboard_navbar_header">
      <main-logo />
    </header>
    <nav class="main_menu">
      <router-link-icon
        :to="{ name: 'main' }"
        icon="graph-icon"
        name="Главная"
      />
      <router-link-icon
        :to="{ name: 'users' }"
        icon="users-icon"
        name="Пользователи"
      />
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dashboard_navbar_header {
  padding: 0 20px;
  .main_menu {
    display: flex;
    flex-direction: column;
  }
}
</style>
