<template>
  <main class="chat_wrap">
    <div class="chat_aside">
      <nav class="chat_aside_nav">
        <underline-button
          :class="{ 'active-tab': selectedTab === 'processing' }"
          @click="selectTab('processing')"
        >
          {{ $t("chat.tab.processing") }}
        </underline-button>
        <underline-button
          :class="{ 'active-tab': selectedTab === 'active' }"
          @click="selectTab('active')"
        >
          {{ $t("chat.tab.active") }}
        </underline-button>
        <underline-button
          :class="{ 'active-tab': selectedTab === 'all' }"
          @click="selectTab('all')"
        >
          {{ $t("chat.tab.all") }}
        </underline-button>
      </nav>
      <search-input class="chat_search" v-model="search" />
      <div class="chat_tabs_content">
        <preloader-spinner ref="preloader" />
        <chat-items-list
          v-if="modifiedChats"
          :chats="modifiedChats"
          @select="(chat) => selectChat(chat)"
          :active="currentChat ? currentChat.id : ''"
        />
      </div>
    </div>
    <bordered-div class="current_chat_wrap">
      <current-chat
        v-if="currentChat"
        :chat="currentChat"
        @update="(status) => changeStatus(status)"
      />
    </bordered-div>
  </main>
</template>

<script>
import UnderlineButton from "@/components/buttons/UnderlineButton.vue";
import ChatItemsList from "@/layouts/dashboard/chat/ChatItemsList.vue";
import CurrentChat from "@/layouts/dashboard/chat/CurrentChat.vue";
import { getChats } from "@/data/firebase/chatsApi.js";
import { setGetParams, getGetParams } from "@/services/methods/urlGetParams";

export default {
  data() {
    return {
      selectedTab: "processing",
      search: "",
      chats: null,
      currentChat: null,
    };
  },

  components: {
    UnderlineButton,
    ChatItemsList,
    CurrentChat,
  },

  async created() {
    await this.initData();
  },

  computed: {
    modifiedChats() {
      if (this.chats) {
        let chats = this.chats.map((chat) => {
          return {
            ...chat,
          };
        });

        if (this.selectedTab !== "all") {
          chats = chats.filter((chat) => chat.status === this.selectedTab);
        }

        if (this.search) {
          chats = chats.filter((chat) =>
            chat.name
              .trim()
              .toLowerCase()
              .includes(this.search.trim().toLowerCase())
          );
        }

        return chats;
      } else return null;
    },
  },

  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },

    selectChat(chat) {
      this.currentChat = chat;

      const params = {
        id: chat.id,
      };
      setGetParams(params);
    },

    changeStatus(status) {
      this.currentChat.status = status;
    },

    initData() {
      getChats().then((data) => {
        this.chats = data;
      });
    },
  },

  watch: {
    chats(newValue, oldValue) {
      if (oldValue && oldValue.length == 0 && newValue.length > 0)
        this.$refs.preloader.hide();

      const windowData = getGetParams();
      if (windowData["id"]) {
        this.currentChat = this.chats.find(
          (chat) => chat.id == windowData["id"]
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chat_wrap {
  display: flex;
  .chat_aside {
    max-width: 345px;
    flex-shrink: 0;
    .chat_search {
      margin-top: 20px;
    }
    .chat_tabs_content {
      position: relative;
      height: calc(100vh - 231px);
      @include custom-scroll;
      margin-top: 10px;
    }
  }
  .current_chat_wrap {
    flex-grow: 3;
    margin-left: 30px;
    margin-bottom: 30px;
  }
}
</style>
