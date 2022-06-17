<template>
  <div class="actions">
    <search-input v-model="search" />
    <filled-button @click="addEvent">{{ $t("add") }}</filled-button>
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
    <image-card-list
      class="events_list"
      v-if="eventsList"
      :structure="structureInfo"
      :list="modifiedEventsList()"
      @edit="(event) => editEvent(event.id)"
      @delete="(event) => deleteEvent(event)"
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
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";
import ImageCardList from "@/components/lists/ImageCardList";
import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import FilledPagination from "@/components/paginations/FilledPagination";
import BorderedFilters from "@/components/filters/BorderedFilters.vue";

import { structureInfo, sortInfo, filters, searchInfo } from "./eventConstants";

import { subscribeEvents, deleteEvent } from "@/data/firebase/eventsApi";
import { getEventTypes } from "@/data/firebase/eventTypesApi";

import { sliceWithEllipsis } from "@/services/methods/string";
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
    ImageCardList,
    ConfirmationPopup,
    BorderedSelect,
    FilledPagination,
    BorderedFilters,
  },

  data() {
    return {
      eventsList: null,
      typesList: null,
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
    eventsList(newValue) {
      if (newValue) {
        this.$refs.preloader.hide();
        if (newValue.length == 0) {
          this.dataCount = this.$t("noRecords");
        }
      }
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
    structureInfo() {
      return structureInfo;
    },
    sortInfo() {
      return sortInfo;
    },
    searchInfo() {
      return searchInfo;
    },
  },

  methods: {
    async initData() {
      await subscribeEvents().then((data) => {
        this.eventsList = data;
      });
      await getEventTypes().then((types) => {
        this.typesList = types;
      });
    },

    initFilters() {
      let filterTypes = [];
      this.typesList.forEach((type) => {
        filterTypes.push({ id: type.id, title: type.title ?? "" });
      });
      this.filters.find((filter) => filter.id == "typeId").options =
        filterTypes;
    },

    addEvent() {
      this.$router.push({ name: "eventAdd" });
    },

    editEvent(eventId) {
      this.$router.push({ name: "eventEdit", params: { id: eventId } });
    },

    async deleteEvent(event) {
      const popupResult = await this.$refs.deleteConfirmation.open(
        this.$t("event.delete") + ": " + event.name + "?"
      );
      if (popupResult) {
        const res = deleteEvent(event.id);
        if (res) {
          this.$refs.alert.open("success", this.$t("event.alerts.deleted"));
        }
      }
    },

    modifiedEventsList() {
      let events = this.eventsList.map((event) => {
        return {
          ...event,
        };
      });

      if (events && events.length > 0 && this.typesList) {
        events.forEach((event) => {
          event.title = sliceWithEllipsis(event.title, 22);

          event.dateStartTitle =
            msToDayMonthYear(event.dateStart.seconds * 1000) + " —";
          event.dateEndTitle = msToDayMonthYear(event.dateEnd.seconds * 1000);

          const eventType = this.typesList.find(
            (type) => type.id == event.type
          );
          if (eventType) {
            event.typeId = eventType.id;
            event.type = {
              title: eventType.title,
              background: eventType.color,
            };
          }
        });

        if (this.search) events = search(events, this.searchInfo, this.search);

        if (this.sort !== "default") events = sort(events, this.sort);

        events = filter(events, this.filters);

        const l = events.length;

        const p = this.pagination;
        this.pagination.length = Math.ceil(events.length / p.limit);
        events = paginate(events, p);

        this.dataCount = recordsCount(p, l);
      }

      return events;
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
