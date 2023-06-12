<template>
  <div>
    <el-table
      v-loading="isLoading"
      :header-cell-style="tableColumns.headerCellStyle"
      :cell-style="tableColumns.cellStyle"
      :style="tableColumns.style"
      cell-class-name="table_cell"
      :data="dataSource"
      @selection-change="bindSelectionChange"
      border
    >
      <el-table-column
        v-if="tableColumns.selection"
        type="selection"
        width="55"
        :selectable="tableColumns.selectable"
      >
      </el-table-column>
      <el-table-column
        :prop="item.dataIndex"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth || '60px'"
        :fixed="item.fixed ? item.fixed : false"
        v-for="(item, index) in tableColumns.columns"
      >
        <template slot-scope="scope">
          <template v-if="item.slot">
            <slot :name="item.dataIndex" :data="scope.row"></slot>
          </template>
          <template v-else>{{ scope.row[item.dataIndex] }}</template></template
        >
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="!tableColumns.isPaginationHide"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tableQuery ? tableQuery.pageNum : 1"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="tableQuery ? tableQuery.pageSize : 10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataSourceTotal"
      :popper-append-to-body="false"
    >
    </el-pagination>
  </div>
</template>
<script>
import { cloneDeep } from "../utils/utils";
export default {
  name: "CrudTable",
  props: {
    tableColumns: {
      type: Object,
      default: () => {
        return {};
      }
    },
    searchQuery: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  data() {
    return {
      tableQuery: {
        pageSize: 10,
        pageNum: 1
      },
      dataSourceTotal: 0,
      isLoading: false,
      dataSource: [],
      slots: [],
      key: 1
    };
  },
  watch: {
    searchQuery: function(newVal, oldVal) {
      let query = {
        pageSize: 10,
        pageNum: 1,
        pageNumber: 1
      };
      let newQuery = { ...query, ...newVal };
      this.tableQuery = newQuery;
      this.$nextTick(() => {
        this.getTableData();
      });
    }
  },
  mounted() {
    let tableQuery = cloneDeep(this.tableColumns.tableQuery);
    this.tableQuery = tableQuery;
    this.$nextTick(() => {
      this.getTableData();
    });
  },
  methods: {
    bindSelectionChange(value) {
      this.$emit("bindSelectionChange", value);
    },
    handleSizeChange(val) {
      this.tableQuery.pageSize = val;
      this.$nextTick(() => {
        this.getTableData();
      });
    },
    handleCurrentChange(val) {
      this.tableQuery.pageNum = val;
      this.$nextTick(() => {
        this.getTableData();
        this.$emit("handleCurrentChange", val);
      });
    },
    getTableData() {
      this.isLoading = true;
      if (this.tableColumns && this.tableColumns.getTableData) {
        if (this.tableQuery && this.tableQuery.pageNum) {
          this.tableQuery.pageNumber = this.tableQuery.pageNum;
        }
        this.tableColumns
          .getTableData(this.tableQuery)
          .then(res => {
            let searchQuery = cloneDeep(this.tableColumns.tableQuery);
            this.isLoading = false;
            let list = res.list;
            list.forEach((item, index) => {
              item.index = (searchQuery.pageNum - 1) * 10 + index + 1;
            });
            const total = res.total;
            this.dataSource = list;
            this.dataSourceTotal = total;
            this.$emit("getTableDataSuccess", { list, total });
          })
          .catch(err => {
            this.isLoading = false;
          });
      }
    }
  }
};
</script>
<style>
.table_cell .cell {
  white-space: nowrap;
}
</style>
