<template>
  <el-select
    :style="options.style"
    :multiple="options.multiple"
    :placeholder="options.placeholder"
    v-model="query[options.key]"
    :size="options.size || 'medium'"
    :disabled="options.disabled"
    clearable
    filterable
    @change="onSelectChange"
    :popper-append-to-body="false"
  >
    <el-option
      v-for="item in options.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: "CrudFormSelect",
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
    onSelectChange(value) {
      this.$emit("onSelectChange", value);
    },
    getQuery() {
      return this.query[this.options.key];
    },
    getOptions() {
      return this.options;
    }
  }
};
</script>
<style></style>
