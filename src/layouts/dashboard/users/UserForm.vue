<template>
  <div class="user_form" v-if="modelValue">
    <div class="form_block">
      <h2>{{ $t("user.fields.role") }}</h2>
      <div class="form_block_inputs column_3">
        <bordered-select v-if="roles" v-model="user.role" :options="roles" />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("user.form.info") }}</h2>
      <div class="form_block_inputs column_3">
        <text-input v-model="user.name" :placeholder="$t('user.fields.name')" />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("user.form.contact") }}</h2>
      <div class="form_block_inputs column_3">
        <text-input
          v-model="user.phone"
          :placeholder="$t('user.fields.phone')"
        />
        <text-input
          v-model="user.email"
          :placeholder="$t('user.fields.email')"
        />
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import { getUserRoles } from "@/data/firebase/userRolesApi";

import BorderedSelect from "@/components/dropdowns/BorderedSelect";

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
  },

  components: {
    BorderedSelect,
  },

  async created() {
    await this.initData();
    this.role = this.user.role.toString();
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
      const emailPattern = /^[^ ]+@gmail.com$/;
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
      if (this.user.role != this.role && this.user.role == "admin") {
        //this.$refs.alert.open("information", "Нужно подтверждение");
        //return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.user_form {
  .form_block {
    &:not(:first-child) {
      margin-top: 40px;
    }
    .form_block_inputs {
      margin-top: 20px;
      display: flex;
      &.column_3 > * {
        flex: 0 0 calc((100% - 40px) / 3);
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
