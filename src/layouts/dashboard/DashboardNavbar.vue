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
      <router-link-icon :to="{ name: 'bookings' }">
        <bookings-icon />
        {{ $t("booking.nav") }}
      </router-link-icon>
      <div class="hr"></div>
      <router-link-icon :to="{ name: 'faq' }">
        <faq-icon />
        {{ $t("faq.nav") }}
      </router-link-icon>
      <router-link-icon :to="{ name: 'chat' }">
        <chat-icon />
        {{ $t("chat.nav") }}
      </router-link-icon>
      <div class="hr"></div>
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

import MainLogo from "@/assets/img/MainLogo";
import LogoutIcon from "@/assets/img/icons/LogoutIcon";
import UsersIcon from "@/assets/img/icons/UsersIcon";
import RoomsIcon from "@/assets/img/icons/RoomsIcon";
import GraphIcon from "@/assets/img/icons/GraphIcon";
import BookingsIcon from "@/assets/img/icons/BookingsIcon";
import ChatIcon from "@/assets/img/icons/ChatIcon";
import FaqIcon from "@/assets/img/icons/FaqIcon";

import { logout } from "@/data/firebase/auth";

export default {
  components: {
    RouterLinkIcon,
    IconButton,
    MainLogo,
    LogoutIcon,
    UsersIcon,
    RoomsIcon,
    GraphIcon,
    BookingsIcon,
    ChatIcon,
    FaqIcon,
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
}
.main_menu {
  display: flex;
  flex-direction: column;
  .hr {
    width: 100%;
    height: 0.5px;
    background: var(--border-color);
    margin: 10px 0 20px 0;
  }
}
</style>
