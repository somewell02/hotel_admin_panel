<template>
  <div class="iamge_card_list">
    <div class="card_item" v-for="item in list" :key="item.id">
      <div class="img_wrap">
        <img src="@/assets/img/room.png" alt="img" />
      </div>
      <div class="info_wrap">
        <div class="info_item left_info">
          <div
            v-for="info in structure.info.left"
            :key="info.id"
            :class="info.type ?? 'string'"
          >
            <template v-if="!info.type || info.type == 'title'">
              {{ item[info.id] }}
            </template>
          </div>
        </div>
        <div class="info_item right_info">
          <div
            v-for="info in structure.info.right"
            :key="info.id"
            :class="info.type ?? 'string'"
          >
            <template v-if="!info.type">
              {{ item[info.id] }}
            </template>
            <template v-else-if="info.type == 'price'">
              {{ item[info.id] + " " + info.unit }}
            </template>
            <template v-else-if="info.type == 'rating'">
              <star-icon
                v-for="index in item[info.id]"
                :key="index"
                class="fill"
              />
              <star-icon v-for="index in 5 - item[info.id]" :key="index" />
            </template>
          </div>
        </div>
      </div>
      <div class="card_actions">
        <filled-button
          v-if="structure.actions.includes('edit')"
          @click="this.$emit('edit', item)"
        >
          {{ $t("edit") }}
        </filled-button>
        <filled-button
          v-if="structure.actions.includes('delete')"
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
import StarIcon from "@/assets/img/icons/StarIcon.vue";

export default {
  components: { StarIcon },
  props: {
    type: {
      type: Number,
      requried: false,
      default: 1,
    },
    structure: {
      type: Object,
      requried: false,
    },
    actions: {
      type: Array,
      requried: false,
    },
    list: {
      type: Array,
      requried: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.iamge_card_list {
  display: flex;
  flex-wrap: wrap;
  .card_item {
    display: flex;
    flex-direction: column;
    flex: 0 0 calc(25% - 90px);
    border-radius: 5px;
    &:not(:nth-child(4n)) {
      margin-right: 30px;
    }
    .img_wrap {
      display: flex;
      position: relative;
      border-radius: 5px 5px 0 0;
      img {
        border-radius: 5px 5px 0 0;
      }
    }
    .info_wrap {
      display: flex;
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
      .info_item {
        & > *:not(:last-child) {
          margin-bottom: 7px;
        }
        .title {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.3;
        }
        .price {
          font-size: 12px;
          line-height: 1;
          font-weight: 500;
        }
        .rating {
          display: flex;
          .star_icon {
            &:not(:last-child) {
              margin-right: 3px;
            }
          }
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
