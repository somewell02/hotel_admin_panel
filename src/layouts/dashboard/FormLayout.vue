<template>
  <div class="entity_form_wrap">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.entity_form_wrap {
  .form_block {
    &:not(:first-child) {
      margin-top: 40px;
    }
    .form_block_inputs {
      display: flex;
      flex-wrap: wrap;
      .input_item {
        flex-grow: 0;
        flex-shrink: 0;
        margin-top: 20px;
        &.column_1 {
          width: 100%;
        }
        &.column_13 {
          width: calc((100% - 40px) / 3);
        }
        &.column_12 {
          width: calc((100% - 20px) / 2);
        }
        &.column_23 {
          width: calc((100% - 10px) / 3 * 2);
        }
        &.margin {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
