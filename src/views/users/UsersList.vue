<template>
  <preloader-spinner v-if="isLoading" />
  <div class="actions">
    <search-input v-model="search" />
    <filled-button @click="add">{{ $t("add") }}</filled-button>
  </div>
  <div class="tabs_content_wrap">
    <div class="list_modifications">
      <bordered-filters :filters="filters" />
      <div class="sorts_wrap">
        <bordered-select
          v-model="sort.value"
          :options="sort.options"
          prefix="Сортировка:"
          dropdownSide="right"
        />
      </div>
    </div>
    <spacing-bordered-table
      class="users_table"
      :titles="table.titles"
      :rows="usersList"
      :actions="table.actions"
      @edit="(userId) => editUser(userId)"
      @delete="(user) => deleteUser(user)"
    />
    <div class="pagination_wrap">
      <div class="count_title"></div>
      <filled-pagination :length="2" v-model="pagination.page" />
    </div>
  </div>
  <confirmation-popup ref="deleteConfirmation" :popupSubtitle="popupText" />
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";
import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import FilledPagination from "@/components/paginations/FilledPagination";

import {
  getFilteredSortedPaginatedUsers,
  addUser,
  deleteUser,
} from "@/data/firebase/users-api";
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
      isLoading: true,
      popupText: "",
      search: "",
      sort: {
        options: [
          { id: "default", title: "По умолчанию" },
          { id: "email:asc", title: "Посещения (↑)" },
          { id: "email:desc", title: "Посещения (↓)" },
        ],
        value: "default",
      },
      filters: [
        {
          id: "role",
          type: "checkbox",
          title: "Должность",
          options: [
            { id: "admin", title: "Администратор" },
            { id: "guest", title: "Гость" },
          ],
          values: [],
        },
      ],
      pagination: {
        page: 1,
        limit: 2,
      },
    };
  },

  created() {
    this.getUsers();
  },

  watch: {
    // usersList(v) {
    //   console.log("list change: " + this.msToDate(Date.now()));
    //   console.log(v);
    // },
    filters: {
      handler() {
        this.getUsers();
      },
      deep: true,
    },
    sort: {
      handler() {
        this.getUsers();
      },
      deep: true,
    },
    search() {
      this.getUsers();
    },
  },

  computed: {
    table() {
      return {
        titles: [
          { id: "name", name: "ФИО", width: 28 },
          { id: "role", name: "Должность", width: 18 },
          { id: "phone", name: "Телефон", width: 16 },
          { id: "email", name: "Email", width: 20 },
        ],
        actions: ["edit", "delete"],
      };
    },

    // modifiedUsersList() {
    //   if (this.usersList) {
    //     this.usersList.forEach((user) => {
    //       user.fullName = user.lastName ? user.lastName + " " : "";
    //       user.fullName += user.firstName ? user.firstName + " " : "";
    //       user.fullName += user.patronumic ?? "";
    //     });
    //   }
    //   return this.usersList;
    // },
  },

  methods: {
    getUsers() {
      //console.log("create: " + this.msToDate(Date.now()));
      getFilteredSortedPaginatedUsers(
        this.search,
        this.filters,
        this.sort,
        this.pagination
      )
        .then((data) => {
          this.usersList = data;
          //console.log("get data: " + this.msToDate(Date.now()));
          //console.log(data);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    add() {
      addUser("firstName", "lastName", "patronumic", "guest", "phone", "email");
    },
    editUser(userId) {
      this.$router.push({ name: "userEdit", params: { id: userId } });
    },
    async deleteUser(user) {
      this.popupText = "Удалить пользователя: " + user.fullName + "?";
      const popupResult = await this.$refs.deleteConfirmation.open();
      if (popupResult) {
        deleteUser(user.id);
      }
    },

    msToDate(ms) {
      var date = new Date(ms);
      var options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };

      var result = date.toLocaleDateString("ru", options);

      return result.toString();
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
