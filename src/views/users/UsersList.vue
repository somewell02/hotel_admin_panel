<template>
  <preloader-spinner v-if="isLoading" ref="preloader" />
  <div class="actions">
    <search-input v-model="search" />
    <filled-button @click="add">Добавить</filled-button>
  </div>
  <div class="tabs_content_wrap">
    <div class="list_modifications">
      <bordered-filters :filters="filters" />
      <div class="sorts_wrap">
        <bordered-select
          v-model="sortId"
          :options="sortOptions"
          prefix="Сортировка:"
          dropdownSide="right"
        />
      </div>
    </div>
    <spacing-bordered-table
      class="users_table"
      :titles="tableTitles"
      :rows="modifiedUsersList"
      :actions="tableActions"
      @delete="(user) => deleteUser(user)"
    />
    <div class="pagination_wrap">
      <div class="count_title"></div>
      <filled-pagination :length="2" v-model="page" />
    </div>
  </div>
  <confirmation-popup ref="deleteConfirmation" :popupSubtitle="popupText" />
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";
import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import FilledPagination from "@/components/paginations/FilledPagination";

import { getUsers, addUser, deleteUser } from "@/data/firebase/users-api";
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
      sortId: "default",
      page: 1,
      sortOptions: [
        { id: "default", title: "По умолчанию" },
        { id: "visits", title: "Посещения (↑)" },
        { id: "visits-desc", title: "Посещения (↓)" },
      ],
      filters: [
        {
          id: "class",
          title: "Класс",
          options: [
            { id: "premium", title: "Премиум" },
            { id: "standart", title: "Стандарт" },
            { id: "econom", title: "Эконом" },
          ],
          values: [],
        },
        {
          id: "role",
          title: "Должность",
          options: [
            { id: "admin", title: "Администратор" },
            { id: "guest", title: "Гость" },
          ],
          values: [],
        },
      ],
    };
  },

  created() {
    getUsers()
      .then((data) => {
        this.usersList = data;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },

  computed: {
    tableTitles() {
      return [
        { id: "fullName", name: "ФИО", width: 28 },
        { id: "role", name: "Должность", width: 18 },
        { id: "phone", name: "Телефон", width: 16 },
        { id: "email", name: "Email", width: 20 },
      ];
    },

    tableActions() {
      return ["edit", "delete"];
    },

    modifiedUsersList() {
      if (this.usersList) {
        this.usersList.forEach((user) => {
          user.fullName = user.lastName ? user.lastName + " " : "";
          user.fullName += user.firstName ? user.firstName + " " : "";
          user.fullName += user.patronumic ?? "";
        });
      }
      return this.usersList;
    },
  },

  methods: {
    add() {
      addUser("firstName", "lastName", "patronumic", "role", "phone", "email");
    },
    async deleteUser(user) {
      this.popupText = "Удалить пользователя: " + user.fullName + "?";
      const popupResult = await this.$refs.deleteConfirmation.open();
      if (popupResult) {
        deleteUser(user.id);
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
</style>
