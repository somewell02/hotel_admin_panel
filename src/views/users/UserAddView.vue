<template>
  <main class="user_add_wrap">
    <header class="user_add_header">
      <div class="left_actions">
        <filled-button
          color="primary-light"
          @click="$router.push({ name: 'users' })"
        >
          {{ $t("backToList") }}
        </filled-button>
      </div>
      <div class="right_actions">
        <filled-button @click="addUser"> {{ $t("add") }} </filled-button>
      </div>
    </header>
    <div class="user_add_content">
      <user-form v-model="user" />
    </div>
  </main>
</template>

<script>
import UserForm from "@/layouts/dashboard/users/UserForm";
import { addUser } from "@/data/firebase/users-api";

export default {
  data() {
    return {
      user: {
        role: "guest",
        name: "",
        email: "",
        phone: "",
      },
    };
  },

  components: {
    UserForm,
  },

  methods: {
    addUser() {
      addUser(this.user);
    },
  },
};
</script>

<style lang="scss" scoped>
.user_add_wrap {
  .user_add_header {
    @include flex-between;
  }
  .user_add_content {
    margin-top: 50px;
  }
}
</style>
