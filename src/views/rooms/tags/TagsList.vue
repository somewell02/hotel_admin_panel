<template>
  <div class="tabs_content_wrap tags_tab_wrap">
    <div class="tags_form_wrap">
      <h2>
        {{ this.isEdit ? $t("roomTag.edit") : $t("roomTag.add") }}
      </h2>
      <tag-form
        v-if="this.tagsList && this.tag"
        v-model="tag"
        ref="tagForm"
        :isEdit="isEdit"
        class="tag_form"
      />
      <div class="tag_form_actions">
        <filled-button v-if="this.isEdit" @click="backToAdd">
          {{ $t("back") }}
        </filled-button>
        <filled-button @click="this.isEdit ? editTag() : addTag()">
          {{ this.isEdit ? $t("save") : $t("add") }}
        </filled-button>
      </div>
    </div>
    <bordered-div class="tags_list_wrap">
      <preloader-spinner ref="preloader" />
      <spacing-bordered-table
        class="tags_table"
        :type="2"
        v-if="tagsList && tagsList.length > 0"
        :titles="table.titles"
        :rows="modifiedTagsList"
        :actions="table.actions"
        @delete="(tag) => deleteTag(tag)"
        @edit="(tag) => pushToEdit(tag)"
      />
      <div v-else class="no_records">{{ $t("noRecords") }}</div>
    </bordered-div>
    <message-alert ref="alert"></message-alert>
    <confirmation-popup ref="deleteConfirmation" />
  </div>
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import TagForm from "@/layouts/dashboard/rooms/TagForm";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";

import {
  subscribeRoomTags,
  addRoomTag,
  deleteRoomTag,
  getRoomTagById,
  updateRoomTag,
} from "@/data/firebase/roomTagsApi";

import { getRoomsByTag } from "@/data/firebase/roomsApi";

import { table } from "./tagConstants";

import { sliceWithEllipsis } from "@/services/methods/string";

export default {
  data() {
    return {
      tagsList: null,
      table: table,
      isEdit: false,
      tag: {},
    };
  },

  components: {
    SpacingBorderedTable,
    TagForm,
    ConfirmationPopup,
  },

  async created() {
    this.resetTag();
    await this.initData();
  },

  computed: {
    modifiedTagsList() {
      let tags = this.tagsList.map((tag) => {
        return {
          ...tag,
        };
      });

      tags.forEach((tag) => {
        tag.shortTitle = sliceWithEllipsis(tag.title, 30);
        tag.shortDesc = sliceWithEllipsis(
          tag.description ? tag.description.join(" ") : "-",
          15
        );
      });

      return tags;
    },
  },

  methods: {
    async initData() {
      await subscribeRoomTags().then((tags) => {
        this.tagsList = tags;
      });

      if (this.$route.params.id) {
        getRoomTagById(this.$route.params.id).then((data) => {
          if (data) {
            this.setTag(data);
          } else {
            this.backToAdd();
          }
        });
      }
    },

    addTag() {
      if (this.$refs.tagForm.validate()) {
        addRoomTag(this.tag)
          .then(() => {
            this.$refs.alert.open("success", this.$t("roomTag.alerts.added"));
          })
          .finally(() => {
            this.resetTag();
          });
      }
    },

    editTag() {
      if (this.$refs.tagForm.validate()) {
        updateRoomTag(this.$route.params.id, this.tag).then(() => {
          this.$refs.alert.open("success", this.$t("roomTag.alerts.updated"));
        });
      }
    },

    deleteTag(tag) {
      getRoomsByTag(tag.id).then(async (data) => {
        if (data.length > 0) {
          this.$refs.alert.open("error", this.$t("roomTag.alerts.roomsExist"));
          return;
        } else {
          const popupResult = await this.$refs.deleteConfirmation.open(
            this.$t("roomTag.delete") +
              ": " +
              sliceWithEllipsis(tag.title, 25) +
              "?"
          );
          if (popupResult) {
            const res = deleteRoomTag(tag.id);
            if (res) {
              this.$refs.alert.open(
                "success",
                this.$t("roomTag.alerts.deleted")
              );
              if (this.isEdit) {
                this.backToAdd();
              }
            }
          }
        }
      });
    },

    pushToEdit(tag) {
      this.setTag(tag);
      this.$router.push({ name: "tagEdit", params: { id: tag.id } });
    },

    backToAdd() {
      this.resetTag();
      this.$router.push({ name: "tags" });
    },

    setTag(tag) {
      this.isEdit = true;
      this.tag.title = tag.title;
      this.tag.description = tag.description;
    },

    resetTag() {
      this.isEdit = false;
      this.tag.title = "";
      this.tag.description = [];
    },
  },

  watch: {
    tagsList(newValue) {
      if (newValue) this.$refs.preloader.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.tags_tab_wrap {
  display: flex;
  align-items: flex-start;
  .tags_form_wrap {
    display: flex;
    flex-direction: column;
    width: calc(35% - 40px);
    margin-right: 40px;
    .tag_form,
    button {
      margin-top: 25px;
    }
    .tag_form_actions {
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
  .tags_list_wrap {
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
