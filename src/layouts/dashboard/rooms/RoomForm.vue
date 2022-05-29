<template>
  <form-layout class="room_form" v-if="modelValue">
    <div class="form_block">
      <h2>{{ $t("info") }}</h2>
      <div class="form_block_inputs">
        <text-input
          class="input_item column_1"
          v-model="room.name"
          :placeholder="$t('room.fields.name')"
        />
        <bordered-select
          class="input_item column_12 margin"
          v-if="types"
          v-model="room.type"
          :options="types"
          :defaultTitle="$t('room.form.chooseType')"
        />
        <number-input
          class="input_item column_12"
          v-model="room.bedsCount"
          :placeholder="$t('room.fields.bedsCount')"
          min="0"
          max="50"
        />
        <text-input
          class="input_item column_12 margin"
          v-model="room.checkIn"
          :placeholder="$t('room.fields.checkIn')"
        />
        <text-input
          class="input_item column_12"
          v-model="room.eviction"
          :placeholder="$t('room.fields.eviction')"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("room.fields.price") }}</h2>
      <div class="form_block_inputs">
        <number-input
          class="input_item column_12"
          v-model="room.price"
          :placeholder="$t('room.fields.name')"
          min="0"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("description") }}</h2>
      <div class="form_block_inputs">
        <array-textarea
          class="input_item column_1"
          v-model="room.description"
          :placeholder="$t('description')"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("room.fields.tags") }}</h2>
      <div class="form_block_inputs">
        <multi-select-search
          v-if="tags"
          v-model="room.tags"
          :options="tags"
          :placeholder="$t('room.form.tagSearch')"
          :noRecords="$t('room.form.noTags')"
          class="input_item tags_select"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("gallery") }}</h2>
      <div class="form_block_inputs">
        <gallery-input v-model="room.images" />
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </form-layout>
</template>

<script>
import { getRoomTypes } from "@/data/firebase/roomTypesApi";
import { getRoomTags } from "@/data/firebase/roomTagsApi";

import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import NumberInput from "@/components/inputs/NumberInput";
import MultiSelectSearch from "@/components/dropdowns/MultiSelectSearch";
import ArrayTextarea from "@/components/inputs/ArrayTextarea";
import FormLayout from "@/layouts/dashboard/FormLayout";
import GalleryInput from "@/components/inputs/GalleryInput";

export default {
  data() {
    return {
      room: this.modelValue,
      types: null,
      tags: null,
    };
  },

  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },

  components: {
    BorderedSelect,
    NumberInput,
    ArrayTextarea,
    FormLayout,
    MultiSelectSearch,
    GalleryInput,
  },

  async created() {
    await this.initData();
  },

  methods: {
    initData() {
      getRoomTypes().then((data) => {
        this.types = data;
      });
      getRoomTags().then((data) => {
        this.tags = data;
      });
    },

    updateUser() {
      this.$emit("update:modelValue", this.room);
    },

    validate() {
      // if (!this.room.phone.trim() && !this.room.email.trim()) {
      //   this.$refs.alert.open("error", this.$t("room.alerts.needPhoneOrEmail"));
      //   return false;
      // }
      // if (
      //   this.room.phone.trim() &&
      //   !this.room.phone.trim().match(phonePattern)
      // ) {
      //   this.$refs.alert.open("error", this.$t("room.alerts.incorrectPhone"));
      //   return false;
      // }
      // if (
      //   this.room.email.trim() &&
      //   !this.room.email.trim().match(emailPattern)
      // ) {
      //   this.$refs.alert.open("error", this.$t("room.alerts.incorrectGmail"));
      //   return false;
      // }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.room_form {
  textarea {
    height: 150px;
  }
  .tags_select {
    width: 100%;
    height: 100px;
  }
}
</style>
