<template>
  <div class="role_form" v-if="modelValue">
    <text-input
      v-model="role.title"
      class="role_form_input"
      :placeholder="$t('title')"
    />
    <text-input
      v-if="!isEdit"
      v-model="role.id"
      class="role_form_input"
      :placeholder="$t('id')"
    />
    <div class="role_form_input staff_input">
      {{ $t("role.fields.staff") }}
      <true-false-switch v-model="role.staff" />
    </div>
    <div class="role_form_input permissions_input">
      {{ $t("role.fields.permissions") }}
      <checkbox-list
        class="permissions_list"
        v-model="role.permissions"
        :options="permissions"
      />
    </div>
    <color-input
      v-model="role.color"
      class="role_form_input"
      :placeholder="$t('color')"
    />
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import ColorInput from "@/components/inputs/ColorInput";
import TrueFalseSwitch from "@/components/inputs/TrueFalseSwitch.vue";
import CheckboxList from "@/components/inputs/CheckboxList";

export default {
  data() {
    return {
      role: this.modelValue,
      type: null,
      permissions: [
        { id: "create" },
        { id: "read" },
        { id: "update" },
        { id: "delete" },
        { id: "stats" },
        { id: "chat" },
      ],
    };
  },

  props: {
    roles: {
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
    TrueFalseSwitch,
    CheckboxList,
  },

  methods: {
    updateRole() {
      this.$emit("update:modelValue", this.role);
    },

    validate() {
      if (!this.role.id || !this.role.title) {
        this.$refs.alert.open("error", this.$t("role.alerts.requiredFileds"));
        return false;
      }
      if (!this.isEdit && this.roles.includes(this.role.id.trim())) {
        this.$refs.alert.open("error", this.$t("role.alerts.alreadyExists"));
        return false;
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
