<template>
  <div class="actions">
    <search-input v-model="search" />
    <filled-button @click="addRent">{{ $t("add") }}</filled-button>
  </div>
  <div class="tabs_content_wrap">
    <preloader-spinner ref="preloader" />
    <div class="list_modifications">
      <bordered-filters :filters="filters" />
      <div class="sorts_wrap">
        <bordered-select
          v-model="sort"
          :options="sortInfo.options"
          :prefix="$t('sorting') + ':'"
          dropdownSide="right"
        />
      </div>
    </div>
    <image-card-list
      class="rents_list"
      v-if="rentsList"
      :structure="structureInfo"
      :list="modifiedRentsList()"
      @edit="(rent) => editRent(rent.id)"
      @delete="(rent) => deleteRent(rent)"
    />
    <div class="pagination_wrap">
      <div class="count_title">
        {{ dataCount }}
      </div>
      <filled-pagination
        :length="pagination.length"
        v-model="pagination.page"
      />
    </div>
  </div>
  <message-alert ref="alert"></message-alert>
  <confirmation-popup ref="deleteConfirmation" />
</template>

<script>
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";
import ImageCardList from "@/components/lists/ImageCardList";
import BorderedSelect from "@/components/dropdowns/BorderedSelect";
import FilledPagination from "@/components/paginations/FilledPagination";
import BorderedFilters from "@/components/filters/BorderedFilters.vue";

import { structureInfo, sortInfo, filters, searchInfo } from "./rentConstants";

import {
  subscribeRentItems,
  deleteRentItem,
} from "@/data/firebase/rentItemsApi";
import { getAllRentCategories } from "@/data/firebase/rentCategoriesApi";

import { sliceWithEllipsis } from "@/services/methods/string";

import {
  search,
  sort,
  filter,
  paginate,
  recordsCount,
} from "@/services/methods/list.js";

export default {
  components: {
    ImageCardList,
    ConfirmationPopup,
    BorderedSelect,
    FilledPagination,
    BorderedFilters,
  },

  data() {
    return {
      rentsList: null,
      categoriesList: null,
      search: "",
      sort: "default",
      filters: filters,
      pagination: {
        page: 1,
        limit: 8,
        length: 0,
      },
      dataCount: "",
    };
  },

  async created() {
    await this.initData();
    this.initFilters();

    this.getRouterParams();
  },

  watch: {
    rentsList(newValue) {
      if (newValue) {
        this.$refs.preloader.hide();
        if (newValue.length == 0) {
          this.dataCount = this.$t("noRecords");
        }
      }
    },
    filters: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
    sort: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
    search: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
  },

  computed: {
    structureInfo() {
      return structureInfo;
    },
    sortInfo() {
      return sortInfo;
    },
    searchInfo() {
      return searchInfo;
    },
  },

  methods: {
    async initData() {
      await subscribeRentItems().then((data) => {
        this.rentsList = data;
      });
      await getAllRentCategories().then((categories) => {
        this.categoriesList = categories;
      });
    },

    initFilters() {
      let filterCategories = [];
      console.log(this.categoriesList);
      this.categoriesList.forEach((category) => {
        filterCategories.push({ id: category.id, title: category.title ?? "" });
      });
      this.filters.find((filter) => filter.id == "categoryId").options =
        filterCategories;
    },

    addRent() {
      this.$router.push({ name: "rentAdd" });
    },

    editRent(rentId) {
      this.$router.push({ name: "rentEdit", params: { id: rentId } });
    },

    async deleteRent(rent) {
      const popupResult = await this.$refs.deleteConfirmation.open(
        this.$t("rent.delete") + ": " + rent.name + "?"
      );
      if (popupResult) {
        const res = deleteRentItem(rent.id);
        if (res) {
          this.$refs.alert.open("success", this.$t("rent.alerts.deleted"));
        }
      }
    },

    modifiedRentsList() {
      let rents = this.rentsList.map((rent) => {
        return {
          ...rent,
        };
      });

      if (rents && rents.length > 0 && this.categoriesList) {
        rents.forEach((rent) => {
          rent.image = rent.images ? rent.images[0] ?? null : null;
          rent.title = sliceWithEllipsis(rent.title, 24);

          const rentCategory = this.categoriesList.find(
            (category) => category.id == rent.category
          );
          if (rentCategory) {
            rent.categoryId = rentCategory.id;
            rent.category = {
              title: rentCategory.title,
              background: rentCategory.color,
            };
          }
        });

        if (this.search) rents = search(rents, this.searchInfo, this.search);

        if (this.sort !== "default") rents = sort(rents, this.sort);

        rents = filter(rents, this.filters);

        const l = rents.length;

        const p = this.pagination;
        this.pagination.length = Math.ceil(rents.length / p.limit);
        rents = paginate(rents, p);

        this.dataCount = recordsCount(p, l);
      }

      return rents;
    },

    getRouterParams() {
      if (this.$route.params.messageText) {
        this.$refs.alert.open(
          this.$route.params.messageCategory,
          this.$route.params.messageText
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list_modifications {
  margin-bottom: 20px;
  @include flex-between;
}
.pagination_wrap {
  margin-top: 30px;
  @include flex-between;
  .count_title {
    color: var(--text-color);
    font-size: 14px;
  }
}
.tabs_content_wrap {
  padding-bottom: 40px;
  position: relative;
}
</style>
