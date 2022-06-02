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
        { id: "bookings", title: this.$t("booking.nav") },
        { id: "statuses", title: this.$t("bookingStatus.nav") },
      ],
    };
  },
  components: {
    TabsLayout,
  },
};
</script>
