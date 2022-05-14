<template>
  <tabs-layout :tabs="tabs">
    <router-view />
  </tabs-layout>
</template>

<script>
import TabsLayout from "@/layouts/TabsLayout";

export default {
  data() {
    return {
      tabs: [
        { id: "users", title: this.$t("user.nav") },
        { id: "roles", title: this.$t("role.nav") },
      ],
    };
  },
  components: {
    TabsLayout,
  },
};
</script>
