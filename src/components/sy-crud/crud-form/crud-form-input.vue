<template>
  <el-input
    :style="options.style"
    :type="options.type || 'text'"
    :size="options.size || 'medium'"
    :placeholder="options.placeholder"
    :disabled="options.disabled"
    :maxlength="options.limit"
    :show-word-limit="options.limit>0"
    v-model="query[options.key]"
    clearable
  >
  </el-input>
</template>
<script>
export default {
  name: "CrudFormInput",
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
    getQuery(){
      return this.query[this.options.key]
    }
  },
};
</script>
<style></style>
