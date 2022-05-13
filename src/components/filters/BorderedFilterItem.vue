<template>
  <div class="filter_item">
    <bordered-button
      class="filter_title"
      @click="isOpen = !isOpen"
      :class="{
        active: isOpen,
        selected: this.modelValue.length > 0,
      }"
    >
      {{ filterTitle }}
      <arrow-icon />
    </bordered-button>
    <bordered-div class="options" :class="dropdownSide" v-if="isOpen">
      <button
        class="option_item"
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option)"
        :class="{ active: option.id === modelValue }"
      >
        <div class="checkbox">
          <check-icon v-if="this.modelValue.includes(option.id)" />
        </div>
        {{ option.title }}
      </button>
    </bordered-div>
  </div>
</template>

<script>
import BorderedButton from "@/components/default/buttons/BorderedButton.vue";
import CheckIcon from "@/assets/img/icons/CheckIcon";

export default {
  data() {
    return {
      isOpen: false,
    };
  },

  components: {
    BorderedButton,
    CheckIcon,
  },

  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
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
      if (this.title) {
        if (this.modelValue.length > 0) {
          return this.title + " (" + this.modelValue.length + ")";
        } else return this.title;
      } else return "Фильтр";
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
      let arr = this.modelValue;
      if (this.modelValue.includes(option.id)) {
        let index = arr.indexOf(option.id);
        if (index !== -1) arr.splice(index, 1);
      } else {
        arr.push(option.id);
      }
      this.$emit("update:modelValue", arr);
    },

    handleMouseClick(e) {
      if (
        this.isOpen &&
        !e.target.classList.contains("filter_title") &&
        !e.target.classList.contains("option_item")
      ) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.filter_item {
  position: relative;
  min-width: 150px;
  .filter_title {
    width: 100%;
    @include flex-between;
    border-radius: 0;
    border-width: 1px 0 1px 1px;
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
    &.selected {
      color: var(--primary-color);
      font-weight: 500;
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
    min-width: 100%;
    width: max-content;
    max-width: 200px;
    max-height: 250px;
    overflow-y: auto;
    @include custom-scroll;
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
}
</style>
