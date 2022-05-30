<template>
  <div class="gallery_wrap">
    <div class="gallery_list">
      <div class="gallery_img_wrap" v-for="img in items" :key="img">
        <img
          :src="typeof img == 'string' ? img : getUrl(img)"
          class="gallery_img"
        />
        <div class="img_delete" @click="deleteImage(img)">
          {{ $t("delete") }}
        </div>
      </div>
    </div>
    <input
      @change="uploadImage"
      type="file"
      accept="image/*"
      class="gallery_input"
      multiple
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [...this.modelValue],
    };
  },

  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },

  created() {
    this.items.forEach((item) => {
      var img = new Image();
      img.src = item;
      //console.log(item);
    });
  },

  methods: {
    uploadImage(event) {
      const files = event.target.files;
      var allowed_extensions = new Array(
        "image/jpeg",
        "image/png",
        "image/gif"
      );

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          if (allowed_extensions.includes(files[i].type)) {
            //console.log(files[i]);
            this.items.push(files[i]);
            //this.update();
          } //else this.uploadText = "Type error, select again";
        }
      }
    },

    deleteImage(item) {
      let index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      //this.update();
    },

    getUrl(file) {
      return URL.createObjectURL(file);
    },

    update() {
      this.$emit("update:modelValue", this.items);
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery_wrap {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid var(--secondary-color);
  border-radius: 5px;
  padding: 15px 20px 0 20px;
  .gallery_list {
    display: flex;
    .gallery_img_wrap {
      width: 75px;
      height: 75px;
      border-radius: 5px;
      margin-right: 15px;
      margin-bottom: 15px;
      position: relative;
      cursor: pointer;
      &:hover .img_delete {
        opacity: 1;
        visibility: visible;
      }
      .gallery_img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
      }
      .img_delete {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        transition: 0.2s;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba($color: #000000, $alpha: 0.5);
        color: white;
        border-radius: 0 0 5px 5px;
        font-size: 9px;
        @include flex-center;
        padding: 5px;
        cursor: pointer;
        &:hover {
          background: rgba($color: #000000, $alpha: 1);
        }
      }
    }
  }
  .gallery_input {
    margin-bottom: 15px;
  }
}
</style>
