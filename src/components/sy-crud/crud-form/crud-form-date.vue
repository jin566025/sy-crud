<template>
  <el-date-picker
    :style="options.style"
    :placeholder="options.placeholder"
    :disabled="options.disabled"
    v-model="query[options.key]"
    clearable
    :type="options.type"
    :size="options.size || 'medium'"
    :picker-options="options.pickerOptions"
    :append-to-body="false"
  >
  </el-date-picker>
</template>
<script>
export default {
  name: "CrudFormDate",
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
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  }
};
</script>
<style></style>
