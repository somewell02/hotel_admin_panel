<template>
  <div class="status_form" v-if="modelValue">
    <text-input
      v-model="status.title"
      class="status_form_input"
      :placeholder="$t('title')"
    />
    <text-input
      v-if="!isEdit"
      v-model="status.id"
      class="status_form_input"
      :placeholder="$t('id')"
    />
    <color-input
      v-model="status.color"
      class="status_form_input"
      :placeholder="$t('color')"
    />
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import ColorInput from "@/components/inputs/ColorInput";

export default {
  data() {
    return {
      status: this.modelValue,
    };
  },

  props: {
    statuses: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  components: {
    ColorInput,
  },

  methods: {
    updateRole() {
      this.$emit("update:modelValue", this.status);
    },

    validate() {
      if (!this.status.id || !this.status.title) {
        this.$refs.alert.open(
          "error",
          this.$t("bookingStatus.alerts.requiredFileds")
        );
        return false;
      }
      if (!this.isEdit && this.statuses.includes(this.status.id.trim())) {
        this.$refs.alert.open(
          "error",
          this.$t("bookingStatus.alerts.alreadyExists")
        );
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.status_form {
  .status_form_input {
    &:not(:first-child) {
      margin-top: 20px;
    }
    &.staff_input {
      @include flex-between;
      font-size: 15px;
    }
    &.permissions_input {
      font-size: 15px;
      .permissions_list {
        margin-top: 10px;
        max-height: 100px;
      }
    }
  }
}
</style>
