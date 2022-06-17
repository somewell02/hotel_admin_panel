<template>
  <Bar
    :chart-data="chartData"
    :chart-options="chartOptions"
    :style="{ height: '100%' }"
  />
</template>

<script>
import { Bar } from "vue-chartjs";
import Chart from "chart.js/auto";
import {
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

Chart.register(BarController, BarElement, PointElement, LinearScale, Title);

export default {
  components: { Bar },

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
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            boxPadding: 3,
          },
        },
      },
    };
  },
};
</script>
