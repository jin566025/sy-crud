<template>
  <el-dialog
    :title="title"
    :visible.sync="isDialogVisible"
    :width="width"
    :before-close="handleClose"
    :destroy-on-close="true"
    class="dialog-content"
  >
    <div>
      <sy-crud-form ref="query" :formColumns="formColumns"></sy-crud-form>
    </div>

    <span slot="footer" class="dialog-footer">
      <template v-if="disabled">
        <el-button @click="handleClose">关闭</el-button>
      </template>
      <template v-else>
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </template>
    </span>
  </el-dialog>
</template>
<script>
import SyCrudForm from "@/components/sy-crud/crud-form/syCrudForm";
import { ROLE_TYPE } from "./constant";
export default {
  name: "AddStudent",
  components: {
    SyCrudForm,
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
    width: {
      type: String,
      default: "900px",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isDialogVisible: false,
      updateKey: 1,
      formColumns: {},
    };
  },
  mounted() {
    console.log("disabled", this.disabled);
    this.initColumns();
  },
  methods: {
    initColumns() {
      let formColumns = {
        formStyle: "flex-wrap: wrap;",
        labelPosition: "right",
        rules: {
          code: [
            {
              required: true,
              message: "请输入角色编码",
              trigger: "blur",
            },
          ],
          name: [
            {
              required: true,
              message: "请选择角色名称",
              trigger: "blur",
            },
          ],
          type: [
            {
              required: true,
              message: "请选择角色类型",
              trigger: "blur",
            },
          ],
        },
        columns: [
          {
            label: "角色编码",
            component: "crud-form-input",
            key: "code",
            value: "",
            placeholder: "请输入角色编码",
            disabled: this.disabled,
            style: {
              width: "250px",
            },
            formStyle: {
              width: "400px",
              marginBottom: "18px",
            },
            labelWidth: "120px",
          },
          {
            label: "角色名称",
            component: "crud-form-input",
            key: "name",
            value: undefined,
            disabled: this.disabled,
            placeholder: "请输入色名称",
            style: {
              width: "250px",
            },
            formStyle: {
              width: "400px",
              marginBottom: "18px",
            },
            labelWidth: "120px",
          },
          {
            label: "角色类型",
            component: "crud-form-select",
            key: "type",
            value: undefined,
            disabled: this.disabled,
            placeholder: "请选择角色类型",
            options: ROLE_TYPE,
            style: {
              width: "250px",
            },
            formStyle: {
              width: "650px",
              marginBottom: "18px",
            },
            labelWidth: "120px",
          },
          {
            label: "描述",
            component: "crud-form-input",
            key: "remark",
            value: "",
            limit: 500,
            placeholder: "请输入描述",
            disabled: this.disabled,
            type: "textarea",
            style: {
              width: "675px",
            },
            formStyle: {
              width: "750px",
              marginBottom: "18px",
            },
            labelWidth: "120px",
          },
        ],
        searchBtns: [],
      };
      let detail = this.detail;
      for (let key in detail) {
        formColumns.columns.forEach((item) => {
          if (key == item.key && detail[key]) {
            item.value = detail[key];
          }
        });
      }
      setTimeout(() => {
        this.formColumns = formColumns;
      });
    },
    postRole(params) {
      return new Promise((resolve, reject) => {
        resolve({ success: true });
      });
    },
    submit() {
      let getBasicInfo = this.$refs.query.getSearchQuery();
      getBasicInfo.then((res) => {
        if (res.success) {
          let searchQuery = res.searchQuery;
          if (this.detail.id) {
            searchQuery.id = this.detail.id;
          }
          this.postRole(searchQuery).then((res) => {
            if (res.success) {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.changeDialogStatus(false);
              this.$emit("updateTable");
            }
          });
        }
      });
    },
    changeDialogStatus(status) {
      this.isDialogVisible = status;
    },
    handleClose() {
      if (this.disabled) {
        this.changeDialogStatus(false);
      } else {
        this.$confirm("确认关闭？")
          .then((_) => {
            this.changeDialogStatus(false);
          })
          .catch((_) => {});
      }
    },
  },
};
</script>
<style>
.dialog-content .el-dialog__body {
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
}
</style>
