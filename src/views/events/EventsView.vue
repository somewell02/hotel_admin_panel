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
        { id: "events", title: this.$t("event.nav") },
        // { id: "eventTypes", title: this.$t("eventTypes.nav") },
      ],
    };
  },
  components: {
    TabsLayout,
  },
};
</script>
