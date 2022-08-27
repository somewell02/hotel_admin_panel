<template>
  <div class="popup_wrap" v-if="modelValue" @click="close">
    <div class="popup_content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  methods: {
    close() {
      this.$emit("update:modelValue", false);
    },
    handleKeydown(e) {
      if (e.key === "Escape") {
        this.$emit("update:modelValue", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.popup_wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($color: #000000, $alpha: 0.7);
  z-index: 100;
  .popup_content {
    min-width: 350px;
    max-width: 90%;
    padding: 40px;
    border-radius: 5px;
    background: var(--background-color);
  }
}
</style>
