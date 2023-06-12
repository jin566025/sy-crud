<template>
  <el-date-picker
    :style="options.style"
    v-model="query[options.key]"
    :disabled="options.disabled"
    clearable
    :type="options.type ? options.type : '~'"
    :range-separator="options.separator"
    :start-placeholder="
      options.placeholder.length > 0 ? options.placeholder[0] : '开始日期'
    "
    :end-placeholder="options.placeholder.length > 0 ? options.placeholder[1] : '结束日期'"
    :size="options.size || 'medium'"
    :picker-options="options.pickerOptions"
    :append-to-body="false"
  >
  </el-date-picker>
</template>
<script>
export default {
  name: "CrudFormRange",
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
  data() {
    return {};
  }
};
</script>
<style></style>
