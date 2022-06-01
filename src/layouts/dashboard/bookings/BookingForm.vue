<template>
  <form-layout class="booking_form" v-if="modelValue">
    <preloader-spinner ref="preloader" />
    <div class="form_block">
      <h2>{{ $t("status") }}</h2>
      <div class="form_block_inputs">
        <bordered-select
          class="input_item column_12 margin"
          v-if="types"
          v-model="booking.status"
          :options="types"
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
        <div v-if="isAdd"></div>
        <spacing-bordered-table
          v-else
          class="user_table input_item"
          :titles="userTable.titles"
          :rows="booking.user"
          :actions="userTable.actions"
          @view="(user) => viewUser(user.id)"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("room.title") }}</h2>
      <div class="form_block_inputs">
        <div v-if="isAdd"></div>
        <spacing-bordered-table
          v-else
          class="room_table input_item"
          :titles="roomTable.titles"
          :rows="booking.room"
          :actions="roomTable.actions"
          @view="(room) => viewRoom(room.id)"
        />
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </form-layout>
</template>

<script>
import { getBookingStatuses } from "@/data/firebase/bookingStatusesApi";

import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import DateInput from "@/components/inputs/DateInput";
import FormLayout from "@/layouts/dashboard/FormLayout";

import { bookingTableInfo as userTable } from "@/views/users/userConstants";
import { bookingTableInfo as roomTable } from "@/views/rooms/roomConstants";

export default {
  data() {
    return {
      booking: this.modelValue,
      types: null,
      tags: null,
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
  },

  methods: {
    initData() {
      getBookingStatuses()
        .then((data) => {
          this.types = data;
        })
        .finally(() => {
          this.$refs.preloader.hide();
        });
    },

    updateUser() {
      this.$emit("update:modelValue", this.booking);
    },

    viewUser(id) {
      this.$router.push({ name: "userEdit", params: { id: id } });
    },

    viewRoom(id) {
      this.$router.push({ name: "roomEdit", params: { id: id } });
    },

    validate() {
      if (
        !this.booking.name.trim() ||
        !this.booking.type.trim() ||
        isNaN(this.booking.price)
      ) {
        this.$refs.alert.open(
          "error",
          this.$t("booking.alerts.requiredFileds")
        );
        return false;
      }
      if (this.booking.images.length < 1) {
        this.$refs.alert.open("error", this.$t("booking.alerts.requiredImage"));
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.booking_form {
  position: relative;
  textarea {
    height: 150px;
  }
  .tags_select {
    width: 100%;
    height: 100px;
  }
  .gallery_input {
    width: 100%;
  }
  .user_table,
  .room_table {
    width: 100%;
  }
}
</style>
