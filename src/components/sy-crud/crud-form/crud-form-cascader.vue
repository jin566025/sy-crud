<template>
  <el-cascader
    v-model="query[options.key]"
    :options="options.options || zjTreeData"
    :size="options.size || 'medium'"
    @change="handleChange"
    :disabled="options.disabled"
    :append-to-body="false"
    :style="options.style"
  >
  </el-cascader>
</template>
<script>
import { mapData } from "./test.js";
export default {
  name: "CrudFormCascader",
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    query: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    query: {
      handler(newVal, oldVal) {

      },
      deep: true
    }
  },
  data() {
    return {
      formInline: {
        provinceName: "",
        cityName: "",
        areaName: ""
      },
      mapData,
      zjTreeData: [],
      updateKey: 1
    };
  },
  mounted() {
    this.getAreaTreesData();
  },
  methods: {
    handleChange(value) {
      this.formInline.provinceName = value[0];
      this.formInline.cityName = value[1];
      this.formInline.areaName = value[2];
    },
    getAreaTreesData() {
     
    }
  }
};
</script>
<style></style>
