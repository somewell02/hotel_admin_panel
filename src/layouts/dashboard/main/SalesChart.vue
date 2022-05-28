<template>
  <div class="chart_item column_23">
    <div class="chart_item_header">
      <div class="title">Продажи</div>
    </div>
    <div class="chart">
      <line-chart :chartData="chartData" />
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/charts/LineChart.vue";
import {
  msToDayMonth,
  msToDay,
  msToDayMonthYear,
} from "@/services/methods/datetime";

export default {
  components: { LineChart },

  props: {
    bookings: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Оборот",
            backgroundColor: "#506DAA",
            data: [],
          },
        ],
      },
    };
  },

  created() {
    for (let d = Date.now(); ; d -= 86400000) {
      let total = 0;
      this.bookings
        .filter(
          (booking) =>
            msToDayMonthYear(booking.dateEnd.seconds * 1000) ==
            msToDayMonthYear(d)
        )
        .forEach((b) => {
          total += b.totalPrice;
        });

      this.chartData.labels.unshift(msToDayMonth(d));
      this.chartData.datasets[0].data.unshift(total);
      if (d < Date.now() - 86400000 && msToDay(Date.now()) === msToDay(d)) {
        break;
      }
    }
  },
};
</script>
