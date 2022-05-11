<template>
  <main>
    <preloader-spinner ref="preloader" />
    <spacing-bordered-table
      :titles="tableTitles"
      :rows="modifiedUsersList"
      :actions="tableActions"
      @delete="(user) => deleteUser(user)"
    />
    <filled-button @click="add">Add</filled-button>
    <confirmation-popup ref="deleteConfirmation" :popupSubtitle="popupText" />
  </main>
</template>

<script>
import SpacingBorderedTable from "@/components/tables/SpacingBorderedTable";

import { getUsers, addUser, deleteUser } from "@/data/firebase/users-api";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";

export default {
  components: {
    SpacingBorderedTable,
    ConfirmationPopup,
  },

  data() {
    return {
      usersList: null,
      isLoading: true,
      popupText: "",
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
      this.usersList.forEach((user) => {
        user.fullName = user.lastName ? user.lastName + " " : "";
        user.fullName += user.firstName ? user.firstName + " " : "";
        user.fullName += user.patronumic ?? "";
      });
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

<style></style>
