<template>
  <bordered-textarea :color="color" v-model="value" @input="updateInput" />
</template>

<script>
import BorderedTextarea from "./BorderedTextarea.vue";

export default {
  name: "array-textarea",
  components: {
    BorderedTextarea,
  },

  data() {
    return {
      value: this.modelValue.join("\n"),
    };
  },

  props: {
    modelValue: {
      type: Array,
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
      const value = event.target.value.split("\n");
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
