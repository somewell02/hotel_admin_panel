<template>
  <div class="image_card_list">
    <div class="card_item" v-for="item in list" :key="item.id">
      <div class="img_wrap">
        <img v-if="item.image" :src="item.image" alt="img" />
        <default-photo v-else />
        <div class="info_side left_info">
          <div
            v-for="info in structure.imgInfo.left"
            :key="info.id"
            class="info_item_wrap"
          >
            <div
              class="info_item"
              v-if="item[info.id]"
              :style="{
                background: item[info.id].background
                  ? `#${item[info.id].background}`
                  : 'none',
                color: isDark(item[info.id].background) ? 'white' : 'black',
              }"
            >
              {{ item[info.id].title }}
            </div>
          </div>
        </div>
        <div class="info_side right_info">
          <div
            v-for="info in structure.imgInfo.right"
            :key="info.id"
            class="info_item_wrap"
          >
            <div
              class="info_item"
              v-if="item[info.id]"
              :style="{
                background: item[info.id].background
                  ? `#${item[info.id].background}`
                  : 'none',
                color: isDark(item[info.id].background) ? 'white' : 'black',
              }"
            >
              {{ item[info.id].title }}
            </div>
          </div>
        </div>
      </div>
      <div class="info_wrap">
        <div class="info_side left_info">
          <div
            v-for="info in structure.info.left"
            :key="info.id"
            class="info_item"
            :class="info.type ?? 'string'"
          >
            <template v-if="!info.type || info.type === 'title'">
              {{ item[info.id] }}
            </template>
          </div>
        </div>
        <div class="info_side right_info">
          <div
            v-for="info in structure.info.right"
            :key="info.id"
            class="info_item"
            :class="info.type ?? 'string'"
          >
            <template v-if="!info.type">
              {{ item[info.id] }}
            </template>
            <template v-else-if="info.type === 'price'">
              {{ item[info.id] + " " + info.unit }}
            </template>
            <template v-else-if="info.type === 'rating'">
              <stars-rating :rating="item[info.id]" />
            </template>
          </div>
        </div>
      </div>
      <div class="card_actions">
        <filled-button
          v-if="
            structure.actions.includes('view') ||
            (structure.actions.includes('edit') &&
              !$store.getters['user/includesUpdate'])
          "
          @click="this.$emit('view', item)"
        >
          {{ $t("view") }}
        </filled-button>
        <filled-button
          v-if="
            structure.actions.includes('edit') &&
            $store.getters['user/includesUpdate']
          "
          @click="this.$emit('edit', item)"
        >
          {{ $t("edit") }}
        </filled-button>
        <filled-button
          v-if="
            structure.actions.includes('delete') &&
            $store.getters['user/includesDelete']
          "
          @click="this.$emit('delete', item)"
          color="secondary"
        >
          {{ $t("delete") }}
        </filled-button>
      </div>
    </div>
  </div>
</template>

<script>
import StarsRating from "@/components/other/StarsRating.vue";
import DefaultPhoto from "@/assets/img/DefaultPhoto";

import { isDark } from "@/services/methods/color";

export default {
  components: {
    StarsRating,
    DefaultPhoto,
  },
  props: {
    type: {
      type: Number,
      required: false,
      default: 1,
    },
    structure: {
      type: Object,
      required: false,
    },
    actions: {
      type: Array,
      required: false,
    },
    list: {
      type: Array,
      required: true,
    },
  },

  methods: {
    isDark(color) {
      return isDark(color);
    },
  },
};
</script>

<style lang="scss" scoped>
.image_card_list {
  display: flex;
  flex-wrap: wrap;
  .card_item {
    display: flex;
    flex-direction: column;
    width: calc((100% - 90px) / 4);
    border-radius: 5px;
    &:not(:nth-child(4n)) {
      margin-right: 30px;
    }
    &:nth-child(n + 5) {
      margin-top: 30px;
    }
    .img_wrap {
      display: flex;
      position: relative;
      border-radius: 5px 5px 0 0;
      width: 100%;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px 5px 0 0;
      }
      .info_side {
        position: absolute;
        top: 15px;
        display: flex;
        flex-direction: column;
        &.left_info {
          left: 15px;
        }
        &.right_info {
          right: 15px;
        }
        .info_item_wrap {
          display: flex;
          &:not(:last-child) {
            margin-bottom: 8px;
          }
          .info_item {
            @include flex-center;
            width: 100%;
            min-width: 60px;
            padding: 3px 10px;
            font-size: 9px;
            font-weight: 500;
            border-radius: 4px;
          }
        }
      }
    }
    .info_wrap {
      display: flex;
      width: 100%;
      flex-grow: 3;
      justify-content: space-between;
      padding: 20px 15px;
      border: solid var(--border-color);
      border-width: 0 1px 0 1px;
      .right_info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex: 0 0 auto;
        margin-left: 20px;
      }
      .info_side {
        font-size: 14px;
        & > *:not(:last-child) {
          margin-bottom: 7px;
        }
        .title {
          font-weight: 500;
          line-height: 1.3;
        }
        .price {
          font-size: 12px;
          line-height: 1;
          font-weight: 500;
        }
      }
    }
    .card_actions {
      display: flex;
      button {
        flex: 1 1;
        height: 30px;
        font-size: 12px;
        padding: 5px 8px;
        border-radius: 0;
        &:first-child {
          border-bottom-left-radius: 5px;
        }
        &:last-child {
          border-bottom-right-radius: 5px;
        }
      }
    }
  }
}
</style>
