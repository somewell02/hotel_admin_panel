<template>
  <div class="pagination" v-if="length > 1">
    <button
      v-if="labels"
      class="pagination_item prev"
      @click="changePage(modelValue - 1)"
    >
      <arrow-icon /> Предыдущая
    </button>
    <button
      v-for="num in length"
      :key="num"
      @click="changePage(num)"
      class="pagination_item"
      :class="{ active: num === modelValue }"
    >
      {{ num }}
    </button>
    <button
      v-if="labels"
      class="pagination_item next"
      @click="changePage(modelValue + 1)"
    >
      Следующая <arrow-icon />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    length: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
      default: 1,
    },
    labels: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  methods: {
    changePage(num) {
      if (num >= 1 && num <= this.length && num !== this.modelValue) {
        this.$emit("update:modelValue", num);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  .pagination_item {
    @include flex-center;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    color: var(---text-color);
    min-width: 28px;
    height: 28px;
    padding: 7px;
    border-radius: 5px;
    border: none;
    background: none;
    &.prev,
    &.next {
      padding: 7px 12px;
      .icon {
        width: 12px;
        height: 12px;
      }
    }
    &.prev .icon {
      transform: rotate(90deg);
      margin-right: 8px;
    }
    &.next .icon {
      transform: rotate(-90deg);
      margin-left: 8px;
    }
    &:hover:not(.active) {
      outline: 1px solid var(--primary-color);
    }
    &.active {
      background: var(--primary-color);
      color: white;
    }
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
