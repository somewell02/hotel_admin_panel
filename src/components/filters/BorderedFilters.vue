<template>
  <div class="filters_wrap">
    <div class="filters_icon"><filter-icon /></div>
    <div class="filter_item_wrap" v-for="filter in filters" :key="filter.id">
      <checkbox-filter-item
        v-if="filter.type == 'checkbox'"
        v-model="filter.values"
        :filter="filter"
      />
    </div>
    <bordered-button class="clear_btn" @click="clearFilters">
      <reset-icon /> {{ $t("reset") }}
    </bordered-button>
  </div>
</template>

<script>
import CheckboxFilterItem from "./CheckboxFilterItem";
import FilterIcon from "@/assets/img/icons/FilterIcon";
import BorderedButton from "@/components/buttons/BorderedButton.vue";
import ResetIcon from "@/assets/img/icons/ResetIcon.vue";

export default {
  props: {
    filters: {
      type: Array,
      requried: true,
    },
  },

  components: {
    CheckboxFilterItem,
    FilterIcon,
    BorderedButton,
    ResetIcon,
  },

  methods: {
    clearFilters() {
      this.filters.forEach((filter) => {
        filter.values = [];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.filters_wrap {
  display: flex;
  z-index: 10;
  .filters_icon {
    height: 40px;
    padding: 12px 20px;
    border-radius: 5px 0 0 5px;
    border: solid var(--border-color);
    border-width: 1px 0 1px 1px;
  }
  .clear_btn {
    @include flex-center;
    border-radius: 0 5px 5px 0;
    &:hover {
      background: none;
    }
    .icon {
      margin-right: 7px;
    }
  }
}
</style>
