<template>
  <dashboard-layout>
    <preloader-spinner v-if="isLoading" ref="preloader" />
    <spacing-bordered-table
      v-else
      :titles="tableTitles"
      :rows="modifiedUsersList"
      :actions="tableActions"
      @delete="(id) => deleteUser(id)"
    />
    <filled-button @click="add">Add</filled-button>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout.vue";
import SpacingBorderedTable from "@/components/layouts/tables/SpacingBorderedTable.vue";

import { getUsers, addUser, deleteUser } from "@/data/firebase/users-api";

export default {
  components: {
    DashboardLayout,
    SpacingBorderedTable,
  },

  data() {
    return {
      usersList: null,
      isLoading: true,
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
    deleteUser(id) {
      deleteUser(id);
    },
  },
};
</script>

<style></style>
