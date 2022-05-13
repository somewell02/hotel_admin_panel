<template>
  <div class="filters_wrap">
    <div class="filters_icon"><filter-icon /></div>
    <bordered-filter-item
      v-for="filter in filters"
      :key="filter.id"
      v-model="filter.values"
      :title="filter.title"
      :options="filter.options"
    />
    <bordered-button class="clear_btn" @click="clearFilters"
      ><reset-icon />Сбросить</bordered-button
    >
  </div>
</template>

<script>
import BorderedFilterItem from "./BorderedFilterItem";
import FilterIcon from "@/assets/img/icons/FilterIcon";
import BorderedButton from "@/components/default/buttons/BorderedButton.vue";
import ResetIcon from "@/assets/img/icons/ResetIcon.vue";

export default {
  props: {
    filters: {
      type: Array,
      requried: true,
    },
  },

  components: {
    BorderedFilterItem,
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
