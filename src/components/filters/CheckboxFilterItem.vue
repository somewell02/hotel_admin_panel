<template>
  <bordered-filter-item-wrap :dropdownSide="dropdownSide" :id="filter.id">
    <template v-slot:title>
      <div class="title_text" :class="{ selected: this.modelValue.length > 0 }">
        {{ filterTitle }}
      </div>
    </template>
    <template v-slot:options>
      <div class="options">
        <button
          class="option_item"
          v-for="option in filter.options"
          :key="option.id"
          @click="selectOption(option)"
        >
          <div class="checkbox">
            <check-icon v-if="this.modelValue.includes(option.id)" />
          </div>
          {{ option.title }}
        </button>
      </div>
    </template>
  </bordered-filter-item-wrap>
</template>

<script>
import CheckIcon from "@/assets/img/icons/CheckIcon";
import BorderedFilterItemWrap from "./BorderedFilterItemWrap";

export default {
  data() {
    return {
      values: this.modelValue,
    };
  },
  components: {
    CheckIcon,
    BorderedFilterItemWrap,
  },

  props: {
    filter: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
    dropdownSide: {
      type: String,
      required: false,
      default: "left",
    },
  },

  computed: {
    filterTitle() {
      if (this.filter.title) {
        if (this.modelValue.length > 0) {
          return this.filter.title + " (" + this.modelValue.length + ")";
        } else return this.filter.title;
      } else return "Фильтр";
    },
  },

  methods: {
    selectOption(option) {
      let arr = this.modelValue;
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
.title_text {
  pointer-events: none;
  &.selected {
    color: var(--primary-color);
    font-weight: 500;
  }
}
.option_item {
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
    background: var(--hover-color);
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
</style>
