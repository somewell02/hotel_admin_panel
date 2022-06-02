<template>
  <div class="actions">
    <search-input v-model="search" />
    <filled-button @click="addRoom">{{ $t("add") }}</filled-button>
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
      class="rooms_list"
      v-if="roomsList"
      :structure="structureInfo"
      :list="modifiedRoomsList()"
      @edit="(room) => editRoom(room.id)"
      @delete="(room) => deleteRoom(room)"
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

import { structureInfo, sortInfo, filters, searchInfo } from "./roomConstants";

import { subscribeRooms, deleteRoom } from "@/data/firebase/roomsApi";
import { getRoomTypes } from "@/data/firebase/roomTypesApi";

import { sliceWithEllipsis } from "@/services/methods/string";

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
      roomsList: null,
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
    roomsList(newValue) {
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
      await subscribeRooms().then((data) => {
        this.roomsList = data;
      });
      await getRoomTypes().then((types) => {
        this.typesList = types;
      });
    },

    initFilters() {
      const filterTypes = [];
      this.typesList.forEach((type) => {
        filterTypes.push({ id: type.id, title: type.title });
      });
      this.filters.find((filter) => filter.id == "typeId").options =
        filterTypes;
    },

    addRoom() {
      this.$router.push({ name: "roomAdd" });
    },

    editRoom(roomId) {
      this.$router.push({ name: "roomEdit", params: { id: roomId } });
    },

    async deleteRoom(room) {
      const popupResult = await this.$refs.deleteConfirmation.open(
        this.$t("room.delete") + ": " + room.name + "?"
      );
      if (popupResult) {
        const res = deleteRoom(room.id);
        if (res) {
          this.$refs.alert.open("success", this.$t("room.alerts.deleted"));
        }
      }
    },

    modifiedRoomsList() {
      let rooms = this.roomsList.map((room) => {
        return {
          ...room,
        };
      });

      if (rooms && rooms.length > 0 && this.typesList) {
        rooms.forEach((room) => {
          room.num = {
            title: room.id,
            background: "ffffff",
          };
          room.image = room.images ? room.images[0] ?? null : null;
          room.name = sliceWithEllipsis(room.name, 24);

          const roomType = this.typesList.find((type) => type.id == room.type);
          if (roomType) {
            room.typeId = roomType.id;
            room.type = {
              title: roomType.title,
              background: roomType.color,
            };
          }
        });

        if (this.search) rooms = search(rooms, this.searchInfo, this.search);

        if (this.sort !== "default") rooms = sort(rooms, this.sort);

        rooms = filter(rooms, this.filters);

        const l = rooms.length;

        const p = this.pagination;
        this.pagination.length = Math.ceil(rooms.length / p.limit);
        rooms = paginate(rooms, p);

        this.dataCount = recordsCount(p, l);
      }

      return rooms;
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
