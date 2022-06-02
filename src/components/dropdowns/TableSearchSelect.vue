<template>
  <div class="bordered_select">
    <bordered-button
      class="selected_item"
      @click="isActive = !isActive"
      :class="{ active: isActive }"
    >
      <spacing-bordered-table
        :type="2"
        v-if="this.modelValue && this.options"
        :titles="table.titles"
        :showTitles="false"
        :actions="[]"
        :rows="selectedTitle"
      />
      <template v-else>{{ selectedTitle }}</template>
      <arrow-icon />
    </bordered-button>
    <div class="options" :class="dropdownSide" v-if="isActive">
      <search-input v-model="search" />
      <spacing-bordered-table
        :type="2"
        v-if="options && options.length > 0"
        :titles="table.titles"
        :actions="table.actions"
        :rows="modifiedOptions"
        :showTitles="false"
        class="options_table"
        @select="(option) => selectOption(option)"
      />
      <div v-else class="no_records">{{ $t("noRecords") }}</div>
    </div>
  </div>
</template>

<script>
import BorderedButton from "@/components/buttons/BorderedButton.vue";
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";

import { search } from "@/services/methods/list.js";

export default {
  name: "table-search-seelct",
  data() {
    return {
      isActive: false,
      search: "",
    };
  },

  components: {
    BorderedButton,
    SpacingBorderedTable,
  },

  props: {
    options: {
      type: Array,
      required: true,
    },
    table: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    dropdownSide: {
      type: String,
      required: false,
      default: "left",
    },
    defaultTitle: {
      type: String,
      required: false,
    },
    searchInfo: {
      type: Object,
      required: false,
    },
  },

  computed: {
    selectedTitle() {
      if (this.modelValue && this.options) {
        return [this.options.find((option) => option.id === this.modelValue)];
      } else {
        return this.defaultTitle ?? this.$t("chooseValue");
      }
    },
    modifiedOptions() {
      let options = this.options.map((user) => {
        return {
          ...user,
        };
      });

      if (options && options.length > 0) {
        if (this.search)
          options = search(options, this.searchInfo, this.search);
      }

      return options;
    },
  },

  mounted() {
    document.addEventListener("click", this.handleMouseClick);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleMouseClick);
  },

  methods: {
    selectOption(option) {
      this.$emit("update:modelValue", option.id);
      this.isActive = false;
    },

    handleMouseClick(e) {
      if (
        this.isActive &&
        !e.target.classList.contains("selected_item") &&
        !e.target.classList.contains("gray")
      ) {
        this.isActive = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bordered_select {
  position: relative;
  min-width: 150px;
  .selected_item {
    width: 100%;
    @include flex-between;
    .icon {
      width: 12px;
      height: 12px;
      margin-left: 15px;
      pointer-events: none;
    }
    &:hover {
      background: none;
    }
    &.active {
      .icon {
        transform: rotate(180deg);
      }
    }
    .spacing_bordered_table {
      pointer-events: none;
      flex-grow: 3;
    }
  }
  .options {
    position: absolute;
    top: 130%;
    top: calc(100% + 7px);
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    min-width: 100%;
    overflow: hidden;
    z-index: 10;
    .options_table {
      max-height: 200px;
      @include custom-scroll;
    }
  }
}
</style>

<style lang="scss">
.bordered_select .options .search_input input {
  border-width: 0 0 1px 0;
  border-radius: 0;
}
</style>
