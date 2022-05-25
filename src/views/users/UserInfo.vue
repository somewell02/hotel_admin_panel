<template>
  <div class="user_info_wrap">
    <div class="user_edit_header">
      <filled-button @click="editUser"> {{ $t("save") }} </filled-button>
    </div>
    <user-form
      class="user_edit_main"
      v-if="user"
      v-model="user"
      ref="userEditForm"
    />
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script>
import { getUserById, updateUser } from "@/data/firebase/usersApi";

import UserForm from "@/layouts/dashboard/users/UserForm";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      user: null,
    };
  },

  components: {
    UserForm,
  },

  async created() {
    await this.initData();
  },

  methods: {
    async initData() {
      await getUserById(this.userId).then((data) => {
        this.user = data;
      });
    },

    editUser() {
      if (this.$refs.userEditForm.validate()) {
        const res = updateUser(this.userId, this.user);
        if (res) {
          this.$refs.alert.open("success", this.$t("user.alerts.updated"));
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user_info_wrap {
  .user_edit_header {
    display: flex;
    justify-content: flex-end;
  }
  .user_edit_main {
    margin-top: 30px;
    padding: 20px 0;
    height: calc(100vh - 190px);
    overflow-y: auto;
    @include custom-scroll;
  }
}
</style>
