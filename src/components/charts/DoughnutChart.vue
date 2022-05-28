<template>
  <Doughnut
    :chart-data="chartData"
    :chart-options="chartOptions"
    :style="{ height: '100%' }"
  />
</template>

<script>
import { Doughnut } from "vue-chartjs";
import Chart from "chart.js/auto";
import { DoughnutController, PointElement, LinearScale, Title } from "chart.js";

Chart.register(DoughnutController, PointElement, LinearScale, Title);

export default {
  components: { Doughnut },

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
            position: "right",
            onClick: null,
            labels: {
              boxWidth: 10,
              usePointStyle: true,
              padding: 15,
            },
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
