<template>
  <header class="dashboard_layout_header dashboard_main_header">
    <div class="title">
      <h1>{{ $route.meta.title }}</h1>
    </div>
    <div class="info">
      <div class="profile">
        <img src="@/assets/img/avatar.svg" alt="avatar" class="avatar" />
        <div class="profile_info">
          <p class="name">Самвел</p>
          <p class="role">Администратор</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dashboard_main_header {
  display: flex;
  justify-content: space-between;
  .profile {
    display: flex;
    align-items: center;
    .profile_info {
      margin: 0 30px 0 10px;
      p {
        font-size: 14px;
        margin: 0;
        &:not(:last-child) {
          margin-bottom: 2px;
        }
        &.name {
          font-weight: 500;
        }
        &.role {
          font-weight: 400;
          color: #aeaeae;
        }
      }
    }
  }
}
</style>
