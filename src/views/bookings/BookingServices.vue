<template>
  <div class="booking_services_wrap">
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookingId: this.$route.params.id,
    };
  },

  components: {},

  async created() {
    await this.initData();
  },

  methods: {
    async initData() {},
  },
};
</script>

<style lang="scss" scoped>
.booking_services_wrap {
  position: relative;
  padding-top: 90px;
  .services_table {
    padding-bottom: 20px;
    height: calc(100vh - 210px);
    @include custom-scroll;
  }
}
</style>
