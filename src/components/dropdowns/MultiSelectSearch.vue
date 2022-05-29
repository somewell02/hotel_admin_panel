<template>
  <div class="multi_select">
    <div class="multi_select_input">
      <div class="selected_item" v-for="item in items" :key="item">
        <button class="close_icon_btn" @click="deleteItem(item)">
          <close-icon />
        </button>
        {{ options.find((i) => i.id === item).title }}
      </div>
      <input
        type="text"
        v-model="search"
        class="list_search"
        :placeholder="placeholder ?? $t('search')"
        @focus="isActive = true"
      />
    </div>
    <div class="options" v-if="isActive">
      <button
        class="option_item"
        v-for="option in midifiedOptions"
        :key="option.id"
        @click="selectItem(option)"
        :class="{ active: option.id === modelValue }"
      >
        {{ option.title }}
      </button>
      <div class="no_records" v-if="midifiedOptions.length == 0">
        {{ noRecords ?? $t("noRecords") }}
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from "@/assets/img/icons/CloseIcon";

export default {
  name: "multi-select-search",
  data() {
    return {
      items: this.modelValue,
      isActive: false,
      search: "",
    };
  },

  components: {
    CloseIcon,
  },

  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    noRecords: {
      type: String,
      required: false,
    },
  },

  computed: {
    midifiedOptions() {
      let options = this.options.map((option) => {
        return {
          ...option,
        };
      });

      options = options.filter((option) => !this.items.includes(option.id));

      if (this.search) {
        options = options.filter((option) =>
          option.title.toLowerCase().includes(this.search.trim().toLowerCase())
        );
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
    deleteItem(item) {
      let index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      this.update();
    },

    selectItem(item) {
      if (!this.items.includes(item.id)) {
        this.items.push(item.id);
        this.search = "";
        this.update();
      }
    },

    update() {
      this.$emit("update:modelValue", this.items);
    },

    handleMouseClick(e) {
      if (this.isActive && !e.target.classList.contains("list_search")) {
        this.isActive = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.multi_select {
  position: relative;
  .multi_select_input {
    border: 1px solid var(--input-color);
    border-radius: 5px;
    padding: 10px 12px;
    @include custom-scroll;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    font-size: 14px;
    height: 100%;
    .selected_item {
      flex: 0 0 auto;
      margin: 5px 8px;
      display: flex;
      align-items: center;
      line-height: 1;
      border: 1px solid var(--primary-color);
      border-radius: 5px;
      padding: 6px 8px;
      .close_icon_btn {
        background: none;
        border: none;
        outline: none;
        padding: 0;
        cursor: pointer;
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }
    }
    .list_search {
      background: none;
      outline: none;
      border: 0;
      margin: 5px 8px;
      padding: 6px 8px;
      min-width: 150px;
    }
  }
  .options {
    position: absolute;
    top: 130%;
    top: calc(100% + 7px);
    left: 0;
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    max-height: 250px;
    width: 100%;
    @include custom-scroll;
    .option_item {
      cursor: pointer;
      width: 100%;
      padding: 10px 20px;
      font-size: 14px;
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
      &:hover,
      &.active {
        background: var(--hover-color);
      }
    }
    .no_records {
      padding: 10px 20px;
      font-size: 14px;
      color: var(--secondary-color);
    }
  }
}
</style>
