<template>
  <el-switch :disabled="options.disabled" v-model="query[options.key]"> </el-switch>
</template>
<script>
export default {
  name: "CrudFormSwitch",
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
  },
  methods: {
    getQuery() {
      return this.query[this.options.key];
    }
  }
};
</script>
<style></style>
