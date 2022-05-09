<template>
  <div class="users_list">
    <div class="titles">
      <div
        v-for="title in titles"
        :key="title.id"
        :style="{
          width: title.width + '%',
        }"
      >
        {{ title.name }}
      </div>
    </div>
    <div class="rows" v-for="row in rows" :key="row.id">
      <div
        v-for="title in titles"
        :key="title.id"
        :style="{
          width: title.width + '%',
        }"
      >
        {{ row.title.id }}
      </div>
      <!-- <p class="actions">
        <img
          src="../assets/icons/edit.svg"
          alt="edit"
          @click="$router.push(`/user/${user.id}`)"
        />
        <img
          src="../assets/icons/delete.svg"
          alt="delete"
          @click="deleteUser(user.id)"
        />
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      requried: false,
    },
    rows: {
      type: Array,
      requried: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.users_list {
  font-size: 14px;
  font-weight: 400;
  .titles {
    color: var(--secondary-color);
    display: flex;
    padding: 0 20px 15px 20px;
  }
  /*.rows {
    display: flex;
    padding: 15px 20px;
    border-radius: 5px;
    border: 1px solid #ececec;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      img {
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 15px;
        }
      }
    }
  }*/
}
</style>
