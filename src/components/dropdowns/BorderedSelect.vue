<template>
  <div class="bordered_select">
    <bordered-button
      class="selected_item"
      @click="isActive = !isActive"
      :class="{ active: isActive }"
    >
      {{ prefix ? prefix + " " + selectedTitle.toLowerCase() : selectedTitle }}
      <arrow-icon />
    </bordered-button>
    <div class="options" :class="dropdownSide" v-if="isActive">
      <button
        class="option_item"
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option)"
        :class="{ active: option.id === modelValue }"
      >
        {{ option.title }}
      </button>
    </div>
  </div>
</template>

<script>
import BorderedButton from "@/components/buttons/BorderedButton.vue";

export default {
  data() {
    return {
      isActive: false,
    };
  },

  components: {
    BorderedButton,
  },

  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: false,
    },
    dropdownSide: {
      type: String,
      required: false,
      default: "left",
    },
  },

  computed: {
    selectedTitle() {
      if (this.modelValue && this.options) {
        return this.options.find((option) => option.id === this.modelValue)
          .title;
      } else {
        return "Выберете значение";
      }
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
      if (this.isActive && !e.target.classList.contains("selected_item")) {
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
    max-height: 250px;
    min-width: 100%;
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
  }
}
</style>
