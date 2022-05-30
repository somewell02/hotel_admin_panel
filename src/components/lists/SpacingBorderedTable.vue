<template>
  <div class="spacing_bordered_table">
    <div class="titles">
      <div
        v-for="title in titles"
        :key="title.id"
        :style="{
          width: title.width + '%',
        }"
      >
        {{ title.name }}
      </div>
    </div>
    <div class="rows">
      <div
        class="row"
        v-for="row in rows"
        :key="row.id"
        :class="{
          spaced: this.type == 1,
          compressed: this.type == 2,
        }"
      >
        <div
          v-for="title in titles"
          :key="title.id"
          :style="{
            width: title.width + '%',
          }"
          class="column"
        >
          <div
            v-if="!title.type || title.type == 'string'"
            class="content string"
          >
            {{ row[title.id] ? row[title.id] : "-" }}
          </div>
          <div
            v-else-if="row[title.id] && title.type == 'background'"
            class="content"
            :class="{ background: row[title.id] }"
            :style="{
              background: row[title.id].background
                ? `#${row[title.id].background}`
                : 'none',
              color: isDark(row[title.id].background) ? 'white' : 'black',
            }"
          >
            {{ row[title.id] ? row[title.id].title : "-" }}
          </div>
          <div
            v-else-if="row[title.id] && title.type == 'price'"
            class="content string"
          >
            {{ row[title.id] ? row[title.id] + " " + title.unit : "-" }}
          </div>
          <div
            v-else-if="row[title.id] && title.type == 'bool'"
            class="content bool"
          >
            {{ row[title.id] ? $t("yes") : $t("no") }}
          </div>
          <div
            v-else-if="row[title.id] && title.type == 'array'"
            class="content array"
          >
            {{ row[title.id].length > 0 ? row[title.id].join(", ") : "-" }}
          </div>
          <div
            v-else-if="row[title.id] && title.type == 'color'"
            class="content color"
            :style="{
              background: `#${row[title.id]}`,
            }"
          ></div>
          <div
            v-else-if="row[title.id] && title.type == 'image'"
            class="content image"
            :style="{
              background: `url(${row[title.id]})`,
              'background-size': 'cover',
              'background-position': 'center center',
              'background-repeat': 'no-repeat',
            }"
          ></div>
        </div>
        <div class="actions" v-if="actions">
          <eye-icon
            v-if="actions.includes('view')"
            class="action_btn"
            @click="this.$emit('view', row)"
          />
          <edit-icon
            v-if="actions.includes('edit')"
            class="action_btn"
            @click="this.$emit('edit', row)"
          />
          <delete-icon
            v-if="actions.includes('delete')"
            class="action_btn"
            @click="this.$emit('delete', row)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditIcon from "@/assets/img/icons/EditIcon";
import DeleteIcon from "@/assets/img/icons/DeleteIcon";
import EyeIcon from "@/assets/img/icons/EyeIcon";

import { isDark } from "@/services/methods/color";

export default {
  components: {
    EditIcon,
    DeleteIcon,
    EyeIcon,
  },
  props: {
    type: {
      type: Number,
      requried: false,
      default: 1,
    },
    titles: {
      type: Array,
      requried: false,
    },
    actions: {
      type: Array,
      requried: false,
    },
    rows: {
      type: Array,
      requried: true,
    },
  },

  emits: {
    view: null,
    edit: null,
    delete: null,
  },

  methods: {
    isDark(color) {
      return isDark(color);
    },
  },
};
</script>

<style lang="scss" scoped>
.spacing_bordered_table {
  font-size: 14px;
  font-weight: 400;
  .titles {
    color: var(--secondary-color);
    display: flex;
    padding: 0 20px 15px 20px;
  }
  .row {
    display: flex;
    padding: 12px 20px;
    min-height: 40px;
    &.spaced {
      border-radius: 5px;
      border: 1px solid var(--border-color);
      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }
    &.compressed:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
    }
    .column {
      padding-right: 15px;
      display: flex;
      .content {
        display: flex;
        align-items: center;
        &.background {
          font-size: 0.8em;
          font-weight: 600;
          line-height: 1;
          padding: 5px 15px;
          border-radius: 5px;
          color: white;
        }
        &.color {
          width: 60px;
          height: 20px;
          border-radius: 5px;
        }
        &.image {
          width: 60px;
          height: 40px;
          border-radius: 5px;
        }
      }
    }
    .actions {
      flex-grow: 3;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .action_btn {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 20px;
        }
        * {
          fill: var(--primary-color);
        }
        svg {
          max-width: 20px;
          max-height: 20px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.action_btn {
  &.icon.fill * {
    fill: var(--primary-color);
  }
  svg {
    max-width: 20px;
    max-height: 20px;
    min-width: 15px;
    min-height: 15px;
  }
}
</style>
