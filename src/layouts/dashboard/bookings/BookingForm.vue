<template>
  <form-layout class="booking_form" v-if="modelValue">
    <preloader-spinner ref="preloader" />
    <div class="form_block" v-if="!isAdd">
      <h2>{{ $t("status") }}</h2>
      <div class="form_block_inputs">
        <bordered-select
          class="input_item column_12 margin"
          v-if="statuses"
          v-model="booking.status"
          :options="statuses"
          :defaultTitle="$t('booking.form.chooseStatus')"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("info") }}</h2>
      <div class="form_block_inputs">
        <date-input
          class="input_item column_12 margin"
          v-model="booking.dateStart"
          :placeholder="$t('booking.fields.dateStart')"
        />
        <date-input
          class="input_item column_12"
          v-model="booking.dateEnd"
          :placeholder="$t('booking.fields.dateEnd')"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("user.title") }}</h2>
      <div class="form_block_inputs">
        <table-search-select
          v-if="isAdd && usersList"
          class="user_table input_item"
          v-model="booking.uid"
          :options="modifiedUsersList"
          :table="{ titles: userTable.titles, actions: ['select'] }"
          :defaultTitle="$t('booking.form.chooseUser')"
          :searchInfo="userSearchInfo"
        />
        <spacing-bordered-table
          v-else
          class="user_table input_item"
          :titles="userTable.titles"
          :rows="bookingUser"
          :actions="userTable.actions"
          @view="(user) => viewUser(user.id)"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("room.title") }}</h2>
      <div class="form_block_inputs">
        <table-search-select
          v-if="roomsList"
          class="room_table input_item"
          v-model="booking.roomId"
          :options="modifiedRoomsList"
          :table="{ titles: roomTable.titles, actions: ['select'] }"
          :defaultTitle="$t('booking.form.chooseRoom')"
          :searchInfo="roomSearchInfo"
        />
        <bordered-select
          class="input_item column_13"
          v-if="selectedRoomNumbers"
          v-model="booking.roomNumber"
          :options="selectedRoomNumbers"
          :defaultTitle="$t('booking.form.chooseNumber')"
        />
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </form-layout>
</template>

<script>
import { getBookingStatuses } from "@/data/firebase/bookingStatusesApi";
import { getUsers } from "@/data/firebase/usersApi";
import { getRooms } from "@/data/firebase/roomsApi";
import { getUserRoles } from "@/data/firebase/userRolesApi";
import { getRoomTypes } from "@/data/firebase/roomTypesApi";

import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import TableSearchSelect from "@/components/dropdowns/TableSearchSelect";
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import DateInput from "@/components/inputs/DateInput";
import FormLayout from "@/layouts/dashboard/FormLayout";

import {
  bookingTableInfo as userTable,
  searchInfo as userSearchInfo,
} from "@/views/users/userConstants";
import {
  bookingTableInfo as roomTable,
  searchInfo as roomSearchInfo,
} from "@/views/rooms/roomConstants";

export default {
  data() {
    return {
      booking: this.modelValue,
      statuses: null,
      usersList: null,
      roomsList: null,
      rolesList: null,
      typesList: null,
    };
  },

  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    isAdd: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  components: {
    BorderedSelect,
    FormLayout,
    DateInput,
    SpacingBorderedTable,
    TableSearchSelect,
  },

  async created() {
    await this.initData();
  },

  computed: {
    userTable() {
      return userTable;
    },
    roomTable() {
      return roomTable;
    },
    userSearchInfo() {
      return userSearchInfo;
    },
    roomSearchInfo() {
      return roomSearchInfo;
    },
    selectedRoomNumbers() {
      if (this.roomsList && this.booking.roomId) {
        let numbers = [];
        const data = this.roomsList.find(
          (room) => room.id == this.booking.roomId
        ).numbers;
        if (data) {
          data.forEach((number) => {
            numbers.push({
              id: number,
              title: number.toString(),
            });
          });
        }
        return numbers;
      } else return null;
    },
    bookingUser() {
      if (this.booking && this.usersList) {
        return [this.usersList.find((user) => user.id == this.booking.uid)];
      } else return null;
    },
    modifiedUsersList() {
      if (this.usersList) {
        let users = this.usersList.map((user) => {
          return {
            ...user,
          };
        });

        if (users && users.length > 0 && this.rolesList) {
          users.forEach((user) => {
            const userRole = this.rolesList.find(
              (role) => role.id == user.role
            );
            if (userRole) {
              user.role = {
                title: userRole.title,
                background: userRole.color,
              };
            }
          });
        }

        return users;
      } else return null;
    },
    modifiedRoomsList() {
      let rooms = this.roomsList.map((room) => {
        return {
          ...room,
        };
      });

      if (rooms && rooms.length > 0 && this.typesList) {
        rooms.forEach((room) => {
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

  methods: {
    initData() {
      getRooms().then((rooms) => {
        this.roomsList = rooms;
      });
      getRoomTypes().then((types) => {
        this.typesList = types;
      });
      getUsers().then((users) => {
        this.usersList = users;
      });
      getUserRoles()
        .then((roles) => {
          this.rolesList = roles;
        })
        .finally(() => {
          this.$refs.preloader.hide();
        });
      if (!this.isAdd) {
        getBookingStatuses()
          .then((data) => {
            this.statuses = data;
          })
          .finally(() => {
            this.$refs.preloader.hide();
          });
      }
    },

    updateBooking() {
      this.$emit("update:modelValue", this.booking);
    },

    viewUser(id) {
      this.$router.push({ name: "userEdit", params: { id: id } });
    },

    viewRoom(id) {
      this.$router.push({ name: "roomEdit", params: { id: id } });
    },

    validate() {
      if (!this.booking.uid || !this.booking.roomId) {
        this.$refs.alert.open(
          "error",
          this.$t("booking.alerts.requiredFileds")
        );
        return false;
      }
      if (!this.booking.roomNumber) {
        this.$refs.alert.open(
          "error",
          this.$t("booking.alerts.requiredRoomNumber")
        );
        return false;
      }
      this.booking.roomName = this.roomsList.find(
        (room) => room.id == this.booking.roomId
      ).name;
      this.booking.roomType = this.roomsList.find(
        (room) => room.id == this.booking.roomId
      ).type;
      this.booking.dateStart = new Date(this.booking.dateStart);
      this.booking.dateEnd = new Date(this.booking.dateEnd);
      this.booking.totalPrice =
        Math.floor((this.booking.dateEnd - this.booking.dateStart) / 86400000) *
        this.roomsList.find((room) => room.id == this.booking.roomId).price;
      this.updateBooking();
      return true;
    },
  },

  watch: {
    "booking.roomId"() {
      this.booking.roomNumber = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.booking_form {
  position: relative;
  .user_table,
  .room_table {
    width: 100%;
  }
}
</style>
