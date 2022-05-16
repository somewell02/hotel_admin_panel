<template>
  <div class="role_form" v-if="modelValue">
    <text-input
      v-model="role.title"
      class="role_form_input"
      :placeholder="$t('role.fields.title')"
    />
    <text-input
      v-model="role.id"
      class="role_form_input"
      :placeholder="$t('role.fields.id')"
    />
    isStaff<br />
    Permissions <br />
    <color-input
      v-model="role.color"
      class="role_form_input"
      :placeholder="$t('role.fields.color')"
    />
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import ColorInput from "@/components/inputs/ColorInput";

export default {
  data() {
    return {
      role: this.modelValue,
    };
  },

  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },

  components: {
    ColorInput,
  },

  async created() {
    await this.initData();
  },

  methods: {
    initData() {},

    updateRole() {
      this.$emit("update:modelValue", this.role);
    },

    validate() {
      const pattern = /^[^ ]+@gmail.com$/;
      if (!this.role.phone.trim() && !this.role.email.trim()) {
        this.$refs.alert.open("error", this.$t("role.alerts.needPhoneOrEmail"));
        return false;
      }
      if (this.role.email.trim() && !this.role.email.trim().match(pattern)) {
        this.$refs.alert.open("error", this.$t("role.alerts.incorrectGmail"));
        return false;
      }
      if (this.role.role != this.role && this.role.role == "admin") {
        //this.$refs.alert.open("information", "Нужно подтверждение");
        //return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.role_form {
  .role_form_input {
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
}
</style>
