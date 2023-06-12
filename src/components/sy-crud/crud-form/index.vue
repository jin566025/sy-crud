<template>
  <el-form
    ref="formModel"
    :model="searchQuery"
    :rules="formColumns.rules"
    class=" search-form my-form"
    :style="formColumns.formStyle"
    :label-position="formColumns.labelPosition || 'left'"
    size="medium"
  >
    <el-row>
      <el-col v-for="item in formColumns.columns" :span="item.col || 4"
        ><el-form-item
          :label="item.label"
          :style="item.formStyle"
          class="a-form-model-item"
          :class="item.labelClass"
          :label-width="item.labelWidth ? item.labelWidth : '80px'"
          :prop="item.key"
        >
          <component
            :query="searchQuery"
            :is="item.component"
            :options="item"
            v-on="$listeners"
          ></component> </el-form-item
      ></el-col>
      <!-- :style="item.style" -->
      <el-col :span="4">
        <div class="btns">
          <el-button
            :type="item.type"
            @click="
              item.clickType ? bindBtnClick(item.clickType) : item.onClick()
            "
            v-for="item in formColumns.searchBtns"
            :icon="item.icon"
            :size="item.size || 'medium '"
            >{{ item.label }}</el-button
          >
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import CrudFormInput from "./crud-form-input.vue";
import CrudFormInputNumber from "./crud-form-input-number.vue";
import CrudFormSelect from "./crud-form-select.vue";
import CrudFormDate from "./crud-form-date.vue";
import CrudFormRange from "./crud-form-range.vue";
import CrudFormUpload from "./crud-form-upload.vue";
import CrudFormLink from "./crud-form-link.vue";
import CrudFormCascader from "./crud-form-cascader.vue";
import CrudFormImage from "./crud-form-image.vue";
import CrudFormBtn from "./crud-form-btn.vue";
import CrudFormSwitch from "./crud-form-switch.vue";
import { cloneDeep } from "../utils/utils";
import moment from "moment";
export default {
  components: {
    CrudFormInput,
    CrudFormSelect,
    CrudFormDate,
    CrudFormRange,
    CrudFormUpload,
    CrudFormInputNumber,
    CrudFormLink,
    CrudFormCascader,
    CrudFormImage,
    CrudFormBtn,
    CrudFormSwitch
  },
  name: "CrudForm",
  props: {
    formColumns: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      searchQuery: {}
    };
  },
  mounted() {},
  watch: {
    formColumns: function(newVal, oldVal) {
      this.initSearchQuery();
    }
  },
  methods: {
    initSearchQuery() {
      let searchQuery = cloneDeep(this.searchQuery);
      this.formColumns.columns.forEach(item => {
        searchQuery[item.key] = item.value || undefined;
      });
      console.log("initSearchQuery", searchQuery);
      this.searchQuery = searchQuery;
    },
    bindBtnClick(type) {
      if (type === "submit") {
        let searchQuery = cloneDeep(this.searchQuery);
        for (let key in searchQuery) {
          let value = searchQuery[key];
          if (value && !this.checkIsValid(value)) {
            searchQuery[key] = String(value).trim();
          }
        }
        this.$emit("formSubmit", searchQuery);
      } else if (type === "reset") {
        this.initSearchQuery();
        this.$emit("resetForm");
      } else {
      }
    },
    checkIsValid(value) {
      return (
        value instanceof Date ||
        value instanceof Object ||
        value instanceof Array
      );
    },
    getSearchQuery() {
      return new Promise((resolve, reject) => {
        this.$refs.formModel.validate(valid => {
          let searchQuery = cloneDeep(this.searchQuery);
          for (let key in searchQuery) {
            let value = searchQuery[key];
            if (value && !this.checkIsValid(value)) {
              searchQuery[key] = String(value).trim();
            }
          }
          if (valid) {
            resolve({ searchQuery, success: true });
          } else {
            resolve({ searchQuery, success: false });
          }
        });
      });
    }
  }
};
</script>
<style>
.flex-box {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}
.a-form-model-item {
  margin-right: 24px;
  margin-bottom: 0;
}
.my-form .el-input.is-disabled .el-input__inner,
.my-form .el-textarea.is-disabled .el-textarea__inner,
.my-form .el-range-editor.is-disabled input {
  color: #606266;
}
.my-form {
  align-items: center;
}
.align-center {
  display: flex;
  align-items: center;
}
.btns{
  display: inline-flex;
}
</style>
