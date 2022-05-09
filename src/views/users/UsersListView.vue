<template>
  <dashboard-layout>
    <spacing-bordered-table :titles="titles" />
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layouts/DashboardLayout.vue";
import SpacingBorderedTable from "@/components/layouts/tables/SpacingBorderedTable.vue";
export default {
  components: {
    DashboardLayout,
    SpacingBorderedTable,
  },

  data() {
    return {
      titles: [
        {
          id: "full_name",
          name: "ФИО",
          width: 28,
        },
        {
          id: "role",
          name: "Должность",
          width: 18,
        },
        {
          id: "phone",
          name: "Телефон",
          width: 18,
        },
        {
          id: "email",
          name: "Email",
          width: 18,
        },
      ],
    };
  },
};
</script>

<style></style>
