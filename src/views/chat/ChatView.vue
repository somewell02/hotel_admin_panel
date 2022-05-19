<template>
  <main class="chat_wrap">
    <div class="chat_aside">
      <nav class="chat_aside_nav">
        <underline-button
          :class="{ 'active-tab': selectedTabIndex === 1 }"
          @click="selectTab(1)"
        >
          В обработке
        </underline-button>
        <underline-button
          :class="{ 'active-tab': selectedTabIndex === 2 }"
          @click="selectTab(2)"
        >
          Открытые
        </underline-button>
        <underline-button
          :class="{ 'active-tab': selectedTabIndex === 3 }"
          @click="selectTab(3)"
        >
          Все
        </underline-button>
      </nav>
      <search-input class="chat_search" v-model="search" />
      <div class="chat_tabs_content">
        <div class="chat_tab_item" v-if="selectedTabIndex === 1">qwe1</div>
        <div class="chat_tab_item" v-if="selectedTabIndex === 2">qwe2</div>
        <div class="chat_tab_item" v-if="selectedTabIndex === 3">qwe3</div>
      </div>
    </div>
    <div class="current_chat"></div>
  </main>
</template>

<script>
import UnderlineButton from "@/components/buttons/UnderlineButton.vue";
export default {
  data() {
    return {
      selectedTabIndex: 1,
      search: "",
    };
  },
  components: {
    UnderlineButton,
  },

  methods: {
    selectTab(index) {
      this.selectedTabIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.chat_wrap {
  display: flex;
  .chat_aside {
    .chat_search {
      margin-top: 20px;
    }
    .chat_tabs_content {
      margin-top: 20px;
    }
  }
  .current_chat {
    flex-grow: 3;
  }
}
</style>
