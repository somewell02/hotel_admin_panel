<template>
  <div class="type_form" v-if="modelValue">
    <text-input
      v-model="type.title"
      class="type_form_input"
      :placeholder="$t('title')"
    />
    <text-input
      v-if="!isEdit"
      v-model="type.id"
      class="type_form_input"
      :placeholder="$t('id')"
    />
    <array-textarea
      v-model="type.description"
      class="type_form_input"
      :placeholder="$t('description')"
    />
    <color-input
      v-model="type.color"
      class="type_form_input"
      :placeholder="$t('color')"
    />
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import ColorInput from "@/components/inputs/ColorInput";
import ArrayTextarea from "@/components/inputs/ArrayTextarea.vue";

export default {
  data() {
    return {
      type: this.modelValue,
    };
  },

  props: {
    types: {
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
    ArrayTextarea,
  },

  methods: {
    updateType() {
      this.$emit("update:modelValue", this.type);
    },

    validate() {
      if (!this.type.id || !this.type.title) {
        this.$refs.alert.open(
          "error",
          this.$t("roomType.alerts.requiredFileds")
        );
        return false;
      }
      if (!this.isEdit && this.types.includes(this.type.id.trim())) {
        this.$refs.alert.open(
          "error",
          this.$t("roomType.alerts.alreadyExists")
        );
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.type_form {
  .type_form_input {
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
  textarea {
    height: 100px;
  }
}
</style>
