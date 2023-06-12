<template>
  <div class="divider">
    <div class="divider-split"></div>
    <div>{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: "SyDivider",
  props: {
    title: {
      type: String,
      default: ""
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
