<template>
  <div class="search_input">
    <search-icon class="search_icon" />
    <bordered-input
      type="text"
      placeholder="Поиск"
      :value="modelValue"
      @input="updateInput"
    />
  </div>
</template>

<script>
import SearchIcon from "@/assets/img/icons/SearchIcon.vue";
export default {
  name: "search-input",
  components: { SearchIcon },
  props: {
    modelValue: {
      type: String,
      default: "",
      required: true,
    },
    color: {
      type: String,
      default: "",
      required: false,
    },
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.search_input {
  position: relative;
  input {
    padding-left: 50px;
  }
  .search_icon {
    position: absolute;
    left: 16px;
    top: 32px;
    top: calc(50% - 8px);
    width: 16px;
    height: 16px;
  }
}
</style>
