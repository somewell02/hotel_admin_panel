<template>
  <div class="filter_item">
    <bordered-button
      class="filter_title"
      @click="isOpen = !isOpen"
      :class="titleClass"
    >
      <slot class="text" name="title" />
      <arrow-icon />
    </bordered-button>
    <bordered-div class="options_wrap" :class="dropdownSide" v-if="isOpen">
      <slot name="options" />
    </bordered-div>
  </div>
</template>

<script>
import BorderedButton from "@/components/default/buttons/BorderedButton.vue";

export default {
  data() {
    return {
      isOpen: false,
    };
  },

  components: {
    BorderedButton,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    dropdownSide: {
      type: String,
      required: false,
      default: "left",
    },
  },

  mounted() {
    document.addEventListener("click", this.handleMouseClick);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleMouseClick);
  },

  computed: {
    titleClass() {
      return this.isOpen
        ? "active filter_title_" + this.id
        : "filter_title_" + this.id;
    },
  },

  methods: {
    handleMouseClick(e) {
      if (
        this.isOpen &&
        !e.target.classList.contains("filter_title_" + this.id) &&
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
  }
  .options_wrap {
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
  }
}
</style>
