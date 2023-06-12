<template>
  <el-image style="width: 100px; height: 100px" :preview-src-list="srcList">
  </el-image>
</template>
<script>
export default {
  name: "SyPreview",
  props: {
    title: {
      type: String,
      default: ""
    },
    srcList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.divider {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #424344;
}
.divider-split {
  width: 4px;
  height: 16px;
  background-color: #1492ff;
  margin-right: 6px;
}
</style>
