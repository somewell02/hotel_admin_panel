<template>
  <bordered-div class="checkbox_list">
    <button
      class="checkbox_item"
      v-for="option in options"
      :key="option.id"
      @click="selectOption(option)"
    >
      <div class="checkbox">
        <check-icon v-if="this.modelValue.includes(option.id)" />
      </div>
      {{ option.title ?? option.id }}
    </button>
  </bordered-div>
</template>

<script>
import CheckIcon from "@/assets/img/icons/CheckIcon";
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  components: {
    CheckIcon,
  },

  methods: {
    selectOption(option) {
      let arr = [...this.modelValue];
      if (this.modelValue.includes(option.id)) {
        let index = arr.indexOf(option.id);
        if (index !== -1) arr.splice(index, 1);
      } else {
        arr.push(option.id);
      }
      this.$emit("update:modelValue", arr);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox_list {
  max-height: 200px;
  overflow-y: auto;
  @include custom-scroll;
  .checkbox_item {
    cursor: pointer;
    display: flex;
    width: 100%;
    padding: 10px 20px;
    font-size: 14px;
    line-height: 1.3;
    margin: 0;
    text-align: left;
    color: var(--text-color);
    border: solid var(--border-color);
    border-width: 0;
    background: none;
    &:not(:first-child) {
      border-width: 1px 0 0 0;
    }
    &:first-child {
      border-radius: 5px 5px 0 0;
    }
    &:last-child {
      border-radius: 0 0 5px 5px;
    }
    &:hover {
      background: var(--border-color);
    }
    .checkbox {
      width: 16px;
      height: 16px;
      border-radius: 5px;
      border: 1px solid var(--secondary-color);
      margin-right: 8px;
      @include flex-center;
      pointer-events: none;
      flex: 0 0 auto;
      .icon {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>
