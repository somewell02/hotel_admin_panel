<template>
  <div class="faq_form" v-if="modelValue">
    <text-input
      v-model="faq.title"
      class="faq_form_input"
      :placeholder="$t('title')"
    />
    <array-textarea
      class="faq_form_input"
      v-model="faq.description"
      :placeholder="$t('description')"
    />
    <image-input class="faq_form_input" v-model="faq.image" width="150px" />
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import ArrayTextarea from "@/components/inputs/ArrayTextarea";
import ImageInput from "@/components/inputs/ImageInput";

export default {
  data() {
    return {
      faq: this.modelValue,
      type: null,
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
    ImageInput,
  },

  methods: {
    updateFaq() {
      this.$emit("update:modelValue", this.faq);
    },

    validate() {
      if (!this.faq.title || this.faq.description.length == 0) {
        this.$refs.alert.open("error", this.$t("faq.alerts.requiredFileds"));
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.faq_form {
  .faq_form_input {
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
  textarea {
    height: 200px;
  }
}
</style>
