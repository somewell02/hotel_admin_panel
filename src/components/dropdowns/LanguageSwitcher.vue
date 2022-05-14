<template>
  <div class="language_switcher">
    <button
      class="current_language"
      @click="isActive = !isActive"
      :class="{ active: isActive }"
    >
      <div class="language_info">
        <component :is="currentLanguage.flag" class="flag" />
        {{ currentLanguage.title }}
      </div>
      <arrow-icon class="arrow" />
    </button>
    <div class="languages" v-if="isActive">
      <div
        class="language_item"
        v-for="language in languages"
        :key="language.id"
        @click="selectLanguage(language)"
      >
        <button v-if="language.id != currentLanguage.id">
          <component :is="language.flag" class="flag" />
          {{ language.title }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import RuFlag from "@/assets/img/flags/RuFlag";
import EnFlag from "@/assets/img/flags/EnFlag";
export default {
  data() {
    return {
      isActive: false,
      currentLanguage: null,
      languages: [
        { id: "ru", title: "Русский", flag: "ru-flag" },
        { id: "en", title: "English", flag: "en-flag" },
      ],
    };
  },

  components: {
    RuFlag,
    EnFlag,
  },

  created() {
    this.getLanguage();
  },

  updated() {
    this.getLanguage();
  },

  mounted() {
    document.addEventListener("click", this.handleMouseClick);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleMouseClick);
  },

  methods: {
    getLanguage() {
      this.languages.forEach((language) => {
        if (language.id === this.$i18n.locale) {
          this.currentLanguage = language;
          return;
        }
      });
    },
    selectLanguage(language) {
      this.$i18n.locale = language.id;
      this.$router.push({
        params: { lang: language.id },
      });
      this.isActive = false;
    },

    handleMouseClick(e) {
      if (this.isActive && !e.target.classList.contains("current_language")) {
        this.isActive = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.language_switcher {
  position: relative;
  min-width: 160px;
  .current_language {
    cursor: pointer;
    width: 100%;
    @include flex-between;
    background: none;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color);
    padding: 0;
    border: 0;
    outline: 0;
    padding: 0 10px;
    .language_info {
      display: flex;
      align-items: center;
      pointer-events: none;
      .flag {
        margin-right: 7px;
      }
    }
    .arrow {
      width: 12px;
      height: 12px;
      margin-left: 15px;
      pointer-events: none;
    }
    &.active {
      .arrow {
        transform: rotate(180deg);
      }
    }
  }
  .languages {
    position: absolute;
    top: 130%;
    top: calc(100% + 7px);
    left: 0;
    background: var(--background-color);
    max-height: 250px;
    min-width: 100%;
    @include custom-scroll;
    z-index: 10;
    border-radius: 5px;
    .language_item {
      width: 100%;
      margin: 0;
      &:last-child {
        border-radius: 0 0 5px 5px;
      }
      &:hover,
      &.active {
        background: var(--border-color);
      }
      button {
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        background: none;
        border: 0;
        outline: 0;
        padding: 10px;
        font-size: 14px;
        color: var(--text-color);
        .flag {
          margin-right: 7px;
        }
      }
    }
  }
}
</style>
