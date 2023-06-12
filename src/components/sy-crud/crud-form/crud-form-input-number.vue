<template>
  <!-- <el-input-number
    :style="options.style"
    :size="options.size || 'medium'"
    :placeholder="options.placeholder"
    :disabled="options.disabled"
    :precision="options.precision"
    v-model="query[options.key]"
    clearable
    controls-position="left"
    @change="handleChange"
    :min="options.min || 1"
    :max="options.max || 10"
  ></el-input-number> -->
  <div>
    <template v-if="options.disabled">
      <el-input
        :style="options.style"
        :type="options.type || 'text'"
        :size="options.size || 'medium'"
        :placeholder="options.placeholder"
        :disabled="options.disabled"
        :value="
          query[options.key] && query[options.key] != '0'
            ? query[options.key]
            : ''
        "
      >
      </el-input>
    </template>
    <template v-else>
      <el-input-number
        :style="options.style"
        :size="options.size || 'medium'"
        :placeholder="options.placeholder"
        :disabled="options.disabled"
        :precision="options.precision"
        v-model="query[options.key]"
        clearable
        controls-position="left"
        @change="handleChange"
        :min="options.min || 1"
        :max="options.max || 10"
      ></el-input-number>
    </template>
  </div>
</template>
<script>
export default {
  name: "CrudFormInputNumber",
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
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style></style>
