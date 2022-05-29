<template>
  <div class="gallery_wrap">
    <div class="gallery_list">
      <img :src="modelValue[0]" alt="img" id="img" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    //console.log(document.querySelector("#img"));
  },

  methods: {
    update() {
      this.$emit("update:modelValue", this.items);
    },
  },
};
</script>

<style lang="scss" scoped></style>
