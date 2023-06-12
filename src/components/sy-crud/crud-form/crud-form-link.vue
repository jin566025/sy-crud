<template>
  <el-link :href="query[options.key]" target="_blank" type="primary">{{
    options.text
  }}</el-link>
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
