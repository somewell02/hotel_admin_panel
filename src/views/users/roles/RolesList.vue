<template>
  <div class="tabs_content_wrap roles_tab_wrap">
    <div
      class="roles_form_wrap"
      v-if="isEdit || $store.getters['user/includesCreate']"
    >
      <h2>
        {{
          this.isEdit ? $t("role.edit") + ": " + this.role.id : $t("role.add")
        }}
      </h2>
      <role-form
        v-if="this.rolesList && this.role"
        v-model="role"
        ref="roleForm"
        :roles="Array.from(this.rolesList, (role) => role.id)"
        :isEdit="isEdit"
        class="role_form"
      />
      <div class="role_form_actions">
        <filled-button v-if="this.isEdit" @click="backToAdd">
          {{ $t("back") }}
        </filled-button>
        <filled-button
          v-if="$store.getters['user/includesUpdate']"
          @click="this.isEdit ? editRole() : addRole()"
        >
          {{ this.isEdit ? $t("save") : $t("add") }}
        </filled-button>
      </div>
    </div>
    <bordered-div class="roles_list_wrap">
      <preloader-spinner ref="preloader" />
      <spacing-bordered-table
        class="roles_table"
        :type="2"
        v-if="rolesList && rolesList.length > 0"
        :titles="table.titles"
        :rows="rolesList"
        :actions="table.actions"
        @delete="(role) => deleteRole(role)"
        @edit="(role) => pushToEdit(role)"
        @view="(role) => pushToEdit(role)"
      />
      <div v-else class="no_records">{{ $t("noRecords") }}</div>
    </bordered-div>
    <message-alert ref="alert"></message-alert>
    <confirmation-popup ref="deleteConfirmation" />
  </div>
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import RoleForm from "@/layouts/dashboard/users/RoleForm";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";

import {
  subscribeUserRoles,
  addUserRole,
  deleteUserRole,
  getUserRoleById,
  updateUserRole,
} from "@/data/firebase/userRolesApi";

import { getUsersByRole } from "@/data/firebase/usersApi";

import { table } from "./roleConstants";

export default {
  data() {
    return {
      rolesList: null,
      table: table,
      isEdit: false,
      role: {},
    };
  },

  components: {
    SpacingBorderedTable,
    RoleForm,
    ConfirmationPopup,
  },

  async created() {
    this.resetRole();
    await this.initData();
  },

  methods: {
    async initData() {
      await subscribeUserRoles().then((roles) => {
        this.rolesList = roles;
      });

      if (this.$route.params.id) {
        getUserRoleById(this.$route.params.id).then((data) => {
          if (data) {
            this.setRole(data);
          } else {
            this.backToAdd();
          }
        });
      }
    },

    addRole() {
      if (this.$refs.roleForm.validate()) {
        addUserRole(this.role)
          .then(() => {
            this.$refs.alert.open("success", this.$t("role.alerts.added"));
          })
          .finally(() => {
            this.resetRole();
          });
      }
    },

    editRole() {
      if (this.$refs.roleForm.validate()) {
        updateUserRole(this.role).then(() => {
          this.$refs.alert.open("success", this.$t("role.alerts.updated"));
        });
      }
    },

    deleteRole(role) {
      getUsersByRole(role.id).then(async (data) => {
        if (!role.isDeleted) {
          this.$refs.alert.open(
            "error",
            this.$t("role.alerts.cannotBeDeleted")
          );
          return;
        } else if (data.length > 0) {
          this.$refs.alert.open("error", this.$t("role.alerts.usersExist"));
          return;
        } else {
          const popupResult = await this.$refs.deleteConfirmation.open(
            this.$t("role.delete") + ": " + role.id + "?"
          );
          if (popupResult) {
            const res = deleteUserRole(role.id);
            if (res) {
              this.$refs.alert.open("success", this.$t("role.alerts.deleted"));
              if (this.isEdit) {
                this.backToAdd();
              }
            }
          }
        }
      });
    },

    pushToEdit(role) {
      this.setRole(role);
      this.$router.push({ name: "roleEdit", params: { id: role.id } });
    },

    backToAdd() {
      this.resetRole();
      this.$router.push({ name: "roles" });
    },

    setRole(role) {
      this.isEdit = true;
      this.role.title = role.title;
      this.role.id = role.id;
      this.role.staff = role.staff;
      this.role.permissions = role.permissions;
      this.role.color = role.color;
    },

    resetRole() {
      this.isEdit = false;
      this.role.title = "";
      this.role.id = "";
      this.role.staff = false;
      this.role.isDeleted = true;
      this.role.permissions = [];
      this.role.color = "000000";
    },
  },

  watch: {
    rolesList(newValue) {
      if (newValue) this.$refs.preloader.hide();
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
    .role_form_actions {
      @include flex-between;
      width: 100%;
      button {
        flex: 1 1 50%;
        &:not(:last-child) {
          margin-right: 15px;
        }
      }
    }
  }
  .roles_list_wrap {
    flex-grow: 3;
    padding-top: 15px;
    position: relative;
    min-height: 70px;
  }
  .no_records {
    padding: 0 20px;
    color: var(--text-color);
    font-size: 14px;
  }
}
</style>
