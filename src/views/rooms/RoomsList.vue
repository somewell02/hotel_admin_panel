<template>
  <div class="actions">
    <search-input v-model="search.value" />
    <filled-button>{{ $t("add") }}</filled-button>
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
import { getRoomTypes } from "@/data/firebase/roomTypesApi";

export default {
  components: {
    ImageCardList,
    ConfirmationPopup,
  },

  data() {
    return {
      roomsList: null,
      typesList: null,
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
      await getRoomTypes().then((types) => {
        this.typesList = types;
      });
    },

    modifiedRoomsList() {
      let rooms = this.roomsList.map((room) => {
        return {
          ...room,
        };
      });

      if (rooms && this.typesList) {
        rooms.forEach((room) => {
          room.num = {
            title: room.id,
            background: "ffffff",
          };
          const roomType = this.typesList.find((type) => type.id == room.type);
          if (roomType) {
            room.typeId = roomType.id;
            room.type = {
              title: roomType.title,
              background: roomType.color,
            };
          }
        });
      }

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
