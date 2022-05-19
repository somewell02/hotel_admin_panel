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
      <router-link-icon :to="{ name: 'rooms' }">
        <rooms-icon />
        {{ $t("room.nav") }}
      </router-link-icon>
      <router-link-icon :to="{ name: 'chat' }">
        <chat-icon />
        {{ $t("chat.nav") }}
      </router-link-icon>
      <icon-button @click="logout">
        <logout-icon />
        {{ $t("auth.logout") }}
      </icon-button>
    </nav>
  </div>
</template>

<script>
import RouterLinkIcon from "@/components/buttons/RouterLinkIcon";
import IconButton from "@/components/buttons/IconButton";
import LogoutIcon from "@/assets/img/icons/LogoutIcon";

import { logout } from "@/data/firebase/auth";

export default {
  components: {
    RouterLinkIcon,
    IconButton,
    LogoutIcon,
  },

  methods: {
    logout() {
      logout();
    },
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
