<template>
  <form-layout class="user_form" v-if="modelValue">
    <div class="form_block">
      <h2>{{ $t("user.fields.role") }}</h2>
      <div class="form_block_inputs">
        <bordered-select
          class="input_item column_13"
          v-if="roles"
          v-model="user.role"
          :options="roles"
          :defaultTitle="$t('user.form.chooseRole')"
          :disabled="disabled"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("user.form.info") }}</h2>
      <div class="form_block_inputs">
        <text-input
          class="input_item column_13"
          v-model="user.name"
          :placeholder="$t('user.fields.name')"
          :disabled="disabled"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("user.form.contact") }}</h2>
      <div class="form_block_inputs">
        <text-input
          class="input_item column_13 margin"
          v-model="user.phone"
          :placeholder="$t('user.fields.phone')"
          :disabled="disabled"
        />
        <text-input
          class="input_item column_13"
          v-model="user.email"
          :placeholder="$t('user.fields.email')"
          :disabled="disabled"
        />
      </div>
    </div>
    <div class="form_block" v-if="isAdd && userRole.staff">
      <h2>{{ $t("user.fields.password") }}</h2>
      <div class="form_block_inputs">
        <text-input
          class="input_item column_13 margin"
          v-model="user.password"
          :placeholder="$t('user.fields.password')"
        />
        <text-input
          class="input_item column_13"
          :placeholder="$t('user.form.repeatPassword')"
        />
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </form-layout>
</template>

<script>
import { getUserRoles } from "@/data/firebase/userRolesApi";

import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import FormLayout from "@/layouts/dashboard/FormLayout";

export default {
  data() {
    return {
      user: this.modelValue,
      roles: null,
      role: null,
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
  },

  async created() {
    await this.initData();
    this.role = this.user.role ? this.user.role.toString() : "";
  },

  computed: {
    userRole() {
      if (this.roles) {
        return this.roles.find((role) => role.id === this.user.role);
      } else return {};
    },
    disabled() {
      return this.isAdd
        ? !this.$store.getters["user/includesCreate"]
        : !this.$store.getters["user/includesUpdate"];
    },
  },

  methods: {
    initData() {
      getUserRoles().then((roles) => {
        this.roles = roles;
      });
    },

    updateUser() {
      this.$emit("update:modelValue", this.user);
    },

    validate() {
      const emailPattern = /\S+@\S+\.\S+/;
      const phonePattern =
        /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;

      if (!this.user.phone.trim() && !this.user.email.trim()) {
        this.$refs.alert.open("error", this.$t("user.alerts.needPhoneOrEmail"));
        return false;
      }
      if (
        this.user.phone.trim() &&
        !this.user.phone.trim().match(phonePattern)
      ) {
        this.$refs.alert.open("error", this.$t("user.alerts.incorrectPhone"));
        return false;
      }
      if (
        this.user.email.trim() &&
        !this.user.email.trim().match(emailPattern)
      ) {
        this.$refs.alert.open("error", this.$t("user.alerts.incorrectGmail"));
        return false;
      }
      if (this.user.role !== this.role && this.user.role === "admin") {
        //this.$refs.alert.open("information", "Нужно подтверждение");
        //return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
