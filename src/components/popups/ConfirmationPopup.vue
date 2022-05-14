<template>
  <popup-wrap v-model="isOpen">
    <h5>{{ popupTitle ?? $t("popups.confirmation.title") }}</h5>
    <div class="subtitle" v-if="popupSubtitle">{{ popupSubtitle }}</div>
    <div class="actions">
      <filled-button @click="close">
        {{ cancelText ?? $t("popups.confirmation.cancel") }}
      </filled-button>
      <filled-button @click="confirm">
        {{ okText ?? $t("popups.confirmation.ok") }}
      </filled-button>
    </div>
  </popup-wrap>
</template>

<script>
import PopupWrap from "./PopupWrap.vue";
export default {
  components: { PopupWrap },
  name: "confirmation-popup",

  data() {
    return {
      isOpen: false,
    };
  },

  props: {
    popupTitle: {
      type: String,
      required: false,
    },
    popupSubtitle: {
      type: String,
      required: false,
    },
    cancelText: {
      type: String,
      required: false,
    },
    okText: {
      type: String,
      required: false,
    },
  },

  popupController: null,

  methods: {
    open() {
      let resolve;
      let reject;
      const popupPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });

      this.$options.popupController = { resolve, reject };
      this.isOpen = true;

      return popupPromise;
    },

    confirm() {
      this.$options.popupController.resolve(true);
      this.isOpen = false;
    },

    close() {
      this.$options.popupController.resolve(false);
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
h5 {
  font-size: 20px;
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
  max-width: 400px;
}
.subtitle {
  font-size: 16px;
  line-height: 1.5;
  margin-top: 10px;
  text-align: center;
  max-width: 400px;
}
.actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 25px;
  button {
    width: 48%;
  }
}
</style>
