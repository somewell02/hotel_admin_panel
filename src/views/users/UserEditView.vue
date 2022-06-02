<template>
  <main class="entity_edit_wrap">
    <preloader-spinner ref="preloader" />
    <div v-if="user" class="entity_edit">
      <div class="entity_edit_navbar">
        <div class="entity_edit_header">
          <filled-button color="primary-light" @click="backToList">
            {{ $t("backToList") }}
          </filled-button>
        </div>
        <div class="entity_edit_main">
          <div class="entity_main_info">
            <div class="user_photo">
              <img v-if="user.photoUrl" :src="user.photoUrl" alt="user-photo" />
              <default-avatar v-else />
            </div>
            <div class="entity_title">{{ user.name }}</div>
            <div class="entity_info_item">{{ userId }}</div>
          </div>
          <nav class="entity_edit_menu">
            <router-link-icon :to="{ name: 'userInfo' }">
              <info-icon />
              {{ $t("info") }}
            </router-link-icon>
            <router-link-icon :to="{ name: 'userVisits' }">
              <bookings-icon />
              {{ $t("user.edit.nav.visits") }}
            </router-link-icon>
            <router-link-icon
              :to="{ name: 'bookingAdd', params: { userId: userId } }"
            >
              <bookings-icon />
              {{ $t("booking.edit.nav.goToAddBooking") }}
            </router-link-icon>
            <router-link-icon
              :to="{ name: 'currentChat', params: { id: userId } }"
            >
              <chat-icon />
              {{ $t("user.edit.nav.goToChat") }}
            </router-link-icon>
            <icon-button @click="deleteUser">
              <delete-icon />
              {{ $t("delete") }}
            </icon-button>
          </nav>
        </div>
      </div>
      <div class="entity_edit_content">
        <router-view />
      </div>
      <confirmation-popup ref="deleteConfirmation" />
    </div>
    <message-alert ref="alert"></message-alert>
  </main>
</template>

<script>
import FilledButton from "@/components/buttons/FilledButton.vue";
import RouterLinkIcon from "@/components/buttons/RouterLinkIcon.vue";
import IconButton from "@/components/buttons/IconButton.vue";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";
import DefaultAvatar from "@/assets/img/DefaultAvatar";

import InfoIcon from "@/assets/img/icons/InfoIcon";
import BookingsIcon from "@/assets/img/icons/BookingsIcon";
import DeleteIcon from "@/assets/img/icons/DeleteIcon.vue";
import ChatIcon from "@/assets/img/icons/ChatIcon";

import { getUserById, deleteUser } from "@/data/firebase/usersApi";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      user: null,
    };
  },

  async created() {
    await this.initData();
    this.getRouterParams();
  },

  components: {
    FilledButton,
    RouterLinkIcon,
    InfoIcon,
    BookingsIcon,
    IconButton,
    DeleteIcon,
    ConfirmationPopup,
    DefaultAvatar,
    ChatIcon,
  },

  methods: {
    initData() {
      getUserById(this.userId)
        .then((data) => {
          if (!data) {
            this.$router.push({
              name: "users",
              params: {
                messageType: "error",
                messageText: this.$t("user.alerts.notFound"),
              },
            });
          }
          this.user = data;
        })
        .finally(() => {
          if (this.user) {
            this.$refs.preloader.hide();
          }
        });
    },

    async deleteUser() {
      const popupResult = await this.$refs.deleteConfirmation.open(
        this.$t("user.delete") + ": " + this.user.name + "?"
      );
      if (popupResult) {
        deleteUser(this.userId);
        this.$router.push({
          name: "users",
          params: {
            messageType: "success",
            messageText: this.$t("user.alerts.deleted"),
          },
        });
      }
    },

    backToList() {
      this.$router.push({ name: "users" });
    },

    getRouterParams() {
      if (this.$route.params.messageText) {
        this.$refs.alert.open(
          this.$route.params.messageType,
          this.$route.params.messageText
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.entity_edit_wrap {
  position: relative;
  .entity_edit {
    display: flex;
    .entity_edit_navbar {
      width: 100%;
      max-width: 250px;
      .entity_edit_main {
        margin-top: 30px;
        border-right: 1px solid var(--border-color);
        padding: 20px 40px 0 0;
        height: calc(100vh - 190px);
        overflow-y: auto;
        @include custom-scroll;
        .entity_main_info {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          .user_photo {
            width: 100px;
            height: 100px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          .entity_title {
            font-size: 16px;
            font-weight: 500;
            color: var(--text-color);
            margin-top: 15px;
          }
          .entity_info_item {
            font-size: 11px;
            font-weight: 500;
            color: var(--secondary-color);
            margin-top: 10px;
          }
        }
        .entity_edit_menu {
          margin-top: 30px;
        }
      }
    }
    .entity_edit_content {
      flex-grow: 3;
      padding-left: 40px;
    }
  }
}
</style>
