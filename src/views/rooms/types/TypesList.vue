<template>
  <div class="tabs_content_wrap types_tab_wrap">
    <div class="types_form_wrap">
      <h2>
        {{
          this.isEdit
            ? $t("roomType.edit") + ": " + this.type.id
            : $t("roomType.add")
        }}
      </h2>
      <type-form
        v-if="this.typesList && this.type"
        v-model="type"
        ref="typeForm"
        :types="Array.from(this.typesList, (type) => type.id)"
        :isEdit="isEdit"
        class="type_form"
      />
      <div class="type_form_actions">
        <filled-button v-if="this.isEdit" @click="backToAdd">
          {{ $t("back") }}
        </filled-button>
        <filled-button @click="this.isEdit ? editType() : addType()">
          {{ this.isEdit ? $t("save") : $t("add") }}
        </filled-button>
      </div>
    </div>
    <bordered-div class="types_list_wrap">
      <preloader-spinner ref="preloader" />
      <spacing-bordered-table
        class="types_table"
        :type="2"
        v-if="typesList && typesList.length > 0"
        :titles="table.titles"
        :rows="modifiedTypesList"
        :actions="table.actions"
        @delete="(type) => deleteType(type)"
        @edit="(type) => pushToEdit(type)"
      />
      <div v-else class="no_records">{{ $t("noRecords") }}</div>
    </bordered-div>
    <message-alert ref="alert"></message-alert>
    <confirmation-popup ref="deleteConfirmation" />
  </div>
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import TypeForm from "@/layouts/dashboard/rooms/TypeForm";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";

import {
  subscribeRoomTypes,
  addRoomType,
  deleteRoomType,
  getRoomTypeById,
  updateRoomType,
} from "@/data/firebase/roomTypesApi";

import { getRoomsByType } from "@/data/firebase/roomsApi";

import { table } from "./typeConstants";

import { sliceWithEllipsis } from "@/services/methods/string";

export default {
  data() {
    return {
      typesList: null,
      table: table,
      isEdit: false,
      type: {},
    };
  },

  components: {
    SpacingBorderedTable,
    TypeForm,
    ConfirmationPopup,
  },

  async created() {
    this.resetType();
    await this.initData();
  },

  computed: {
    modifiedTypesList() {
      let types = this.typesList.map((type) => {
        return {
          ...type,
        };
      });

      types.forEach((type) => {
        type.shortDesc = sliceWithEllipsis(type.description ?? "-", 15);
      });

      return types;
    },
  },

  methods: {
    async initData() {
      await subscribeRoomTypes().then((types) => {
        this.typesList = types;
      });

      if (this.$route.params.id) {
        getRoomTypeById(this.$route.params.id).then((data) => {
          if (data) {
            this.setType(data);
          } else {
            this.backToAdd();
          }
        });
      }
    },

    addType() {
      if (this.$refs.typeForm.validate()) {
        addRoomType(this.type)
          .then(() => {
            this.$refs.alert.open("success", this.$t("roomType.alerts.added"));
          })
          .finally(() => {
            this.resetType();
          });
      }
    },

    editType() {
      if (this.$refs.typeForm.validate()) {
        updateRoomType(this.type).then(() => {
          this.$refs.alert.open("success", this.$t("roomType.alerts.updated"));
        });
      }
    },

    deleteType(type) {
      getRoomsByType(type.id).then(async (data) => {
        if (data.length > 0) {
          this.$refs.alert.open("error", this.$t("roomType.alerts.roomsExist"));
          return;
        } else {
          const popupResult = await this.$refs.deleteConfirmation.open(
            this.$t("roomType.delete") + ": " + type.id + "?"
          );
          if (popupResult) {
            const res = deleteRoomType(type.id);
            if (res) {
              this.$refs.alert.open(
                "success",
                this.$t("roomType.alerts.deleted")
              );
              if (this.isEdit) {
                this.backToAdd();
              }
            }
          }
        }
      });
    },

    pushToEdit(type) {
      this.setType(type);
      this.$router.push({ name: "typeEdit", params: { id: type.id } });
    },

    backToAdd() {
      this.resetType();
      this.$router.push({ name: "types" });
    },

    setType(type) {
      this.isEdit = true;
      this.type.title = type.title;
      this.type.id = type.id;
      this.type.description = type.description;
      this.type.color = type.color;
    },

    resetType() {
      this.isEdit = false;
      this.type.title = "";
      this.type.id = "";
      this.type.description = [];
      this.type.color = "000000";
    },
  },

  watch: {
    typesList(newValue) {
      if (newValue) this.$refs.preloader.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.types_tab_wrap {
  display: flex;
  align-items: flex-start;
  .types_form_wrap {
    display: flex;
    flex-direction: column;
    width: calc(35% - 40px);
    margin-right: 40px;
    .type_form,
    button {
      margin-top: 25px;
    }
    .type_form_actions {
      @include flex-between;
      width: 100%;
      button {
        flex: 1 1 50%;
        &:not(:last-child) {
          margin-right: 15px;
        }
      }
    }
  }
  .types_list_wrap {
    width: 65%;
    padding-top: 15px;
    position: relative;
    min-height: 70px;
  }
  .no_records {
    padding: 0 20px;
    color: var(--text-color);
    font-size: 14px;
  }
}
</style>
