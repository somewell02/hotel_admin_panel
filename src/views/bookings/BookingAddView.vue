<template>
  <main class="booking_add_wrap">
    <header class="booking_add_header">
      <div class="left_actions">
        <filled-button
          color="primary-light"
          @click="$router.push({ name: 'bookings' })"
        >
          {{ $t("backToList") }}
        </filled-button>
      </div>
      <div class="right_actions">
        <filled-button @click="addBooking"> {{ $t("add") }} </filled-button>
      </div>
    </header>
    <div class="booking_add_content">
      <booking-form ref="bookingAddForm" v-model="booking" :isAdd="true" />
    </div>
    <message-alert ref="alert"></message-alert>
  </main>
</template>

<script>
import BookingForm from "@/layouts/dashboard/bookings/BookingForm";
import { addBooking } from "@/data/firebase/bookingsApi";

export default {
  data() {
    return {
      booking: {
        dateEnd: Date.now(),
        dateStart: Date.now(),
        roomId: "",
        roomName: "",
        roomType: "",
        status: "",
        totalPrice: 0,
        uid: "",
      },
    };
  },

  components: {
    BookingForm,
  },

  methods: {
    addBooking() {
      if (this.$refs.bookingAddForm.validate()) {
        addBooking(this.booking).then((booking) => {
          if (booking) {
            this.$router.push({
              name: "bookingEdit",
              params: {
                id: booking.id,
                messageType: "success",
                messageText: this.$t("booking.alerts.added"),
              },
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.booking_add_wrap {
  .booking_add_header {
    @include flex-between;
  }
  .booking_add_content {
    margin-top: 50px;
  }
}
</style>
