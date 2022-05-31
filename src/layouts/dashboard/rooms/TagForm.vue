<template>
  <div class="tag_form" v-if="modelValue">
    <text-input
      v-model="tag.title"
      class="tag_form_input"
      :placeholder="$t('title')"
    />
    <array-textarea
      v-model="tag.description"
      class="tag_form_input"
      :placeholder="$t('description')"
    />
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import ArrayTextarea from "@/components/inputs/ArrayTextarea.vue";

export default {
  data() {
    return {
      tag: this.modelValue,
    };
  },

  props: {
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
    ArrayTextarea,
  },

  methods: {
    updateTag() {
      this.$emit("update:modelValue", this.tag);
    },

    validate() {
      if (!this.tag.title) {
        this.$refs.alert.open(
          "error",
          this.$t("roomTag.alerts.requiredFileds")
        );
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.tag_form {
  .tag_form_input {
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
