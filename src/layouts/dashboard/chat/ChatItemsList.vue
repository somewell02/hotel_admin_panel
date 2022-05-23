<template>
  <div class="chats_list">
    <div
      class="chat_item"
      v-for="chat in chats"
      :key="chat.id"
      :class="{ active_chat: chat.id === active }"
      @click="$emit('select', chat)"
    >
      <div class="user_img">
        <img v-if="chat.photoUrl" src="chat.photoUrl" alt="avatar" />
        <default-avatar v-else />
      </div>
      <div class="chat_info_wrap">
        <div class="chat_info">
          <div class="user_name">
            {{ sliceWithEllipsis(chat.name, 20) }}
          </div>
          <div class="recent_message_time">
            {{
              msToYear(chat.recentMessage.sendAt) == msToYear(Date.now())
                ? msToDayMonthLong(chat.recentMessage.sendAt) ==
                  msToDayMonthLong(Date.now())
                  ? msToHourMin(chat.recentMessage.sendAt)
                  : msToDayMonthLong(chat.recentMessage.sendAt)
                : msToDayMonthYearLong(chat.recentMessage.sendAt)
            }}
          </div>
        </div>
        <div class="recent_message">
          {{
            chat.recentMessage.content
              ? sliceWithEllipsis(chat.recentMessage.content, 30)
              : ""
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultAvatar from "@/assets/img/DefaultAvatar";

import {
  msToYear,
  msToHourMin,
  msToDayMonthLong,
  msToDayMonthYearLong,
} from "@/services/methods/datetime";
import { sliceWithEllipsis } from "@/services/methods/string";

export default {
  props: {
    chats: {
      type: Array,
      required: true,
    },
    active: {
      type: String,
      required: false,
    },
  },

  emits: {
    select: null,
  },

  components: {
    DefaultAvatar,
  },

  methods: {
    msToYear,
    msToHourMin,
    msToDayMonthLong,
    msToDayMonthYearLong,
    sliceWithEllipsis,
  },
};
</script>

<style lang="scss" scoped>
.chats_list {
  .chat_item {
    cursor: pointer;
    padding: 15px 20px;
    display: flex;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &:hover,
    &.active_chat {
      background: var(--hover-color);
    }
    .user_img {
      width: 45px;
      height: 45px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50px;
      }
    }
    .chat_info_wrap {
      display: flex;
      flex-grow: 3;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px 0;
      .chat_info {
        @include flex-between;
        .user_name {
          font-size: 14px;
        }
        .recent_message_time {
          font-size: 12px;
          color: var(--secondary-color);
          margin-left: 15px;
        }
      }
      .recent_message {
        font-size: 12px;
        color: var(--secondary-color);
      }
    }
  }
}
</style>
