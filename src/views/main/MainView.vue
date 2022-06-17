<template>
  <main class="main_wrap">
    <preloader-spinner ref="preloader" />
    <div class="charts_wrap">
      <sales-chart v-if="bookingsList" :bookings="bookingsList" />
      <room-types-chart v-if="bookingsList" :bookings="bookingsList" />
      <bookings-chart v-if="bookingsList" :bookings="bookingsList" />
      <services-chart v-if="bookingsList" :bookings="bookingsList" />
    </div>
  </main>
</template>

<script>
import SalesChart from "@/layouts/dashboard/main/SalesChart";
import RoomTypesChart from "@/layouts/dashboard/main/RoomTypesChart";
import ServicesChart from "@/layouts/dashboard/main/ServicesChart";
import BookingsChart from "@/layouts/dashboard/main/BookingsChart";

import { getBookings } from "@/data/firebase/bookingsApi";

export default {
  components: {
    SalesChart,
    RoomTypesChart,
    ServicesChart,
    BookingsChart,
  },

  data() {
    return {
      bookingsList: null,
    };
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
      await getBookings().then((data) => {
        this.bookingsList = data;
      });
    },
  },
};
</script>

<style lang="scss">
.main_wrap {
  position: relative;
  .charts_wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .chart_item {
      flex-grow: 0;
      flex-shrink: 0;
      margin-bottom: 30px;
      height: 280px;
      display: flex;
      flex-direction: column;
      &.border,
      .border {
        border: 1px solid var(--border-color);
        border-radius: 5px;
        padding: 20px 30px;
      }
      &.column_1 {
        width: 100%;
      }
      &.column_13 {
        width: calc((100% - 60px) / 3);
      }
      &.column_12 {
        width: calc((100% - 30px) / 2);
      }
      &.column_23 {
        width: calc((100% - 15px) / 3 * 2);
      }
      .chart_item_header {
        display: flex;
        align-items: center;
        height: 30px;
        margin-bottom: 15px;
        .title {
          font-size: 18px;
        }
      }
      .chart {
        height: calc(100% - 40px);
      }
    }
  }
}
</style>
