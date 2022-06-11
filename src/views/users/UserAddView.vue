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
      <user-form ref="userAddForm" v-model="user" :isAdd="true" />
    </div>
    <message-alert ref="alert"></message-alert>
  </main>
</template>

<script>
import UserForm from "@/layouts/dashboard/users/UserForm";
import { addUser } from "@/data/firebase/usersApi";

export default {
  data() {
    return {
      user: {
        role: "guest",
        name: "",
        email: "",
        phone: "",
        photoUrl: "",
        isNotifications: true,
      },
    };
  },

  components: {
    UserForm,
  },

  methods: {
    addUser() {
      if (this.$refs.userAddForm.validate()) {
        addUser(this.user).then((user) => {
          if (user) {
            this.$router.push({
              name: "userEdit",
              params: {
                id: user.id,
                messageType: "success",
                messageText: this.$t("user.alerts.added"),
              },
            });
          }
        });
      }
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
