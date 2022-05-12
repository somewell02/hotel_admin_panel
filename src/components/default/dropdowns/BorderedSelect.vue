<template>
  <div class="bordered_select">
    <bordered-button
      class="selected_item"
      @click="isActive = !isActive"
      :class="{
        active: isActive,
      }"
    >
      {{ prefix ? prefix + " " + selectedTitle.toLowerCase() : selectedTitle }}
      <arrow-icon />
    </bordered-button>
    <bordered-div class="options" v-if="isActive">
      <bordered-button
        class="option_item"
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option)"
        :class="{
          active: option.id === modelValue,
        }"
      >
        {{ option.title }}
      </bordered-button>
    </bordered-div>
  </div>
</template>

<script>
import ArrowIcon from "@/assets/img/icons/ArrowIcon";
import BorderedButton from "@/components/default/buttons/BorderedButton.vue";

export default {
  data() {
    return {
      isActive: false,
    };
  },

  components: {
    ArrowIcon,
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

  methods: {
    selectOption(option) {
      this.$emit("update:modelValue", option.id);
      this.isActive = false;
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
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      width: 12px;
      height: 12px;
      margin-left: 15px;
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
    top: calc(100% + 10px);
    left: 0;
    background: white;
    .option_item {
      width: 100%;
      border-radius: 0;
      border-width: 0;
      text-align: left;
      &:not(:first-child) {
        border-width: 1px 0 0 0;
      }
      &:first-child {
        border-radius: 5px 5px 0 0;
      }
      &:last-child {
        border-radius: 0 0 5px 5px;
      }
      &.active {
        background: var(--border-color);
      }
    }
  }
}
</style>
