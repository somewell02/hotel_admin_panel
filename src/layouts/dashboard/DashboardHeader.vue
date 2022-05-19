<template>
  <header class="dashboard_layout_header dashboard_main_header">
    <div class="title">
      <h1>{{ $route.meta.title }}</h1>
    </div>
    <div class="info_wrap">
      <language-switcher class="header_language_switcher" />
      <div class="profile">
        <img
          src="@/assets/img/avatar.svg"
          alt="avatar"
          class="avatar"
          @click="logout"
        />
        <div class="profile_info">
          <p class="name">Самвел</p>
          <p class="role">Администратор</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LanguageSwitcher from "@/components/dropdowns/LanguageSwitcher.vue";
import { logout } from "@/data/firebase/auth";

export default {
  components: {
    LanguageSwitcher,
  },

  methods: {
    logout() {
      logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard_main_header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .info_wrap {
    display: flex;
    .header_language_switcher {
      display: flex;
      margin-right: 20px;
    }
    .profile {
      display: flex;
      align-items: center;
      img {
        width: 40px;
      }
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
}
</style>
