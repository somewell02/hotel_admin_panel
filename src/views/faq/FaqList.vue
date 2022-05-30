<template>
  <div class="tabs_content_wrap faq_tab_wrap">
    <div class="faq_form_wrap">
      <h2>
        {{ this.isEdit ? $t("faq.edit") : $t("faq.add") }}
      </h2>
      <faq-form
        v-if="this.faqList && this.faq"
        v-model="faq"
        ref="faqForm"
        :isEdit="isEdit"
        class="faq_form"
      />
      <div class="faq_form_actions">
        <filled-button v-if="this.isEdit" @click="backToAdd">
          {{ $t("back") }}
        </filled-button>
        <filled-button @click="this.isEdit ? editFaq() : addFaq()">
          {{ this.isEdit ? $t("save") : $t("add") }}
        </filled-button>
      </div>
    </div>
    <bordered-div class="faq_list_wrap">
      <preloader-spinner ref="preloader" />
      <spacing-bordered-table
        class="faq_table"
        :type="2"
        v-if="faqList && faqList.length > 0"
        :titles="table.titles"
        :rows="modifiedFaqList"
        :actions="table.actions"
        @delete="(faq) => deleteFaq(faq)"
        @edit="(faq) => pushToEdit(faq)"
      />
      <div v-else class="no_records">{{ $t("noRecords") }}</div>
    </bordered-div>
    <message-alert ref="alert"></message-alert>
    <confirmation-popup ref="deleteConfirmation" />
  </div>
</template>

<script>
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable";
import FaqForm from "@/layouts/dashboard/faq/FaqForm";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";

import {
  subscribeFaq,
  addFaq,
  deleteFaq,
  getFaqById,
  updateFaq,
} from "@/data/firebase/faqApi";

import { table } from "./faqConstants";

import { sliceWithEllipsis } from "@/services/methods/string";

export default {
  data() {
    return {
      faqList: null,
      table: table,
      isEdit: false,
      faq: {},
    };
  },

  components: {
    SpacingBorderedTable,
    FaqForm,
    ConfirmationPopup,
  },

  async created() {
    this.resetFaq();
    await this.initData();
  },

  computed: {
    modifiedFaqList() {
      let faqs = this.faqList.map((faq) => {
        return {
          ...faq,
        };
      });

      faqs.forEach((faq) => {
        faq.shortTitle = sliceWithEllipsis(faq.title, 45);
        faq.shortDesc = sliceWithEllipsis(faq.description.join(" "), 45);
      });

      return faqs;
    },
  },

  methods: {
    async initData() {
      await subscribeFaq().then((faq) => {
        this.faqList = faq;
      });

      if (this.$route.params.id) {
        getFaqById(this.$route.params.id).then((data) => {
          this.setFaq(data);
        });
      }
    },

    addFaq() {
      if (this.$refs.faqForm.validate()) {
        addFaq(this.faq)
          .then(() => {
            this.$refs.alert.open("success", this.$t("faq.alerts.added"));
          })
          .finally(() => {
            this.resetFaq();
          });
      }
    },

    editFaq() {
      if (this.$refs.faqForm.validate()) {
        updateFaq(this.$route.params.id, this.faq).then(() => {
          this.$refs.alert.open("success", this.$t("faq.alerts.updated"));
        });
      }
    },

    async deleteFaq(faq) {
      const popupResult = await this.$refs.deleteConfirmation.open(
        this.$t("faq.delete") + ": " + faq.title + "?"
      );
      if (popupResult) {
        const res = deleteFaq(faq);
        if (res) {
          this.$refs.alert.open("success", this.$t("faq.alerts.deleted"));
        }
      }
    },

    pushToEdit(faq) {
      this.setFaq(faq);
      this.$router.push({ name: "faqEdit", params: { id: faq.id } });
    },

    backToAdd() {
      this.resetFaq();
      this.$router.push({ name: "faq" });
    },

    setFaq(faq) {
      this.isEdit = true;
      this.faq.title = faq.title;
      this.faq.description = faq.description;
      this.faq.image = faq.image;
    },

    resetFaq() {
      this.isEdit = false;
      this.faq.title = "";
      this.faq.description = [];
      this.faq.image = "";
    },
  },

  watch: {
    faqList(newValue) {
      if (newValue) this.$refs.preloader.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.faq_tab_wrap {
  display: flex;
  align-items: flex-start;
  .faq_form_wrap {
    display: flex;
    flex-direction: column;
    width: calc(35% - 40px);
    margin-right: 40px;
    .faq_form,
    button {
      margin-top: 25px;
    }
    .faq_form_actions {
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
  .faq_list_wrap {
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
