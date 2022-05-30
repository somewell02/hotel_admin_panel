<template>
  <div class="room_info_wrap">
    <div class="room_edit_header">
      <filled-button @click="editRoom"> {{ $t("save") }} </filled-button>
    </div>
    <room-form
      class="room_edit_main"
      v-if="room"
      v-model="room"
      ref="roomEditForm"
    />
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import { getModifiedRoomById, updateRoom } from "@/data/firebase/roomsApi";

import RoomForm from "@/layouts/dashboard/rooms/RoomForm";

export default {
  data() {
    return {
      roomId: this.$route.params.id,
      room: null,
    };
  },

  components: {
    RoomForm,
  },

  async created() {
    await this.initData();
  },

  methods: {
    async initData() {
      await getModifiedRoomById(this.roomId).then((data) => {
        this.room = data;
      });
    },

    editRoom() {
      if (this.$refs.roomEditForm.validate()) {
        const res = updateRoom(this.roomId, this.room);
        if (res) {
          this.$refs.alert.open("success", this.$t("room.alerts.updated"));
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.room_info_wrap {
  .room_edit_header {
    display: flex;
    justify-content: flex-end;
  }
  .room_edit_main {
    margin-top: 30px;
    padding: 20px 0;
    height: calc(100vh - 190px);
    overflow-y: auto;
    @include custom-scroll;
  }
}
</style>
