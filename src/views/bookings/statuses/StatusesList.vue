<template>
  <div class="tabs_content_wrap statuses_tab_wrap">
    <div class="statuses_form_wrap">
      <h2>
        {{
          this.isEdit
            ? $t("bookingStatus.edit") + ": " + this.status.id
            : $t("bookingStatus.add")
        }}
      </h2>
      <status-form
        v-if="this.statusesList && this.status"
        v-model="status"
        ref="statusForm"
        :statuses="Array.from(this.statusesList, (status) => status.id)"
        :isEdit="isEdit"
        class="status_form"
      />
      <div class="status_form_actions">
        <filled-button v-if="this.isEdit" @click="backToAdd">
          {{ $t("back") }}
        </filled-button>
        <filled-button @click="this.isEdit ? editStatus() : addStatus()">
          {{ this.isEdit ? $t("save") : $t("add") }}
        </filled-button>
      </div>
    </div>
    <bordered-div class="statuses_list_wrap">
      <preloader-spinner ref="preloader" />
      <spacing-bordered-table
        class="statuses_table"
        :type="2"
        v-if="statusesList && statusesList.length > 0"
        :titles="table.titles"
        :rows="statusesList"
        :actions="table.actions"
        @delete="(status) => deleteStatus(status)"
        @edit="(status) => pushToEdit(status)"
      />
      <div v-else class="no_records">{{ $t("noRecords") }}</div>
    </bordered-div>
    <message-alert ref="alert"></message-alert>
    <confirmation-popup ref="deleteConfirmation" />
  </div>
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import StatusForm from "@/layouts/dashboard/bookings/StatusForm";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";

import {
  subscribeBookingStatuses,
  addBookingStatus,
  deleteBookingStatus,
  getBookingStatusById,
  updateBookingStatus,
} from "@/data/firebase/bookingStatusesApi";

import { getBookingsByStatus } from "@/data/firebase/bookingsApi";

import { table } from "./statusConstants";

export default {
  data() {
    return {
      statusesList: null,
      table: table,
      isEdit: false,
      status: {},
    };
  },

  components: {
    SpacingBorderedTable,
    StatusForm,
    ConfirmationPopup,
  },

  async created() {
    this.resetStatus();
    await this.initData();
  },

  methods: {
    async initData() {
      await subscribeBookingStatuses().then((statuses) => {
        this.statusesList = statuses;
      });

      if (this.$route.params.id) {
        getBookingStatusById(this.$route.params.id).then((data) => {
          if (data) {
            this.setStatus(data);
          } else {
            this.backToAdd();
          }
        });
      }
    },

    addStatus() {
      if (this.$refs.statusForm.validate()) {
        addBookingStatus(this.status)
          .then(() => {
            this.$refs.alert.open(
              "success",
              this.$t("bookingStatus.alerts.added")
            );
          })
          .finally(() => {
            this.resetStatus();
          });
      }
    },

    editStatus() {
      if (this.$refs.statusForm.validate()) {
        updateBookingStatus(this.status).then(() => {
          this.$refs.alert.open(
            "success",
            this.$t("bookingStatus.alerts.updated")
          );
        });
      }
    },

    deleteStatus(status) {
      getBookingsByStatus(status.id).then(async (data) => {
        if (!status.isDeleted) {
          this.$refs.alert.open(
            "error",
            this.$t("bookingStatus.alerts.cannotBeDeleted")
          );
          return;
        } else if (data.length > 0) {
          this.$refs.alert.open(
            "error",
            this.$t("bookingStatus.alerts.bookingsExist")
          );
          return;
        } else {
          const popupResult = await this.$refs.deleteConfirmation.open(
            this.$t("bookingStatus.delete") + ": " + status.id + "?"
          );
          if (popupResult) {
            const res = deleteBookingStatus(status.id);
            if (res) {
              this.$refs.alert.open(
                "success",
                this.$t("bookingStatus.alerts.deleted")
              );
              if (this.isEdit) {
                this.backToAdd();
              }
            }
          }
        }
      });
    },

    pushToEdit(status) {
      this.setStatus(status);
      this.$router.push({ name: "statusEdit", params: { id: status.id } });
    },

    backToAdd() {
      this.resetStatus();
      this.$router.push({ name: "statuses" });
    },

    setStatus(status) {
      this.isEdit = true;
      this.status.title = status.title;
      this.status.id = status.id;
      this.status.color = status.color;
    },

    resetStatus() {
      this.isEdit = false;
      this.status.title = "";
      this.status.id = "";
      this.status.isDeleted = true;
      this.status.color = "000000";
    },
  },

  watch: {
    statusesList(newValue) {
      if (newValue) this.$refs.preloader.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.statuses_tab_wrap {
  display: flex;
  align-items: flex-start;
  .statuses_form_wrap {
    display: flex;
    flex-direction: column;
    width: calc(35% - 40px);
    margin-right: 40px;
    .status_form,
    button {
      margin-top: 25px;
    }
    .status_form_actions {
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
  .statuses_list_wrap {
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
