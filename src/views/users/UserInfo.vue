<template>
  <div class="user_info_wrap">
    <div class="user_edit_header">
      <filled-button> {{ $t("save") }} </filled-button>
    </div>
    <div class="user_edit_main"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.user_info_wrap {
  .user_edit_header {
    display: flex;
    justify-content: flex-end;
  }
  .user_edit_main {
    margin-top: 30px;
    padding-top: 20px;
    height: calc(100vh - 190px);
    @include custom-scroll;
  }
}
</style>
