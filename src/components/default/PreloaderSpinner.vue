<template>
  <div class="preloader">Loading ...</div>
</template>

<script>
export default {
  name: "preloader-spinner",
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
  },
};
</script>

<style></style>
