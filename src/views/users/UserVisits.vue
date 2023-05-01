<template>
  <div class="user_visits_wrap">
    <preloader-spinner ref="preloader" />
    <spacing-bordered-table
      class="bookings_table"
      v-if="bookingsList && modifiedBookingsList().length > 0"
      :titles="shortTableInfo.titles"
      :rows="modifiedBookingsList()"
      :actions="shortTableInfo.actions"
      @view="(booking) => viewBooking(booking.id)"
    />
    <div v-else>{{ $t("user.edit.noVisits") }}</div>
  </div>
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";

import { getBookingsByUser } from "@/data/firebase/bookingsApi";
import { getBookingStatuses } from "@/data/firebase/bookingStatusesApi";
import { getRoomTypes } from "@/data/firebase/roomTypesApi";

import { shortTableInfo } from "@/views/bookings/bookingConstants";

import { msToDayMonthYear } from "@/services/methods/datetime";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      bookingsList: null,
      statusesList: null,
      roomTypesList: null,
    };
  },

  components: {
    SpacingBorderedTable,
  },

  computed: {
    shortTableInfo() {
      return shortTableInfo;
    },
  },

  async created() {
    await this.initData();
  },

  watch: {
    bookingsList(newValue) {
      if (newValue) this.$refs.preloader.hide();
    },
  },

  methods: {
    async initData() {
      await getBookingsByUser(this.userId).then((data) => {
        this.bookingsList = data;
      });
      await getBookingStatuses().then((statuses) => {
        this.statusesList = statuses;
      });
      await getRoomTypes().then((types) => {
        this.roomTypesList = types;
      });
    },

    viewBooking(id) {
      this.$router.push({ name: "bookingEdit", params: { id: id } });
    },

    modifiedBookingsList() {
      let bookings = this.bookingsList.map((booking) => {
        return {
          ...booking,
        };
      });

      if (bookings && this.statusesList && this.roomTypesList) {
        bookings.forEach((booking) => {
          booking.dates =
            msToDayMonthYear(booking.dateStart.seconds * 1000) +
            " — " +
            msToDayMonthYear(booking.dateEnd.seconds * 1000);

          const bookingStatus = this.statusesList.find(
            (status) => status.id === booking.status
          );
          if (bookingStatus) {
            booking.statusId = bookingStatus.id;
            booking.status = {
              title: bookingStatus.title,
              background: bookingStatus.color,
            };
          }

          const roomType = this.roomTypesList.find(
            (type) => type.id === booking.roomType
          );
          if (roomType) {
            booking.roomTypeId = roomType.id;
            booking.roomType = {
              title: roomType.title,
              background: roomType.color,
            };
          }
        });
      }

      return bookings;
    },
  },
};
</script>

<style lang="scss" scoped>
.user_visits_wrap {
  position: relative;
  padding-top: 90px;
  .bookings_table {
    padding-bottom: 20px;
    height: calc(100vh - 210px);
    overflow-y: auto;
    @include custom-scroll;
  }
}
</style>
