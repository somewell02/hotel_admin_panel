<template>
  <div class="chart_item column_13">
    <div class="chart_item_header">
      <div class="title">Продажи</div>
    </div>
    <div class="chart">
      <doughnut-chart :chartData="chartData" />
    </div>
  </div>
</template>

<script>
import DoughnutChart from "@/components/charts/DoughnutChart.vue";

export default {
  components: { DoughnutChart },

  data() {
    return {
      chartData: {
        labels: ["Red", "Yellow", "Blue"],
        datasets: [
          {
            label: "Оборот",
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            data: [10, 20, 30],
          },
        ],
      },
    };
  },
};
</script>
