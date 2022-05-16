<template>
  <preloader-spinner v-if="isLoading" />
  <div class="actions">
    <search-input v-model="search.value" />
    <filled-button @click="addUser">{{ $t("add") }}</filled-button>
  </div>
  <div class="tabs_content_wrap">
    <div class="list_modifications">
      <bordered-filters :filters="filters" />
      <div class="sorts_wrap">
        <bordered-select
          v-model="sort.value"
          :options="sort.options"
          :prefix="$t('sorting') + ':'"
          dropdownSide="right"
        />
      </div>
    </div>
    <spacing-bordered-table
      class="users_table"
      v-if="this.usersList"
      :titles="table.titles"
      :rows="modifiedUsersList()"
      :actions="table.actions"
      @edit="(userId) => editUser(userId)"
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
  <confirmation-popup ref="deleteConfirmation" :popupSubtitle="popupText" />
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";
import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import FilledPagination from "@/components/paginations/FilledPagination";

import { getUsers, deleteUser, getUserRoles } from "@/data/firebase/users-api";
import BorderedFilters from "@/components/filters/BorderedFilters.vue";

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
      popupText: "",
      search: {
        value: "",
        fields: ["name", "email", "phone"],
      },
      table: {
        titles: [
          { id: "name", name: this.$t("user.fields.name"), width: 28 },
          { id: "roleTitle", name: this.$t("user.fields.role"), width: 18 },
          { id: "phone", name: this.$t("user.fields.phone"), width: 16 },
          { id: "email", name: this.$t("user.fields.email"), width: 20 },
        ],
        actions: ["edit", "delete"],
      },
      sort: {
        options: [
          { id: "default", title: this.$t("default") },
          { id: "email:asc", title: "Посещения (↑)" },
          { id: "email:desc", title: "Посещения (↓)" },
        ],
        value: "default",
      },
      filters: [
        {
          id: "role",
          type: "checkbox",
          title: this.$t("user.fields.role"),
          options: [],
          values: [],
        },
      ],
      pagination: {
        page: 1,
        limit: 5,
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

  methods: {
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
          user.roleTitle = this.rolesList.find(
            (role) => role.id == user.role
          ).title;
        });

        if (this.search.value) {
          const s = this.search;
          users = users.filter((user) => {
            let t = false;
            s.fields.forEach((field) => {
              if (
                user[field] &&
                user[field]
                  .trim()
                  .toLowerCase()
                  .includes(s.value.trim().toLowerCase())
              ) {
                t = true;
                return;
              }
            });
            return t;
          });
        }

        if (this.sort.value !== "default") {
          const value = this.sort.value.split(":")[0];
          const direction = this.sort.value.split(":")[1];
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

    async initData() {
      await getUsers(this.filters)
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
      this.rolesList.forEach((role) => {
        this.filters
          .find((filter) => filter.id == "role")
          .options.push({ id: role.id, title: role.title });
      });
    },

    addUser() {
      this.$router.push({ name: "userAdd" });
    },

    editUser(userId) {
      this.$router.push({ name: "userEdit", params: { id: userId } });
    },

    async deleteUser(user) {
      this.popupText = "Удалить пользователя: " + user.name + "?";
      const popupResult = await this.$refs.deleteConfirmation.open();
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
