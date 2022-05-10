<template>
  <center-layout class="auth_page_wrap">
    <bordered-div class="auth_container container">
      <main-logo class="main_logo" />
      <h1>Авторизация</h1>
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
        <filled-button @click="auth"> Войти </filled-button>
        <div v-if="error" class="error_message">Неверный логин или пароль</div>
      </div>
    </bordered-div>
  </center-layout>
</template>

<script>
import CenterLayout from "@/components/layouts/CenterLayout.vue";
import { getAuth } from "@/data/firebase/auth";

export default {
  data() {
    return {
      login: "",
      password: "",
      error: false,
    };
  },

  components: {
    CenterLayout,
  },

  methods: {
    async auth() {
      const user = await getAuth(this.login, this.password);
      if (user === true) {
        // localStorage.setItem("isAuth", true);
        // this.$router.push("/dashboard");
        this.errer = false;
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/scss/breakpoints";

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
