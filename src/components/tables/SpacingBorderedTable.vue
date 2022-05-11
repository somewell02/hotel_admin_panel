<template>
  <div class="users_list">
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
      <div class="row" v-for="row in rows" :key="row.id">
        <div
          v-for="title in titles"
          :key="title.id"
          :style="{
            width: title.width + '%',
          }"
          class="column"
        >
          <div
            class="content"
            :class="{
              background: row[title.id + 'Background'],
            }"
            :style="{
              background: row[title.id + 'Background'] ?? 'none',
            }"
          >
            {{ row[title.id] }}
          </div>
        </div>
        <div class="actions" v-if="actions">
          <eye-icon
            v-if="actions.includes('view')"
            class="action_btn"
            @click="this.$emit('view', row.id)"
          />
          <edit-icon
            v-if="actions.includes('edit')"
            class="action_btn"
            @click="this.$emit('edit', row.id)"
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
export default {
  props: {
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
};
</script>

<style lang="scss" scoped>
.users_list {
  font-size: 14px;
  font-weight: 400;
  .titles {
    color: var(--secondary-color);
    display: flex;
    padding: 0 20px 15px 20px;
  }
  .row {
    display: flex;
    padding: 15px 20px;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    &:not(:last-child) {
      margin-bottom: 15px;
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
      }
    }
    .actions {
      flex-grow: 3;
      display: flex;
      justify-content: flex-end;
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
