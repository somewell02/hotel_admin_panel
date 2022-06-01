<template>
  <main class="entity_edit_wrap">
    <preloader-spinner ref="preloader" />
    <div v-if="booking" class="entity_edit">
      <div class="entity_edit_navbar">
        <div class="entity_edit_header">
          <filled-button color="primary-light" @click="backToList">
            {{ $t("backToList") }}
          </filled-button>
        </div>
        <div class="entity_edit_main">
          <div class="entity_main_info">
            <div class="entity_title">{{ booking.roomName }}</div>
            <div class="entity_info_item">
              {{ bookingId }}
            </div>
          </div>
          <nav class="entity_edit_menu">
            <router-link-icon :to="{ name: 'bookingInfo' }">
              <info-icon />
              {{ $t("info") }}
            </router-link-icon>
            <router-link-icon :to="{ name: 'bookingServices' }">
              <services-icon />
              {{ $t("booking.edit.nav.services") }}
            </router-link-icon>
            <icon-button @click="deleteBooking">
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

import InfoIcon from "@/assets/img/icons/InfoIcon";
import DeleteIcon from "@/assets/img/icons/DeleteIcon.vue";
import ServicesIcon from "@/assets/img/icons/ServicesIcon.vue";

import { getBookingById, deleteBooking } from "@/data/firebase/bookingsApi";

export default {
  data() {
    return {
      bookingId: this.$route.params.id,
      booking: null,
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
    ServicesIcon,
    ConfirmationPopup,
  },

  methods: {
    initData() {
      getBookingById(this.bookingId)
        .then((data) => {
          if (!data) {
            this.$router.push({
              name: "bookings",
              params: {
                messageType: "error",
                messageText: this.$t("booking.alerts.notFound"),
              },
            });
          }
          this.booking = data;
        })
        .finally(() => {
          if (this.booking && this.$refs.preloader) {
            this.$refs.preloader.hide();
          }
        });
    },

    async deleteBooking() {
      const popupResult = await this.$refs.deleteConfirmation.open(
        this.$t("booking.delete") + "?"
      );
      if (popupResult) {
        deleteBooking(this.bookingId);
        this.$router.push({
          name: "bookings",
          params: {
            messageType: "success",
            messageText: this.$t("booking.alerts.deleted"),
          },
        });
      }
    },

    backToList() {
      this.$router.push({ name: "bookings" });
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
          .booking_photo {
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
