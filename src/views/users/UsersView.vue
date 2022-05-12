<template>
  <tabs-layout :tabs="tabs">
    <router-view />
  </tabs-layout>
</template>

<script>
import TabsLayout from "@/layouts/dashboard/TabsLayout";

export default {
  data() {
    return {
      tabs: [
        { id: "users", title: "Пользователи" },
        { id: "roles", title: "Должности" },
      ],
    };
  },
  components: {
    TabsLayout,
  },
};
</script>
