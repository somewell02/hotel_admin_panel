<template>
  <div class="actions">
    <search-input v-model="search.value" />
    <filled-button @click="addRoom">{{ $t("add") }}</filled-button>
  </div>
  <div class="tabs_content_wrap">
    <image-card-list
      class="rooms_list"
      v-if="roomsList"
      :structure="structureInfo"
      :list="modifiedRoomsList()"
    />
  </div>
  <confirmation-popup ref="deleteConfirmation" />
</template>

<script>
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";
import ImageCardList from "@/components/lists/ImageCardList";

import { structureInfo } from "./roomConstants";

import { getRooms } from "@/data/firebase/roomsApi";

export default {
  components: {
    ImageCardList,
    ConfirmationPopup,
  },

  data() {
    return {
      roomsList: null,
      isLoading: true,
      search: "",
    };
  },

  async created() {
    await this.initData();
  },

  computed: {
    structureInfo() {
      return structureInfo;
    },
  },

  methods: {
    async initData() {
      await getRooms()
        .then((data) => {
          this.roomsList = data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    modifiedRoomsList() {
      let rooms = this.roomsList.map((room) => {
        return {
          ...room,
        };
      });
      return rooms;
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs_content_wrap {
  padding-bottom: 40px;
}
</style>
