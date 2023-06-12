<template>
  <sy-crud :schema="schema" :key="'addTrainTable' + updateKey">
    <div style="margin-bottom: 12px" slot="tableBtn">
      <el-button
        @click="tableBtnClick"
        icon="el-icon-plus"
        type="primary"
        size="small"
        >添加角色</el-button
      >
    </div>
    <div slot="action" slot-scope="slotProps">
      <template>
        <el-button type="text" @click="openDetail(slotProps.data, true)"
          >详情</el-button
        >
        <el-button type="text" @click="openDetail(slotProps.data, false)"
          >编辑</el-button
        >
        <el-button
          class="red-color"
          type="text"
          @click="bindDeleteClick(slotProps.data, true)"
          >删除</el-button
        >
      </template>
    </div>
  </sy-crud>
</template>
<script>
import SyCrud from "@/components/sy-crud/index.vue";
import moment from "moment";
export default {
  name: "TableList",
  components: {
    SyCrud,
  },
  data() {
    return {
      isCompany: true,
      updateKey: 1,
      schema: {},
    };
  },
  mounted() {
    let isCompanyLocal = localStorage.getItem("isCompany");
    const bools = {
      false: false,
      true: true,
    };
    let isCompany = bools[isCompanyLocal];
    this.isCompany = isCompany;

    let schema = {
      formColumns: {
        columns: [
          {
            label: "角色编码:",
            component: "crud-form-input",
            key: "code",
            value: "",
            placeholder: "请输入角色编码",
            labelWidth: "80px",
            size: "medium",
            style: "width:100%",
            col: 6,
          },
          {
            label: "角色名称:",
            component: "crud-form-input",
            key: "name",
            value: "",
            placeholder: "请输入角色名称",
            labelWidth: "80px",
            size: "medium",
            style: "width:100%",
            col: 6,
          },

          {
            label: "创建时间:",
            component: "crud-form-date",
            type: "date",
            key: "createDate",
            value: "",
            placeholder: "请选择创建时间",
            labelWidth: "80px",
            size: "medium",
            style: "width:100%",
            col: 6,
          },
        ],
        searchBtns: [
          {
            label: "搜索",
            icon: "el-icon-search",
            type: "primary",
            size: "medium",
            style: {
              marginRight: "10px",
            },
            clickType: "submit",
          },
          {
            label: "重置",
            icon: "el-icon-refresh-right",
            type: "",
            size: "medium",
            style: {
              marginRight: "10px",
            },
            clickType: "reset",
          },
        ],
      },
      tableColumns: {
        getTableData: this.getTableData,
        dataSource: [],
        scroll: 900,
        style: {
          width: "100%",
        },
        headerCellStyle: {
          textAlign: "center",
          backgroundColor: "#F7F7F7",
        },
        cellStyle: {
          textAlign: "center",
        },
        tableQuery: {
          pageNum: 1,
          pageSize: 10,
        },

        columns: [
          {
            label: "序号",
            dataIndex: "index",
            align: "center",
            width: "60px",
          },
          {
            label: "角色编码",
            dataIndex: "code",
            align: "center",
          },

          {
            label: "角色名称",
            dataIndex: "name",
            align: "center",
          },
          {
            label: "创建时间",
            dataIndex: "createDate",
            align: "center",
          },
          {
            label: "操作",
            dataIndex: "action",
            align: "center",
            width: "220px",
            slot: "action",
          },
        ],
      },
    };

    this.schema = schema;
    this.updateKey = this.updateKey + 1;
  },
  methods: {
    download(data) {
      this.$emit("download", data);
    },
    tableBtnClick() {
      this.$emit("bindTableBtnClick");
    },
    getRoleList(params) {
      return new Promise((resolve, reject) => {
        resolve({
          success: true,
          data: {
            list: [],
            total: 0,
          },
        });
      });
    },
    getTableData(params) {
      if (params.createDate) {
        params.createDate = moment(params.createDate).format("YYYY-MM-DD");
      }
      return new Promise((resolve, reject) => {
        this.getRoleList(params).then((res) => {
          if (res.success) {
            let result = res.data;
            let list = result.list;
            resolve({
              list,
              total: result.total,
            });
          } else {
            resolve({
              list: [],
              total: 0,
            });
          }
        });
      });
    },

    openDetail(data, disabled) {
      this.$emit("openDetail", data, disabled);
    },
    deleteRole(params) {
      return new Promise((resolve, reject) => {
        resolve({ success: true });
      });
    },
    bindDeleteClick(data) {
      this.$confirm("确认删除？")
        .then((_) => {
          this.deleteRole({ id: data.id }).then((res) => {
            if (res.data.success) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.updateKey = this.updateKey + 1;
            }
          });
        })
        .catch((_) => {});
    },
  },
};
</script>
<style scoped>
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}
.red-dot {
  background-color: #ff6a2a;
}
.red-color {
  color: #ff6a2a;
}
.blue-dot {
  background-color: #1490fb;
}
.blue-color {
  color: #1490fb;
}
.green-dot {
  background-color: #00b578;
}
.green-color {
  color: #00b578;
}
.gray-dot {
  background-color: #bdbec0;
}
.gray-color {
  color: #bdbec0;
}
.invest-type {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
