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
        { id: "rents", title: this.$t("rent.nav") },
        // { id: "rentCategories", title: this.$t("rentCategory.nav") },
      ],
    };
  },
  components: {
    TabsLayout,
  },
};
</script>
