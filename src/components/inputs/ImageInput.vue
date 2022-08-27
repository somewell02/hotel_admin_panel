<template>
  <div class="image_input_wrap">
    <label
      class="image_input"
      :style="{
        width: width,
        height: height,
      }"
    >
      <input @change="uploadImage" type="file" accept="image/*" />
      <img
        v-if="modelValue"
        :src="typeof modelValue == 'string' ? modelValue : getUrl(modelValue)"
        class="image_preview"
        alt="preview"
      />
      <default-photo class="image_preview" v-else />
      <div class="edit">
        <edit-icon />
      </div>
    </label>
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import EditIcon from "@/assets/img/icons/EditIcon.vue";
import DefaultPhoto from "@/assets/img/DefaultPhoto.vue";
export default {
  props: {
    modelValue: {
      type: [String, Object],
      required: true,
    },
    width: {
      type: String,
      default: "100px",
      required: false,
    },
    height: {
      type: String,
      default: "100px",
      required: false,
    },
  },

  components: {
    EditIcon,
    DefaultPhoto,
  },

  methods: {
    uploadImage(event) {
      const file = event.target.files[0];
      let allowed_extensions = ["image/jpeg", "image/png", "image/gif"];

      if (file) {
        if (allowed_extensions.includes(file.type)) {
          this.updateInput(file);
        } else this.$refs.alert.open("error", this.$t("alerts.imageTypeError"));
      }
    },

    getUrl(file) {
      return URL.createObjectURL(file);
    },

    updateInput(file) {
      this.$emit("update:modelValue", file);
    },
  },
};
</script>

<style lang="scss">
.image_input_wrap {
  .image_input {
    display: flex;
    position: relative;
    border-radius: 5px;
    input {
      display: none;
    }
    .image_preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
      cursor: pointer;
    }
    .edit {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba($color: #000000, $alpha: 0.5);
      border-radius: 5px;
      pointer-events: none;
      @include flex-center;
      opacity: 0;
      visibility: hidden;
      transition: 0.1s;
    }
    &:hover .edit {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>

<style lang="scss">
.edit .icon svg * {
  fill: white;
}
</style>
