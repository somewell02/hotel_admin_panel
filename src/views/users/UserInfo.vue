<template>
  <div class="user_info_wrap">
    <div class="user_edit_header">
      <filled-button @click="editUser"> {{ $t("save") }} </filled-button>
    </div>
    <div class="user_edit_main user_edit_form" v-if="user">
      <div class="form_block">
        <h2>Должность</h2>
        <div class="form_block_inputs column_3">
          <bordered-select v-model="user.role" :options="roles" />
        </div>
      </div>
      <div class="form_block">
        <h2>Личная информация</h2>
        <div class="form_block_inputs column_3">
          <text-input v-model="user.name" placeholder="ФИО" />
        </div>
      </div>
      <div class="form_block">
        <h2>Контактные данные</h2>
        <div class="form_block_inputs column_3">
          <text-input v-model="user.phone" placeholder="Телефон" />
          <text-input v-model="user.email" placeholder="Email" />
        </div>
      </div>
    </div>
    <message-popup type="success" ref="message">
      Пользователь успешно обновлен
    </message-popup>
  </div>
</template>

<script>
import {
  getUserRoles,
  getUserById,
  updateUser,
} from "@/data/firebase/users-api";

import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import MessagePopup from "@/components/popups/MessagePopup.vue";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      user: null,
      roles: null,
    };
  },

  components: {
    BorderedSelect,
    MessagePopup,
  },

  async created() {
    await this.initData();
  },

  methods: {
    async initData() {
      await getUserRoles().then((roles) => {
        this.roles = roles;
      });
      await getUserById(this.userId)
        .then((data) => {
          this.user = data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    editUser() {
      const res = updateUser(this.userId, this.user);
      if (res) {
        this.$refs.message.open();
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
    padding-top: 20px;
    height: calc(100vh - 190px);
    overflow-y: auto;
    @include custom-scroll;
    &.user_edit_form {
      .form_block {
        &:not(:first-child) {
          margin-top: 40px;
        }
        .form_block_inputs {
          margin-top: 20px;
          display: flex;
          &.column_3 > * {
            flex: 0 0 calc((100% - 40px) / 3);
            &:not(:last-child) {
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
