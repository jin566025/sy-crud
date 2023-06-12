<template>
  <div v-loading="isLoading" element-loading-text="">
    <table-list
      ref="tableList"
      @updateTable="updateTable"
      @bindTableBtnClick="bindTableBtnClick"
      @openDetail="openDetail"
    ></table-list>
    <!-- 详情弹窗 -->
    <detail
      :key="'updateKey' + updateKey"
      :disabled="disabled"
      :detail="detail"
      :title="detailTitle"
      ref="detail"
      @updateTable="updateTable"
    ></detail>
  </div>
</template>
<script>
import SyCrud from "@/components/sy-crud/index.vue";
import Detail from "./detail.vue";
import TableList from "./tableList.vue";
import { findComponentDownward } from "@/utils/utils.js";
export default {
  components: {
    SyCrud,
    Detail,
    TableList
  },
  data() {
    return {
      detail: {},
      updateKey: 1,
      isCompany: true,
      isLoading: false,
      disabled: false,
      detailTitle: ""
    };
  },
  mounted() {
    let isCompanyLocal = localStorage.getItem("isCompany");
    const bools = {
      false: false,
      true: true
    };
    let isCompany = bools[isCompanyLocal];
    this.isCompany = isCompany;
  },
  methods: {
    loading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
    bindTableBtnClick() {
      this.disabled = false;
      this.detail = {}
      this.detailTitle = "新增";
      this.updateKey = this.updateKey + 1;
      this.$nextTick(() => {
        this.$refs.detail.changeDialogStatus(true);
      });
    },
    updateTable() {
      let crudTable = findComponentDownward(this.$refs.tableList, "crud-table");
      if (crudTable && crudTable.getTableData) {
        crudTable.getTableData();
      }
    },
    openDetail(detail, disabled) {
      this.disabled = disabled;
      this.detail = detail;
      let detailTitle = disabled ? "详情" : "编辑";
      this.detailTitle = detailTitle;
      this.updateKey = this.updateKey + 1;
      this.$nextTick(() => {
        this.$refs.detail.changeDialogStatus(true);
      });
    }
  }
};
</script>
<style></style>
