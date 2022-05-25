<template>
  <div class="current_chat" v-if="$store.state.user.user">
    <div class="chat_header">
      <div class="chat_info">
        <div class="avatar">
          <img v-if="chat.photoUrl" :src="chat.photoUrl" alt="avatar" />
          <default-avatar v-else />
        </div>
        <div class="info">
          <div class="name">{{ chat.name }}</div>
          <div class="status">{{ $t("chat.status." + chat.status) }}</div>
        </div>
      </div>
      <div class="chat_actions">
        <div class="default" v-if="chat.status === 'default'">
          <filled-button @click="setProcessingStatus()">
            {{ $t("chat.open") }}
          </filled-button>
        </div>
        <div class="active" v-if="chat.status === 'active'">
          <filled-button @click="setProcessingStatus()">
            {{ $t("chat.open") }}
          </filled-button>
        </div>
        <div class="processing" v-if="chat.status === 'processing'">
          <filled-button @click="setDefaultStatus()">
            {{ $t("chat.complete") }}
          </filled-button>
        </div>
      </div>
    </div>
    <div class="chat_messages" ref="messages">
      <div class="messages_list" v-if="messages">
        <div
          class="message_wrap"
          v-for="(message, index) in messages"
          :key="message.id"
          :class="{
            margin:
              (messages[index + 1] &&
                (messages[index + 1].sendBy != message.sendBy ||
                  msToDayMonthYearLong(messages[index + 1].sendAt) !=
                    msToDayMonthYearLong(message.sendAt))) ||
              !messages[index + 1],
          }"
        >
          <div
            class="time_title"
            v-if="
              !messages[index - 1] ||
              msToDayMonthLong(messages[index - 1].sendAt) !=
                msToDayMonthLong(message.sendAt)
            "
          >
            {{
              msToYear(message.sendAt) == msToYear(Date.now())
                ? msToDayMonthLong(message.sendAt)
                : msToDayMonthYearLong(message.sendAt)
            }}
          </div>
          <div
            class="message"
            :class="{
              client: message.sendBy === chat.id,
              admin: message.sendBy !== chat.id,
              me: message.sendBy === $store.state.user.user.id,
            }"
          >
            <div class="avatar">
              <div
                v-if="
                  (messages[index + 1] &&
                    (messages[index + 1].sendBy != message.sendBy ||
                      msToDayMonthYearLong(messages[index + 1].sendAt) !=
                        msToDayMonthYearLong(message.sendAt))) ||
                  !messages[index + 1]
                "
              >
                <img
                  v-if="message.sendBy === chat.id && chat.photoUrl"
                  :src="chat.photoUrl"
                  alt="avatar"
                />
                <img
                  v-else-if="
                    message.sendBy === $store.state.user.user.id &&
                    $store.state.user.user.photoUrl
                  "
                  :src="$store.state.user.user.photoUrl"
                  alt="avatar"
                />
                <default-avatar v-else />
              </div>
            </div>
            <div class="content_wrap">
              <div
                class="name"
                v-if="
                  message.name &&
                  ((messages[index - 1] &&
                    (messages[index - 1].sendBy != message.sendBy ||
                      msToDayMonthYearLong(messages[index - 1].sendAt) !=
                        msToDayMonthYearLong(message.sendAt))) ||
                    !messages[index - 1])
                "
              >
                {{ message.name }}
              </div>
              <div class="content">
                {{ message.content }}
                <span class="time">{{ msToHourMin(message.sendAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat_form" v-if="chat.status == 'processing'">
      <text-input
        v-model="currentMessage"
        @keydown.enter="sendMessage"
        :placeholder="$t('chat.placeholder')"
      />
      <filled-button @click="sendMessage">
        {{ $t("chat.send") }}
      </filled-button>
    </div>
    <confirmation-popup ref="confirmation" />
  </div>
</template>

<script>
import DefaultAvatar from "@/assets/img/DefaultAvatar";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";

import {
  getChatMessages,
  sendMessage,
  setProcessingStatus,
  setDefaultStatus,
} from "@/data/firebase/chatsApi";

import {
  msToHourMin,
  msToDayMonthLong,
  msToYear,
  msToDayMonthYearLong,
} from "@/services/methods/datetime";

export default {
  data() {
    return {
      messages: null,
      test: "",
      currentMessage: "",
    };
  },

  props: {
    chat: {
      type: Object,
      required: true,
    },
  },

  emits: {
    update: null,
  },

  components: {
    ConfirmationPopup,
    DefaultAvatar,
  },

  created() {
    this.initData();
  },

  updated() {
    const messages = this.$refs.messages;
    messages.scrollTop = messages.scrollHeight;
  },

  methods: {
    initData() {
      getChatMessages(this.chat.id).then((data) => {
        this.messages = data;
      });
    },

    sendMessage() {
      if (this.currentMessage.trim()) {
        const message = {
          content: this.currentMessage.trim(),
          sendAt: Date.now(),
          sendBy: this.$store.state.user.user.id,
          name: this.$store.state.user.user.name,
        };
        sendMessage(this.chat.id, message);
        this.currentMessage = "";
      }
    },

    setProcessingStatus() {
      setProcessingStatus(this.chat.id, this.$store.state.user.user.id);
      this.$emit("update", "processing");
    },

    async setDefaultStatus() {
      const result = await this.$refs.confirmation.open(
        "Вы уверены что закончили обработку заявки?"
      );
      if (result) {
        setDefaultStatus(this.chat.id, this.$store.state.user.user.id);
        this.$emit("update", "default");
      }
    },

    msToHourMin,
    msToDayMonthLong,
    msToYear,
    msToDayMonthYearLong,
  },

  watch: {
    chat() {
      this.initData();
    },
  },
};
</script>

<style lang="scss" scoped>
.current_chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);
  .avatar {
    width: 45px;
    height: 45px;
    & * {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .chat_header {
    @include flex-between;
    border-bottom: 1px solid var(--border-color);
    padding: 15px 20px;
    .chat_info {
      display: flex;
      .info {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px 0;
        .name {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-color);
        }
        .status {
          font-size: 12px;
          color: var(--secondary-color);
        }
      }
    }
  }
  .chat_messages {
    flex-grow: 3;
    padding: 15px 20px;
    height: calc(100% - 146px);
    @include custom-scroll;
    .messages_list {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .message_wrap {
        &:not(:last-child) {
          margin-bottom: 5px;
          &.margin {
            margin-bottom: 15px;
          }
        }
        .time_title {
          @include flex-center;
          font-size: 14px;
          color: var(--secondary-color);
          margin-bottom: 10px;
          margin-top: 5px;
        }
        .message {
          display: flex;
          align-items: flex-end;
          .content_wrap {
            display: flex;
            flex-direction: column;
            max-width: 55%;
            color: var(--text-color);
            .name {
              font-size: 12px;
              font-weight: 500;
              margin: 0 5px 5px 5px;
            }
            .content {
              border-radius: 5px;
              padding: 12px 15px;
              font-size: 14px;
              line-height: 1.5;
              background: var(--background-dark-color);
              .time {
                color: var(--secondary-color);
                margin-left: 10px;
                float: right;
              }
            }
          }
          &.client {
            .avatar {
              margin-right: 10px;
            }
          }
          &.admin {
            flex-direction: row-reverse;
            .avatar {
              margin-left: 10px;
            }
            .content_wrap {
              align-items: flex-end;
            }
            &.me {
              .content {
                background: var(--primary-color);
                color: var(--text-primary-color);
              }
            }
          }
        }
      }
    }
  }
  .chat_form {
    display: flex;
    padding: 15px 20px;
    button {
      margin-left: 15px;
    }
  }
}
</style>
