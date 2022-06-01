<template>
  <div class="booking_info_wrap">
    <div class="booking_edit_header">
      <filled-button @click="editBooking"> {{ $t("save") }} </filled-button>
    </div>
    <booking-form
      class="booking_edit_main"
      v-if="booking"
      v-model="booking"
      ref="bookingEditForm"
    />
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import { getBookingById, updateBooking } from "@/data/firebase/bookingsApi";
import { getUserById } from "@/data/firebase/usersApi";
import { getUserRoleById } from "@/data/firebase/userRolesApi";
import { getRoomById } from "@/data/firebase/roomsApi";
import { getRoomTypeById } from "@/data/firebase/roomTypesApi";

import BookingForm from "@/layouts/dashboard/bookings/BookingForm";

export default {
  data() {
    return {
      bookingId: this.$route.params.id,
      booking: null,
    };
  },

  components: {
    BookingForm,
  },

  async created() {
    await this.initData();
  },

  methods: {
    async initData() {
      await getBookingById(this.bookingId).then((data) => {
        data.dateStart = data.dateStart.seconds * 1000;
        data.dateEnd = data.dateEnd.seconds * 1000;
        getUserById(data.uid).then((user) => {
          getUserRoleById(user.role).then((role) => {
            user.roleId = role.id;
            user.role = {
              title: role.title,
              background: role.color,
            };
            data.user = [user];

            getRoomById(data.roomId).then((room) => {
              getRoomTypeById(room.type).then((type) => {
                room.type = {
                  title: type.title,
                  background: type.color,
                };
                room.id = data.roomId;
                data.room = [room];
                this.booking = data;
              });
            });
          });
        });
      });
    },

    editBooking() {
      if (this.$refs.bookingEditForm.validate()) {
        const res = updateBooking(this.bookingId, this.booking);
        if (res) {
          this.$refs.alert.open("success", this.$t("booking.alerts.updated"));
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.booking_info_wrap {
  .booking_edit_header {
    display: flex;
    justify-content: flex-end;
  }
  .booking_edit_main {
    margin-top: 30px;
    padding: 20px 0;
    height: calc(100vh - 190px);
    overflow-y: auto;
    @include custom-scroll;
  }
}
</style>
