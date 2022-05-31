<template>
  <main class="room_add_wrap">
    <preloader-spinner ref="preloader" />
    <header class="room_add_header">
      <div class="left_actions">
        <filled-button
          color="primary-light"
          @click="$router.push({ name: 'rooms' })"
        >
          {{ $t("backToList") }}
        </filled-button>
      </div>
      <div class="right_actions">
        <filled-button @click="addRoom"> {{ $t("add") }} </filled-button>
      </div>
    </header>
    <div class="room_add_content">
      <room-form ref="roomAddForm" v-model="room" :isAdd="true" />
    </div>
    <message-alert ref="alert"></message-alert>
  </main>
</template>

<script>
import RoomForm from "@/layouts/dashboard/rooms/RoomForm";
import { addRoom } from "@/data/firebase/roomsApi";

export default {
  data() {
    return {
      room: {
        bedsCount: 1,
        checkIn: "",
        description: [],
        eviction: "",
        images: [],
        name: "",
        price: 0,
        tags: [],
        type: "",
        rating: 0,
      },
    };
  },

  components: {
    RoomForm,
  },

  mounted() {
    this.$refs.preloader.hide();
  },

  methods: {
    addRoom() {
      if (this.$refs.roomAddForm.validate()) {
        this.$refs.preloader.show();
        addRoom(this.room).then((room) => {
          if (room) {
            this.$router.push({
              name: "roomEdit",
              params: {
                id: room.id,
                messageType: "success",
                messageText: this.$t("room.alerts.added"),
              },
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.room_add_wrap {
  position: relative;
  padding-bottom: 40px;
  .room_add_header {
    @include flex-between;
  }
  .room_add_content {
    margin-top: 50px;
  }
}
</style>
