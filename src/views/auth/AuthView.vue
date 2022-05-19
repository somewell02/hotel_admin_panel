<template>
  <center-layout class="auth_page_wrap">
    <bordered-div class="auth_container container">
      <main-logo class="main_logo" />
      <h1>{{ $t("auth.title") }}</h1>
      <div class="auth_form">
        <text-input
          v-model="login"
          name="login"
          id="login"
          placeholder="Login"
        />
        <password-input
          v-model="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <filled-button @click="auth"> {{ $t("auth.login") }} </filled-button>
      </div>
    </bordered-div>
    <message-alert ref="alert"></message-alert>
  </center-layout>
</template>

<script>
import CenterLayout from "@/layouts/CenterLayout.vue";
import PasswordInput from "@/components/inputs/PasswordInput.vue";

import { getAuth } from "@/data/firebase/auth";

export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },

  components: {
    CenterLayout,
    PasswordInput,
  },

  methods: {
    async auth() {
      if (!this.login || !this.password) {
        this.$refs.alert.open("error", this.$t("auth.errors.emptyFields"));
      } else {
        const res = await getAuth(this.login, this.password);
        if (res === "auth/invalid-email") {
          this.$refs.alert.open("error", this.$t("auth.errors.invalidEmail"));
        } else if (res === "auth/user-not-found") {
          this.$refs.alert.open("error", this.$t("auth.errors.userNotFound"));
        } else if (res === "auth/wrong-password") {
          this.$refs.alert.open("error", this.$t("auth.errors.wrongPassword"));
        } else if (res === "no-access") {
          this.$refs.alert.open("error", this.$t("auth.errors.noAccess"));
        } else if (res == "access") {
          this.$router.push({ name: "dashboard" });
        } else {
          this.$refs.alert.open("error", this.$t("auth.errors.authError"));
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth_container {
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 520px;
  @include media-sm {
    padding: 60px 30px;
  }
  @include media-xs {
    padding: 60px 20px;
  }
  .main_logo {
    margin-bottom: 40px;
  }
  h1 {
    font-size: 28px;
    font-weight: 400;
  }
  .auth_form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
    input {
      margin-bottom: 20px;
    }
    .error_message {
      color: red;
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
</style>
