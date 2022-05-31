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
        { id: "rooms", title: this.$t("room.nav") },
        { id: "types", title: this.$t("roomType.nav") },
        { id: "tags", title: this.$t("roomTag.nav") },
      ],
    };
  },
  components: {
    TabsLayout,
  },
};
</script>
