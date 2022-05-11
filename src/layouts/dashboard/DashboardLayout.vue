<template>
  <div class="wrapper">
    <dashboard-navbar class="dashboard_navbar" />
    <div class="dashboard_wrapper">
      <dashboard-header class="dashboard_layout_header" />
      <router-view />
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import DashboardHeader from "./DashboardHeader.vue";
export default {
  components: {
    DashboardNavbar,
    DashboardHeader,
  },
};
</script>

<style lang="scss">
.dashboard_layout_header {
  height: 84px;
}
</style>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  min-height: 100vh;
  .dashboard_navbar,
  .dashboard_wrapper {
    padding: 60px 40px 0 40px;
  }
  .dashboard_navbar {
    width: 100%;
    max-width: 280px;
    border: solid var(--border-color);
    border-width: 0 1px 0 0;
  }
  .dashboard_wrapper {
    flex-grow: 3;
  }
}
</style>
