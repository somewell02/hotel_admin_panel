<template>
  <main class="entity_edit_wrap">
    <preloader-spinner ref="preloader" />
    <div v-if="room" class="entity_edit">
      <div class="entity_edit_navbar">
        <div class="entity_edit_header">
          <filled-button color="primary-light" @click="backToList">
            {{ $t("backToList") }}
          </filled-button>
        </div>
        <div class="entity_edit_main">
          <div class="entity_main_info">
            <div class="room_photo">
              <img
                v-if="room.images && room.images.length > 0"
                :src="room.images[0]"
                alt="room-photo"
              />
              <default-photo v-else />
            </div>
            <div class="entity_title">{{ room.name }}</div>
            <div class="entity_info_item">
              {{ $t("room.title") + " - " + roomId }}
            </div>
            <div class="entity_info_item">
              {{ $t("rating") + " - " }}
              <stars-rating :rating="room.rating" />
            </div>
          </div>
          <nav class="entity_edit_menu">
            <router-link-icon :to="{ name: 'roomInfo' }">
              <info-icon />
              {{ $t("info") }}
            </router-link-icon>
            <router-link-icon :to="{ name: 'roomVisits' }">
              <bookings-icon />
              {{ $t("user.edit.nav.visits") }}
            </router-link-icon>
            <router-link-icon
              v-if="$store.getters['user/includesCreate']"
              :to="{ name: 'bookingAdd', params: { roomId: roomId } }"
            >
              <bookings-icon />
              {{ $t("booking.edit.nav.goToAddBooking") }}
            </router-link-icon>
            <icon-button
              v-if="$store.getters['user/includesDelete']"
              @click="deleteRoom"
            >
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
import DefaultPhoto from "@/assets/img/DefaultPhoto";
import StarsRating from "@/components/other/StarsRating.vue";

import InfoIcon from "@/assets/img/icons/InfoIcon";
import DeleteIcon from "@/assets/img/icons/DeleteIcon.vue";
import BookingsIcon from "@/assets/img/icons/BookingsIcon";

import { getRoomById, deleteRoom } from "@/data/firebase/roomsApi";

export default {
  data() {
    return {
      roomId: this.$route.params.id,
      room: null,
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
    IconButton,
    DeleteIcon,
    BookingsIcon,
    ConfirmationPopup,
    DefaultPhoto,
    StarsRating,
  },

  methods: {
    initData() {
      getRoomById(this.roomId)
        .then((data) => {
          if (!data) {
            this.$router.push({
              name: "rooms",
              params: {
                messageType: "error",
                messageText: this.$t("room.alerts.notFound"),
              },
            });
          }
          this.room = data;
        })
        .finally(() => {
          if (this.room && this.$refs.preloader) {
            this.$refs.preloader.hide();
          }
        });
    },

    async deleteRoom() {
      const popupResult = await this.$refs.deleteConfirmation.open(
        this.$t("room.delete") + ": " + this.room.name + "?"
      );
      if (popupResult) {
        deleteRoom(this.roomId);
        this.$router.push({
          name: "rooms",
          params: {
            messageType: "success",
            messageText: this.$t("room.alerts.deleted"),
          },
        });
      }
    },

    backToList() {
      this.$router.push({ name: "rooms" });
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
          .room_photo {
            width: 100%;
            height: 120px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 5px;
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
            display: flex;
            align-items: center;
            font-size: 11px;
            font-weight: 500;
            color: var(--secondary-color);
            margin-top: 10px;
            .stars {
              margin-left: 5px;
            }
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
