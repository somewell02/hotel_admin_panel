<template>
  <transition name="fade">
    <div class="message_wrap" v-if="isShow">
      <div class="message_content" :class="funcType">
        <div class="message_text">
          <div v-if="text">{{ text }}</div>
          <slot v-else />
        </div>
        <close-icon @click="close" />
      </div>
    </div>
  </transition>
</template>

<script>
import CloseIcon from "@/assets/img/icons/CloseIcon";

export default {
  name: "message-alert",
  data() {
    return {
      isShow: false,
      text: "",
      funcType: "",
    };
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "information",
    },
    duration: {
      type: Number,
      required: false,
      default: 10000,
    },
  },

  components: {
    CloseIcon,
  },

  popupController: null,

  methods: {
    open(type, text) {
      let resolve;
      let reject;
      const popupPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });

      this.$options.popupController = { resolve, reject };
      this.funcType = type ?? this.type;
      this.text = text;
      this.isShow = true;

      return popupPromise;
    },

    close() {
      this.isShow = false;
    },
  },

  watch: {
    isShow(v) {
      if (v) {
        setTimeout(() => {
          this.close();
        }, this.duration);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.message_wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 20px 20px 20px;
  @include flex-center;
  pointer-events: none;
  .message_content {
    min-width: 300px;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    display: flex;
    align-items: center;
    pointer-events: auto;
    &.information {
      background: var(--primary-color);
      color: white;
    }
    &.error {
      background: var(--error-color);
      color: white;
    }
    &.success {
      background: var(--success-color);
      color: white;
    }
    .message_text {
      flex-grow: 3;
      text-align: center;
    }
    .icon {
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.message_content {
  .icon.stroke * {
    stroke: white;
  }
}
</style>
