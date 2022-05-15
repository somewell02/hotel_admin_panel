<template>
  <div class="user_form" v-if="modelValue">
    <div class="form_block">
      <h2>{{ $t("user.fields.role") }}</h2>
      <div class="form_block_inputs column_3">
        <bordered-select
          v-if="roles"
          v-model="user.role"
          @input="updateUser"
          :options="roles"
        />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("user.form.info") }}</h2>
      <div class="form_block_inputs column_3">
        <text-input v-model="user.name" placeholder="ФИО" />
      </div>
    </div>
    <div class="form_block">
      <h2>{{ $t("user.form.contact") }}</h2>
      <div class="form_block_inputs column_3">
        <text-input v-model="user.phone" placeholder="Телефон" />
        <text-input v-model="user.email" placeholder="Email" />
      </div>
    </div>
  </div>
</template>

<script>
import { getUserRoles } from "@/data/firebase/users-api";
import BorderedSelect from "@/components/dropdowns/BorderedSelect";

export default {
  data() {
    return {
      user: this.modelValue,
      roles: null,
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
