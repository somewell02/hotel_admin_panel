<template>
  <div class="booking_services_wrap">
    <preloader-spinner ref="preloader" />
    <spacing-bordered-table
      class="booking_rents_table"
      v-if="rentsList && modifiedRentsList.length > 0"
      :titles="tableInfo.titles"
      :rows="modifiedRentsList"
      :actions="tableInfo.actions"
      @edit="(rent) => editRent(rent.id)"
      @delete="(rent) => deleteRent(rent)"
    />
    <div v-else class="no_records">{{ $t("noRecords") }}</div>
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";

import { getBookingRents } from "@/data/firebase/bookingRentsApi";
import { getRentItems } from "@/data/firebase/rentItemsApi";
import { getAllRentCategories } from "@/data/firebase/rentCategoriesApi";

import { tableInfo } from "@/views/rents/rentConstants";

import { msToDayMonthYear } from "@/services/methods/datetime";
import { sliceWithEllipsis } from "@/services/methods/string";

export default {
  data() {
    return {
      bookingId: this.$route.params.id,
      rentsList: null,
      rentItemsList: null,
      rentCategoriesList: null,
    };
  },

  components: {
    SpacingBorderedTable,
  },

  computed: {
    tableInfo() {
      return tableInfo;
    },

    modifiedRentsList() {
      if (this.rentsList) {
        let rents = this.rentsList.map((rent) => {
          return {
            ...rent,
          };
        });

        if (rents && rents.length > 0 && this.rentCategoriesList) {
          rents.forEach((rent) => {
            rent.dates =
              msToDayMonthYear(rent.dateStart.seconds * 1000) +
              " — " +
              msToDayMonthYear(rent.dateEnd.seconds * 1000);

            rent.rentItemName = sliceWithEllipsis(rent.rentItemName, 20);

            const rentItem = this.rentItemsList.find(
              (item) => item.id == rent.rentItemId
            );
            if (rentItem) {
              const rentCatgory = this.rentCategoriesList.find(
                (category) => category.id == rentItem.category
              );
              if (rentCatgory) {
                rent.itemCategory = {
                  title: sliceWithEllipsis(rentCatgory.title, 12),
                  background: rentCatgory.color,
                };
              }
            }
          });
        }

        return rents;
      } else return null;
    },
  },

  async created() {
    await this.initData();
    this.getRouterParams();
  },

  methods: {
    initData() {
      getBookingRents(this.bookingId).then((data) => {
        this.rentsList = data;
      });
      getRentItems().then((data) => {
        this.rentItemsList = data;
      });
      getAllRentCategories().then((data) => {
        this.rentCategoriesList = data;
      });
    },

    getRouterParams() {
      if (this.$route.params.messageText) {
        this.$refs.alert.open(
          this.$route.params.messageType,
          this.$route.params.messageText
        );
      }
    },
  },

  watch: {
    rentsList(newValue) {
      if (newValue) this.$refs.preloader.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.booking_services_wrap {
  position: relative;
  padding-top: 90px;
  .services_table {
    padding-bottom: 20px;
    height: calc(100vh - 210px);
    @include custom-scroll;
  }
  .no_records {
    color: var(--text-color);
    font-size: 14px;
  }
}
</style>
