<template>
  <div class="actions">
    <search-input v-model="search" />
    <filled-button @click="addBooking">{{ $t("add") }}</filled-button>
  </div>
  <div class="tabs_content_wrap">
    <preloader-spinner ref="preloader" />
    <div class="list_modifications">
      <bordered-filters :filters="filters" />
      <div class="sorts_wrap">
        <bordered-select
          v-model="sort"
          :options="sortInfo.options"
          :prefix="$t('sorting') + ':'"
          dropdownSide="right"
        />
      </div>
    </div>
    <spacing-bordered-table
      class="bookings_table"
      v-if="bookingsList"
      :titles="tableInfo.titles"
      :rows="modifiedBookingsList()"
      :actions="tableInfo.actions"
      @edit="(booking) => editBooking(booking.id)"
      @delete="(booking) => deleteBooking(booking)"
    />
    <div class="pagination_wrap">
      <div class="count_title">
        {{ dataCount }}
      </div>
      <filled-pagination
        :length="pagination.length"
        v-model="pagination.page"
      />
    </div>
  </div>
  <message-alert ref="alert"></message-alert>
  <confirmation-popup ref="deleteConfirmation" />
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";
import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import FilledPagination from "@/components/paginations/FilledPagination";
import BorderedFilters from "@/components/filters/BorderedFilters.vue";

import { tableInfo, sortInfo, filters, searchInfo } from "./bookingConstants";

import { getBookings, deleteBooking } from "@/data/firebase/bookingsApi";
import { getBookingStatuses } from "@/data/firebase/bookingStatusesApi";

import { msToDayMonthYear } from "@/services/methods/datetime";

export default {
  components: {
    SpacingBorderedTable,
    ConfirmationPopup,
    BorderedSelect,
    FilledPagination,
    BorderedFilters,
  },

  data() {
    return {
      bookingsList: null,
      statusesList: null,
      search: "",
      sort: "default",
      filters: filters,
      pagination: {
        page: 1,
        limit: 8,
        length: 0,
      },
      dataCount: "",
    };
  },

  async created() {
    await this.initData();
    this.initFilters();

    this.getRouterParams();
  },

  watch: {
    bookingsList(newValue, oldValue) {
      if (oldValue && oldValue.length == 0 && newValue.length > 0)
        this.$refs.preloader.hide();
    },
    filters: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
    sort: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
    search: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
  },

  computed: {
    sortInfo() {
      return sortInfo;
    },
    tableInfo() {
      return tableInfo;
    },
    searchInfo() {
      return searchInfo;
    },
  },

  methods: {
    async initData() {
      await getBookings().then((data) => {
        this.bookingsList = data;
      });
      await getBookingStatuses().then((statuses) => {
        this.statusesList = statuses;
      });
    },

    initFilters() {
      const filterStatuses = [];
      this.statusesList.forEach((status) => {
        filterStatuses.push({ id: status.id, title: status.title });
      });
      this.filters.find((filter) => filter.id == "statusId").options =
        filterStatuses;
    },

    modifiedBookingsList() {
      let bookings = this.bookingsList.map((booking) => {
        return {
          ...booking,
        };
      });

      if (bookings) {
        bookings.forEach((booking) => {
          booking.dates =
            msToDayMonthYear(booking.dateStart.seconds * 1000) +
            " — " +
            msToDayMonthYear(booking.dateEnd.seconds * 1000);

          const bookingStatus = this.statusesList.find(
            (status) => status.id == booking.status
          );
          if (bookingStatus) {
            booking.statusId = bookingStatus.id;
            booking.status = {
              title: bookingStatus.title,
              background: bookingStatus.color,
            };
          }
        });

        if (this.search) {
          const fields = this.searchInfo.fields;
          bookings = bookings.filter((booking) => {
            let t = false;
            fields.forEach((field) => {
              if (
                booking[field] &&
                booking[field]
                  .trim()
                  .toLowerCase()
                  .includes(this.search.trim().toLowerCase())
              ) {
                t = true;
                return;
              }
            });
            return t;
          });
        }

        if (this.sort !== "default") {
          const value = this.sort.split(":")[0];
          const direction = this.sort.split(":")[1];
          bookings.sort((o1, o2) => {
            if (o1[value] > o2[value]) return direction == "asc" ? 1 : -1;
            if (o1[value] < o2[value]) return direction == "asc" ? -1 : 1;
            return 0;
          });
        }

        this.filters.forEach((filter) => {
          if (filter.values.length > 0) {
            switch (filter.type) {
              case "checkbox":
                bookings = bookings.filter((booking) =>
                  filter.values.includes(booking[filter.id])
                );
                break;
            }
          }
        });

        const l = bookings.length;

        const p = this.pagination;
        this.pagination.length = Math.ceil(bookings.length / p.limit);
        bookings = bookings.filter(
          (booking) =>
            bookings.indexOf(booking) >= (p.page - 1) * p.limit &&
            bookings.indexOf(booking) < p.page * p.limit
        );

        const from = (p.page - 1) * p.limit + 1;
        const to = p.page * p.limit > l ? l : p.page * p.limit;
        this.dataCount = from + " - " + to + " " + this.$t("of") + " " + l;
      }

      return bookings;
    },

    addBooking() {
      this.$router.push({ name: "bookingAdd" });
    },

    editBooking(bookingId) {
      this.$router.push({ name: "bookingEdit", params: { id: bookingId } });
    },

    async deleteBooking(booking) {
      const popupResult = await this.$refs.deleteConfirmation.open(
        this.$t("booking.delete") + ": " + booking.name + "?"
      );
      if (popupResult) {
        const res = deleteBooking(booking.id);
        if (res) {
          this.$refs.alert.open("success", this.$t("booking.alerts.deleted"));
        }
      }
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
};
</script>

<style lang="scss" scoped>
.list_modifications {
  margin-bottom: 20px;
  @include flex-between;
}
.pagination_wrap {
  margin-top: 30px;
  @include flex-between;
  .count_title {
    color: var(--text-color);
    font-size: 14px;
  }
}
.tabs_content_wrap {
  padding-bottom: 40px;
  position: relative;
}
</style>
