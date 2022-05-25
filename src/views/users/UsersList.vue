<template>
  <div class="actions">
    <search-input v-model="search" />
    <filled-button @click="addUser">{{ $t("add") }}</filled-button>
  </div>
  <div class="tabs_content_wrap">
    <preloader-spinner ref="preloader" />
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
      v-if="usersList && modifiedUsersList().length > 0"
      :titles="tableInfo.titles"
      :rows="modifiedUsersList()"
      :actions="tableInfo.actions"
      @edit="(user) => editUser(user.id)"
      @delete="(user) => deleteUser(user)"
    />
    <div class="pagination_wrap">
      <div class="count_title">
        {{ dataCount }}
      </div>
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

import {
  search,
  sort,
  filter,
  paginate,
  recordsCount,
} from "@/services/methods/list.js";

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
      search: "",
      sort: "default",
      filters: filters,
      pagination: {
        page: 1,
        limit: 7,
        length: 0,
      },
      dataCount: "",
    };
  },

  async created() {
    await this.initData();
    this.initFilters();

    this.getRouterParams();
  },

  watch: {
    usersList(newValue, oldValue) {
      if (oldValue && oldValue.length == 0 && newValue.length > 0)
        this.$refs.preloader.hide();
    },
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
      await getUsers().then((data) => {
        this.usersList = data;
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

        if (this.search) users = search(users, this.searchInfo, this.search);

        if (this.sort !== "default") users = sort(users, this.sort);

        users = filter(users, this.filters);

        const l = users.length;

        const p = this.pagination;
        this.pagination.length = Math.ceil(users.length / p.limit);
        users = paginate(users, p);

        this.dataCount = recordsCount(p, l);
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
  position: relative;
}
</style>
