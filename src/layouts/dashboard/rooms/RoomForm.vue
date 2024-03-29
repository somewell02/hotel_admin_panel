<template>
  <form-layout class="room_form" v-if="modelValue">
    <preloader-spinner ref="preloader" />
    <div class="form_block">
      <h2>{{ $t("room.fields.numbers") }}</h2>
      <div class="form_block_inputs">
        <array-with-add-input
          class="input_item column_1"
          type="number"
          v-model="room.numbers"
          :validate="numbersValidate"
          :disabled="disabled"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("info") }}</h2>
      <div class="form_block_inputs">
        <text-input
          class="input_item column_1"
          v-model="room.name"
          :placeholder="$t('room.fields.name')"
          :disabled="disabled"
        />
        <bordered-select
          class="input_item column_12 margin"
          v-if="types"
          v-model="room.type"
          :options="types"
          :defaultTitle="$t('room.form.chooseType')"
          :disabled="disabled"
        />
        <number-input
          class="input_item column_12"
          v-model="room.bedsCount"
          :placeholder="$t('room.fields.bedsCount')"
          :min="0"
          :max="50"
          :disabled="disabled"
        />
        <time-input
          class="input_item column_12 margin"
          v-model="room.checkIn"
          :placeholder="$t('room.fields.checkIn')"
          :disabled="disabled"
        />
        <time-input
          class="input_item column_12"
          v-model="room.eviction"
          :placeholder="$t('room.fields.eviction')"
          :disabled="disabled"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("price") }}</h2>
      <div class="form_block_inputs">
        <number-input
          class="input_item column_12"
          v-model="room.price"
          :placeholder="$t('room.fields.name')"
          min="0"
          :disabled="disabled"
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
          :disabled="disabled"
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
        <gallery-input
          v-model="room.images"
          :active="isAdd"
          class="input_item gallery_input"
        />
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </form-layout>
</template>

<script>
import { getRoomsByNumber } from "@/data/firebase/roomsApi";
import { getRoomTypes } from "@/data/firebase/roomTypesApi";
import { getRoomTags } from "@/data/firebase/roomTagsApi";

import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import NumberInput from "@/components/inputs/NumberInput";
import TimeInput from "@/components/inputs/TimeInput";
import MultiSelectSearch from "@/components/dropdowns/MultiSelectSearch";
import ArrayTextarea from "@/components/inputs/ArrayTextarea";
import FormLayout from "@/layouts/dashboard/FormLayout";
import GalleryInput from "@/components/inputs/GalleryInput";
import ArrayWithAddInput from "@/components/inputs/ArrayWithAddInput";

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
    isAdd: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  components: {
    BorderedSelect,
    NumberInput,
    ArrayTextarea,
    FormLayout,
    MultiSelectSearch,
    GalleryInput,
    TimeInput,
    ArrayWithAddInput,
  },

  async created() {
    await this.initData();
  },

  computed: {
    disabled() {
      return this.isAdd
        ? !this.$store.getters["user/includesCreate"]
        : !this.$store.getters["user/includesUpdate"];
    },
  },

  methods: {
    initData() {
      getRoomTypes()
        .then((data) => {
          this.types = data;
        })
        .finally(() => {
          this.$refs.preloader.hide();
        });
      getRoomTags().then((data) => {
        this.tags = data;
      });
    },

    updateUser() {
      this.$emit("update:modelValue", this.room);
    },

    async numbersValidate(number) {
      let v = false;
      await getRoomsByNumber(number).then((data) => {
        v = !(data.length > 0);
      });
      return v;
    },

    validate() {
      if (
        !this.room.name.trim() ||
        !this.room.type.trim() ||
        isNaN(this.room.price)
      ) {
        this.$refs.alert.open("error", this.$t("room.alerts.requiredFields"));
        return false;
      }
      if (this.room.images.length < 1) {
        this.$refs.alert.open("error", this.$t("room.alerts.requiredImage"));
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.room_form {
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
}
</style>
