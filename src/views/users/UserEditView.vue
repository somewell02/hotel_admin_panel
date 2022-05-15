<template>
  <main class="user_edit_wrap">
    <preloader-spinner v-if="isLoading" ref="preloader" />
    <div v-else class="user_edit">
      <div class="user_edit_navbar">
        <div class="user_edit_header">
          <filled-button
            color="primary-light"
            @click="$router.push({ name: 'users' })"
          >
            {{ $t("backToList") }}
          </filled-button>
        </div>
        <div class="user_edit_main">
          <div class="user_main_info">
            <img
              src="@/assets/img/avatar.svg"
              class="user_photo"
              alt="user-photo"
            />
            <div class="user_name">{{ user.name }}</div>
            <div class="user_id">{{ userId }}</div>
          </div>
          <nav class="user_edit_menu">
            <router-link-icon :to="{ name: 'userInfo' }">
              <info-icon />
              {{ $t("user.edit.nav.info") }}
            </router-link-icon>
            <router-link-icon :to="{ name: 'userVisits' }">
              <bookings-icon />
              {{ $t("user.edit.nav.visits") }}
            </router-link-icon>
            <icon-button @click="deleteUser">
              <delete-icon />
              {{ $t("delete") }}
            </icon-button>
          </nav>
        </div>
      </div>
      <div class="user_edit_content">
        <router-view />
      </div>
      <confirmation-popup
        ref="deleteConfirmation"
        :popupSubtitle="'Удалить пользователя: ' + user.name + '?'"
      />
    </div>
  </main>
</template>

<script>
import FilledButton from "@/components/buttons/FilledButton.vue";
import RouterLinkIcon from "@/components/buttons/RouterLinkIcon.vue";
import IconButton from "@/components/buttons/IconButton.vue";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";

import InfoIcon from "@/assets/img/icons/InfoIcon";
import BookingsIcon from "@/assets/img/icons/BookingsIcon";
import DeleteIcon from "@/assets/img/icons/DeleteIcon.vue";

import { getUserById, deleteUser } from "@/data/firebase/users-api";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      user: null,
      isLoading: true,
    };
  },

  created() {
    this.initData();
  },

  components: {
    FilledButton,
    RouterLinkIcon,
    InfoIcon,
    BookingsIcon,
    IconButton,
    DeleteIcon,
    ConfirmationPopup,
  },

  methods: {
    initData() {
      getUserById(this.userId)
        .then((data) => {
          this.user = data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async deleteUser() {
      const popupResult = await this.$refs.deleteConfirmation.open();
      if (popupResult) {
        deleteUser(this.userId);
        this.$router.push({ name: "users" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user_edit {
  display: flex;
  .user_edit_navbar {
    width: 100%;
    max-width: 250px;
    .user_edit_main {
      margin-top: 30px;
      border-right: 1px solid var(--border-color);
      padding: 20px 40px 0 0;
      height: calc(100vh - 190px);
      overflow-y: auto;
      @include custom-scroll;
      .user_main_info {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        .user_photo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }
        .user_name {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-color);
          margin-top: 15px;
        }
        .user_id {
          font-size: 12px;
          font-weight: 500;
          color: var(--secondary-color);
          margin-top: 10px;
        }
      }
      .user_edit_menu {
        margin-top: 30px;
      }
    }
  }
  .user_edit_content {
    flex-grow: 3;
    padding-left: 40px;
  }
}
</style>
