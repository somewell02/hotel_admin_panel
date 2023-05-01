<template>
  <div class="chart_item column_13">
    <div class="chart_item_block border">
      <div class="chart_item_title">
        <bookings-icon /> {{ $t("dashboard.stat.bookings.all") }}
      </div>
      <div class="chart_content">{{ all }}</div>
    </div>
    <div class="chart_item_block border">
      <div class="chart_item_title">
        <rooms-icon /> {{ $t("dashboard.stat.bookings.booked") }}
      </div>
      <div class="chart_content">{{ booked }}</div>
    </div>
    <div class="chart_item_block border">
      <div class="chart_item_title">
        <rents-icon /> {{ $t("dashboard.stat.bookings.active") }}
      </div>
      <div class="chart_content">{{ active }}</div>
    </div>
  </div>
</template>

<script>
import BookingsIcon from "@/assets/img/icons/BookingsIcon.vue";
import RoomsIcon from "@/assets/img/icons/RoomsIcon.vue";
import RentsIcon from "@/assets/img/icons/RentsIcon.vue";
export default {
  components: {
    BookingsIcon,
    RoomsIcon,
    RentsIcon,
  },
  name: "bookings-chart",

  props: {
    bookings: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      all: 0,
      booked: 0,
      active: 0,
    };
  },

  async created() {
    this.all = this.bookings.length;
    this.booked = this.bookings.filter(
      (booking) => booking.status === "booked"
    ).length;
    this.active = this.bookings.filter(
      (booking) => booking.status === "active"
    ).length;
  },
};
</script>

<style lang="scss" scoped>
.chart_item {
  .chart_item_block {
    width: 100%;
    height: calc((100% - (20px * 2)) / 3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    .chart_item_title {
      font-size: 14px;
      display: flex;
      align-items: center;
      .icon {
        width: 25px;
        height: 25px;
        margin-right: 20px;
      }
    }
    .chart_content {
      font-weight: 500;
      color: var(--primary-color);
    }
  }
}
</style>

<style lang="scss">
.chart_item_title .icon.stroke * {
  stroke: var(--primary-color) !important;
}
.chart_item_title .icon.fill * {
  fill: var(--primary-color) !important;
}
</style>
