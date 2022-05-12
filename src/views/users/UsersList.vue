<template>
  <preloader-spinner v-if="isLoading" ref="preloader" />
  <div class="actions">
    <search-input v-model="search" />
    <filled-button @click="add">Добавить</filled-button>
  </div>
  <div class="tabs_content_wrap">
    <div class="list_modifications">
      <div class="filters_wrap"></div>
      <div class="sorts_wrap">
        <bordered-select
          v-model="sortId"
          :options="sortOptions"
          prefix="Сортировка:"
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
      <filled-pagination :length="5" v-model="page" />
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

export default {
  components: {
    SpacingBorderedTable,
    ConfirmationPopup,
    BorderedSelect,
    FilledPagination,
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
  margin-bottom: 30px;
  @include flex-between;
}
.pagination_wrap {
  margin-top: 30px;
  @include flex-between;
}
</style>
