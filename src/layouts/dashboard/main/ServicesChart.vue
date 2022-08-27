<template>
  <div class="chart_item border column_23">
    <div class="chart_item_header">
      <div class="title">{{ $t("dashboard.stat.services.title") }}</div>
    </div>
    <div class="chart">
      <bar-chart :chartData="chartData" />
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/charts/BarChart.vue";

import { getRentItems } from "@/data/firebase/rentItemsApi";
import { getAllRentCategories } from "@/data/firebase/rentCategoriesApi";
//import { getBookingRents } from "@/data/firebase/bookingRentsApi";

export default {
  name: "services-chart",
  components: { BarChart },

  props: {
    bookings: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      rentsList: null,
      categoriesList: null,
      templist: null,
      chartData: {
        labels: ["Самокат", "Автомобили", "Проживание", "Скутеры"],
        datasets: [
          {
            backgroundColor: ["#FFC961", "#E47B00", "#506DAA", "#FF2CD1"],
            data: [2, 7, 4, 3],
          },
        ],
      },
    };
  },

  async created() {
    await getRentItems().then((data) => {
      this.rentsList = data;
    });
    await getAllRentCategories().then((data) => {
      this.categoriesList = data;
    });

    // let chart = {
    //   backgroundColor: [],
    //   data: [2, 5, 3, 3, 1, 1, 1],
    //   id: [],
    // };

    // this.bookings.forEach((booking) => {
    //   getBookingRents(booking.id).then((rents) => {
    //     rents.forEach((rent) => {
    //       const item = this.rentsList.find(
    //         (rentItem) => rentItem.id == rent.rentItemId
    //       );
    //       let existCategory = chart.id.indexOf(item.category);
    //       if (existCategory != -1) {
    //         chart.data[existCategory] += 1;
    //       } else {
    //         const category = this.categoriesList.find(
    //           (cat) => cat.id == item.category
    //         );
    //         this.chartData.labels.push(category.title);

    //         chart.id.push(item.category);
    //         chart.backgroundColor.push("#" + category.color);
    //       }
    //     });
    //   });
    // });
    // this.chartData.datasets.push({
    //   backgroundColor: chart.backgroundColor,
    //   data: chart.data,
    // });
  },
};
</script>
