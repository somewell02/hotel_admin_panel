<template>
  <header class="dashboard_layout_header dashboard_main_header">
    <div class="title">
      <h1>{{ $route.meta.title }}</h1>
    </div>
    <div class="info_wrap">
      <language-switcher class="header_language_switcher" />
      <div class="profile">
        <div class="avatar" v-if="this.$store.state.user.user">
          <img
            v-if="this.$store.state.user.user.photoUrl"
            :src="this.$store.state.user.user.photoUrl"
            alt="avatar"
          />
          <default-avatar v-else />
        </div>
        <div class="profile_info">
          <p class="name">
            {{
              this.$store.state.user.user
                ? this.$store.state.user.user.name
                : ""
            }}
          </p>
          <p class="role">
            {{
              this.$store.state.user.user
                ? this.$store.state.user.user.role.title
                : ""
            }}
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LanguageSwitcher from "@/components/dropdowns/LanguageSwitcher.vue";
import DefaultAvatar from "@/assets/img/DefaultAvatar";

export default {
  components: {
    LanguageSwitcher,
    DefaultAvatar,
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
    }
    .profile {
      display: flex;
      align-items: center;
      margin-left: 20px;
      .avatar {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .profile_info {
        margin-left: 10px;
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
