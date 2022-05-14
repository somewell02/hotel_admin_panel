<template>
  <div class="dashboard_navbar">
    <header class="dashboard_layout_header dashboard_navbar_header">
      <main-logo />
    </header>
    <nav class="main_menu">
      <router-link-icon :to="{ name: 'main' }">
        <graph-icon />
        {{ $t("dashboard.nav") }}
      </router-link-icon>
      <router-link-icon :to="{ name: 'users' }">
        <users-icon />
        {{ $t("user.nav") }}
      </router-link-icon>
    </nav>
  </div>
</template>

<script>
import RouterLinkIcon from "@/components/default/buttons/RouterLinkIcon";

export default {
  components: {
    RouterLinkIcon,
  },
};
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
