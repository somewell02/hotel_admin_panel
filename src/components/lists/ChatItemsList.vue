<template>
  <div class="chats_list">
    <bordered-div></bordered-div>
  </div>
</template>

<script>
export default {
  props: {
    chats: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
