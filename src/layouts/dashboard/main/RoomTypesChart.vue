<template>
  <div class="chart_item border column_13">
    <div class="chart_item_header">
      <div class="title">{{ $t("dashboard.stat.roomTypes.title") }}</div>
    </div>
    <div class="chart">
      <doughnut-chart :chartData="chartData" />
    </div>
  </div>
</template>

<script>
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import { getRoomTypes } from "@/data/firebase/roomTypesApi";

export default {
  name: "room-types-chart",
  components: { DoughnutChart },

  props: {
    bookings: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      roomTypesList: null,
      chartData: {
        labels: [],
        datasets: [],
      },
    };
  },

  async created() {
    await getRoomTypes().then((types) => {
      this.roomTypesList = types;
    });

    let types = [];
    this.bookings.forEach((booking) => {
      let existType = types.find((type) => type.id == booking.roomType);
      if (existType) {
        existType.count += 1;
      } else {
        const t = this.roomTypesList.find(
          (type) => type.id == booking.roomType
        );
        types.push({
          id: booking.roomType,
          count: 1,
          label: t.title,
          color: t.color,
        });
      }
    });

    let item = {
      backgroundColor: [],
      data: [],
    };
    types.forEach((type) => {
      this.chartData.labels.push(type.label);
      item.data.push(type.count);
      item.backgroundColor.push("#" + type.color);
    });
    this.chartData.datasets.push(item);
  },
};
</script>
