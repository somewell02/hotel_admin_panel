<template>
  <div class="tabs_content_wrap roles_tab_wrap">
    <div class="roles_form_wrap">
      <h2>{{ $t("role.add") }}</h2>
      <role-form v-model="role" ref="role_form" class="role_form" />
      <filled-button> {{ $t("add") }} </filled-button>
    </div>
    <bordered-div class="roles_list_wrap">
      <spacing-bordered-table
        class="roles_table"
        :type="2"
        v-if="rolesList"
        :titles="table.titles"
        :rows="rolesList"
        :actions="table.actions"
      />
    </bordered-div>
  </div>
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import RoleForm from "@/layouts/dashboard/users/RoleForm";

import { subscribeUserRoles } from "@/data/firebase/userRolesApi";

import { table } from "./roleConstants";

export default {
  data() {
    return {
      rolesList: null,
      table: table,
      role: {
        title: "",
        id: "",
        staff: false,
        permissions: [],
        color: "#000000",
      },
    };
  },

  components: {
    SpacingBorderedTable,
    RoleForm,
  },

  async created() {
    await this.initData();
  },

  methods: {
    async initData() {
      await subscribeUserRoles().then((roles) => {
        this.rolesList = roles;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.roles_tab_wrap {
  display: flex;
  align-items: flex-start;
  .roles_form_wrap {
    display: flex;
    flex-direction: column;
    width: calc(35% - 40px);
    margin-right: 40px;
    .role_form,
    button {
      margin-top: 25px;
    }
  }
  .roles_list_wrap {
    width: 65%;
    padding-top: 15px;
  }
}
</style>
