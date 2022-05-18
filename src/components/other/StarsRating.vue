<template>
  <div class="stars">
    <star-icon v-for="index in full" :key="index" class="fill" />
    <star-icon v-if="half" class="half" />
    <star-icon v-for="index in empty" :key="index" />
  </div>
</template>

<script>
import StarIcon from "@/assets/img/icons/StarIcon.vue";

export default {
  components: {
    StarIcon,
  },

  props: {
    rating: {
      type: Number,
      required: true,
    },
  },

  computed: {
    roundedRating() {
      return Math.round(this.rating * 2) / 2;
    },
    full() {
      return Math.floor(this.roundedRating);
    },
    half() {
      return this.roundedRating - Math.floor(this.roundedRating) > 0;
    },
    empty() {
      return Math.floor(5 - this.roundedRating);
    },
  },
};
</script>

<style lang="scss" scoped>
.stars {
  display: flex;
  .star_icon {
    &:not(:last-child) {
      margin-right: 3px;
    }
  }
}
</style>
