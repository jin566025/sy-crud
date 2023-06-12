<template>
  <el-button @click="options.onClick" size="small" :type="options.type">{{options.placeholder}}</el-button>
</template>
<script>
export default {
  name: "CrudFormLink",
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
