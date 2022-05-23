<template>
  <preloader-spinner v-if="isLoading" />
  <div class="actions">
    <search-input v-model="search" />
    <filled-button @click="addUser">{{ $t("add") }}</filled-button>
  </div>
  <div class="tabs_content_wrap">
    <div class="list_modifications">
      <bordered-filters :filters="filters" />
      <div class="sorts_wrap">
        <bordered-select
          v-model="sort"
          :options="sortInfo.options"
          :prefix="$t('sorting') + ':'"
          dropdownSide="right"
        />
      </div>
    </div>
    <spacing-bordered-table
      class="users_table"
      v-if="usersList"
      :titles="tableInfo.titles"
      :rows="modifiedUsersList()"
      :actions="tableInfo.actions"
      @edit="(user) => editUser(user.id)"
      @delete="(user) => deleteUser(user)"
    />
    <div class="pagination_wrap">
      <div class="count_title"></div>
      <filled-pagination
        :length="pagination.length"
        v-model="pagination.page"
      />
    </div>
  </div>
  <message-alert ref="alert"></message-alert>
  <confirmation-popup ref="deleteConfirmation" />
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";
import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import FilledPagination from "@/components/paginations/FilledPagination";
import BorderedFilters from "@/components/filters/BorderedFilters.vue";

import { tableInfo, sortInfo, filters, searchInfo } from "./userConstants";

import { getUsers, deleteUser } from "@/data/firebase/usersApi";
import { getUserRoles } from "@/data/firebase/userRolesApi";

export default {
  components: {
    SpacingBorderedTable,
    ConfirmationPopup,
    BorderedSelect,
    FilledPagination,
    BorderedFilters,
  },

  data() {
    return {
      usersList: null,
      rolesList: null,
      isLoading: true,
      search: "",
      sort: "default",
      filters: filters,
      pagination: {
        page: 1,
        limit: 7,
        length: 0,
      },
    };
  },

  async created() {
    await this.initData();
    this.initFilters();

    this.getRouterParams();
  },

  watch: {
    // usersList(v) {
    //   console.log("list change: " + this.msToDate(Date.now()));
    //   console.log(v);
    // },
    filters: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
    sort: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
    search: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
  },

  computed: {
    sortInfo() {
      return sortInfo;
    },
    tableInfo() {
      return tableInfo;
    },
    searchInfo() {
      return searchInfo;
    },
  },

  methods: {
    async initData() {
      await getUsers()
        .then((data) => {
          this.usersList = data;
        })
        .finally(() => {
          this.isLoading = false;
        });
      await getUserRoles().then((roles) => {
        this.rolesList = roles;
      });
    },

    initFilters() {
      const filterRoles = [];
      this.rolesList.forEach((role) => {
        filterRoles.push({ id: role.id, title: role.title });
      });
      this.filters.find((filter) => filter.id == "roleId").options =
        filterRoles;
    },

    modifiedUsersList() {
      let users = this.usersList.map((user) => {
        return {
          ...user,
        };
      });

      if (users && this.rolesList) {
        users.forEach((user) => {
          // user.fullName = user.lastName ? user.lastName + " " : "";
          // user.fullName += user.firstName ? user.firstName + " " : "";
          // user.fullName += user.patronumic ?? "";
          const userRole = this.rolesList.find((role) => role.id == user.role);
          if (userRole) {
            user.roleId = userRole.id;
            user.role = {
              title: userRole.title,
              background: userRole.color,
            };
          }
        });

        if (this.search) {
          const fields = this.searchInfo.fields;
          users = users.filter((user) => {
            let t = false;
            fields.forEach((field) => {
              if (
                user[field] &&
                user[field]
                  .trim()
                  .toLowerCase()
                  .includes(this.search.trim().toLowerCase())
              ) {
                t = true;
                return;
              }
            });
            return t;
          });
        }

        if (this.sort !== "default") {
          const value = this.sort.split(":")[0];
          const direction = this.sort.split(":")[1];
          users.sort((o1, o2) => {
            if (o1[value] > o2[value]) return direction == "asc" ? 1 : -1;
            if (o1[value] < o2[value]) return direction == "asc" ? -1 : 1;
            return 0;
          });
        }

        this.filters.forEach((filter) => {
          if (filter.values.length > 0) {
            switch (filter.type) {
              case "checkbox":
                users = users.filter((user) =>
                  filter.values.includes(user[filter.id])
                );
                break;
            }
          }
        });

        const p = this.pagination;
        this.pagination.length = Math.ceil(users.length / p.limit);
        users = users.filter(
          (user) =>
            users.indexOf(user) >= (p.page - 1) * p.limit &&
            users.indexOf(user) < p.page * p.limit
        );
      }

      return users;
    },

    addUser() {
      this.$router.push({ name: "userAdd" });
    },

    editUser(userId) {
      this.$router.push({ name: "userEdit", params: { id: userId } });
    },

    async deleteUser(user) {
      const popupResult = await this.$refs.deleteConfirmation.open(
        this.$t("user.delete") + ": " + user.name + "?"
      );
      if (popupResult) {
        const res = deleteUser(user.id);
        if (res) {
          this.$refs.alert.open("success", this.$t("user.alerts.deleted"));
        }
      }
    },

    getRouterParams() {
      if (this.$route.params.messageText) {
        this.$refs.alert.open(
          this.$route.params.messageType,
          this.$route.params.messageText
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list_modifications {
  margin-bottom: 20px;
  @include flex-between;
}
.pagination_wrap {
  margin-top: 30px;
  @include flex-between;
}
.tabs_content_wrap {
  padding-bottom: 40px;
}
</style>
