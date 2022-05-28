<template>
  <Line
    :chart-data="chartData"
    :chart-options="chartOptions"
    :style="{ height: '100%' }"
  />
</template>

<script>
import { Line } from "vue-chartjs";
import Chart from "chart.js/auto";
import {
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

export default {
  components: { Line },

  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            boxPadding: 3,
          },
        },
        elements: {
          point: {
            radius: 3,
            hitRadius: 5,
          },
          line: {
            tension: 0.3,
            borderColor: "#506DAA",
          },
        },
      },
    };
  },
};
</script>
