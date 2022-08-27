<template>
  <div
    class="switch_wrap"
    @click="disabled ? null : toggle()"
    @keydown.space.prevent="toggle"
  >
    <span class="toggle_background" :class="backgroundStyles">
      {{ modelValue ? $t("yes") : $t("no") }}
    </span>
    <span class="toggle_indicator" :style="indicatorStyles" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    backgroundStyles() {
      return {
        enable: this.modelValue,
        disable: !this.modelValue,
      };
    },
    indicatorStyles() {
      return {
        transform: this.modelValue ? "translateX(34px)" : "translateX(0)",
      };
    },
  },
  methods: {
    toggle() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.switch_wrap {
  display: flex;
  position: relative;
  cursor: pointer;
  width: 60px;
  height: 26px;
  border-radius: 5px;
  &:focus {
    outline: 0;
  }
  .toggle_background {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    transition: background-color 0.4s ease;
    font-size: 11px;
    line-height: 1;
    font-weight: 500;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 8px;
    &.enable {
      background-color: var(--success-color);
      justify-content: flex-start;
    }
    &.disable {
      background-color: #9c9c9c;
      justify-content: flex-end;
    }
  }

  .toggle_indicator {
    position: absolute;
    height: 22px;
    width: 22px;
    left: 2px;
    bottom: 2px;
    background-color: var(--background-color);
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease;
  }
}
</style>
