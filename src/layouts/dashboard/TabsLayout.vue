<template>
  <main class="tabs_wrap">
    <div class="tabs_nav">
      <router-link-underline
        v-for="tab in tabs"
        :key="tab.id"
        :to="{ name: tab.id }"
      >
        {{ tab.title }}
      </router-link-underline>
    </div>
    <slot />
  </main>
</template>

<script>
import RouterLinkUnderline from "@/components/default/buttons/RouterLinkUnderline";

export default {
  components: {
    RouterLinkUnderline,
  },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.tabs_wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .tabs_content_wrap {
    width: 100%;
    margin-top: 30px;
  }
  .actions {
    display: flex;
    & > *:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
