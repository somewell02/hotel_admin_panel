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
      v-if="bookingsList && modifiedBookingsList().length > 0"
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
import { getRoomTypes } from "@/data/firebase/roomTypesApi";

import { msToDayMonthYear } from "@/services/methods/datetime";

import {
  search,
  sort,
  filter,
  paginate,
  recordsCount,
} from "@/services/methods/list.js";

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
      roomTypesList: null,
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
      await getRoomTypes().then((types) => {
        this.roomTypesList = types;
      });
    },

    initFilters() {
      const filterStatuses = [];
      this.statusesList.forEach((status) => {
        filterStatuses.push({ id: status.id, title: status.title });
      });
      this.filters.find((filter) => filter.id == "statusId").options =
        filterStatuses;

      const filterRoomTypes = [];
      this.roomTypesList.forEach((type) => {
        filterRoomTypes.push({ id: type.id, title: type.title });
      });
      this.filters.find((filter) => filter.id == "roomTypeId").options =
        filterRoomTypes;
    },

    modifiedBookingsList() {
      let bookings = this.bookingsList.map((booking) => {
        return {
          ...booking,
        };
      });

      if (bookings && this.statusesList && this.roomTypesList) {
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

          const roomType = this.roomTypesList.find(
            (type) => type.id == booking.roomType
          );
          if (roomType) {
            booking.roomTypeId = roomType.id;
            booking.roomType = {
              title: roomType.title,
              background: roomType.color,
            };
          }
        });

        if (this.search)
          bookings = search(bookings, this.searchInfo, this.search);

        if (this.sort !== "default") bookings = sort(bookings, this.sort);

        bookings = filter(bookings, this.filters);

        const l = bookings.length;

        const p = this.pagination;
        this.pagination.length = Math.ceil(bookings.length / p.limit);
        bookings = paginate(bookings, p);

        this.dataCount = recordsCount(p, l);
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
