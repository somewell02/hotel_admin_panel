<template>
  <div class="app_wrapper preloader_wrap">
    <div v-if="$store.state.user.user" class="app_content">
      <dashboard-navbar class="dashboard_navbar" />
      <div class="dashboard_wrapper">
        <dashboard-header class="dashboard_layout_header" />
        <router-view />
      </div>
    </div>
    <preloader-spinner v-else ref="preloader" />
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
  height: 80px;
}
</style>

<style lang="scss" scoped>
.app_wrapper {
  position: relative;
  .preloader {
    top: calc(50vh - 30px);
  }
}
.app_content {
  display: flex;
  width: 100%;
  min-height: 100vh;
  .dashboard_navbar,
  .dashboard_wrapper {
    padding: 40px 40px 0 40px;
    height: 100vh;
    overflow-y: auto;
  }
  .dashboard_navbar {
    width: 100%;
    max-width: 280px;
    border: solid var(--border-color);
    border-width: 0 1px 0 0;
    @include custom-scroll();
  }
  .dashboard_wrapper {
    flex-grow: 3;
    @include custom-scroll(#ececec, #8c8c8c);
  }
}
</style>
