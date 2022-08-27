<template>
  <div class="array_with_add_wrap">
    <div class="array_with_add_wrap">
      <div v-for="item in items" :key="item" class="array_with_add_item">
        <button
          class="close_icon_btn"
          @click="deleteItem(item)"
          v-if="!disabled"
        >
          <close-icon />
        </button>
        {{ item }}
      </div>
    </div>
    <div
      class="array_with_add_form"
      :class="{ margin: items.length > 0 }"
      v-if="!disabled"
    >
      <number-input v-if="type == 'number'" v-model="adding" />
      <text-input v-else v-model="adding" />
      <filled-button @click="addItem">
        <close-icon />
      </filled-button>
    </div>
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import FilledButton from "@/components/buttons/FilledButton.vue";
import NumberInput from "@/components/inputs/NumberInput.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import CloseIcon from "@/assets/img/icons/CloseIcon";

export default {
  name: "array-with-add-input",

  components: {
    FilledButton,
    NumberInput,
    TextInput,
    CloseIcon,
  },

  data() {
    return {
      items: [...this.modelValue],
      adding: this.type === "number" ? 0 : "",
    };
  },

  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "string",
    },
    validate: {
      type: Function,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    async addItem() {
      const v = await this.validate(this.adding);
      if (v && !this.items.includes(this.adding)) {
        this.items.push(this.adding);
        this.adding = this.type === "number" ? 0 : "";
        this.update();
      } else {
        this.$refs.alert.open("error", this.$t("room.alerts.numberExists"));
      }
    },

    deleteItem(item) {
      let index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      this.update();
    },

    update() {
      this.$emit("update:modelValue", this.items);
    },
  },
};
</script>

<style lang="scss" scoped>
.array_with_add_wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: 14px;
  .array_with_add_wrap {
    border: 1px solid var(--input-color);
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    .array_with_add_item {
      flex: 0 0 auto;
      margin: 5px 8px;
      display: flex;
      align-items: center;
      line-height: 1;
      border: 1px solid var(--primary-color);
      border-radius: 5px;
      padding: 6px 8px;
      .close_icon_btn {
        background: none;
        border: none;
        outline: none;
        padding: 0;
        cursor: pointer;
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }
    }
  }
  .array_with_add_form {
    display: flex;
    &.margin {
      margin-left: 15px;
    }
    input {
      border-radius: 5px 0 0 5px;
    }
    button {
      min-width: 50px;
      width: 50px;
      border-radius: 0 5px 5px 0;
      display: flex;
      .icon {
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
      }
    }
  }
}
</style>

<style lang="scss">
.array_with_add_form button .icon.stroke * {
  stroke: white;
}
.array_with_add_form button:hover .icon.stroke * {
  stroke: var(--primary-color);
}
</style>
