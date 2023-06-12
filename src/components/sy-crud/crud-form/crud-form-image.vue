<template>
  <el-image
    style="width: 80px; height: 100px"
    :src="url"
    :preview-src-list="[url]"
  >
  </el-image>
</template>
<script>
export default {
  name: "CrudFormImage",
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
      url: "",
    };
  },
  mounted() {
    if(this.options.value && this.options.value.url){
      this.url = this.options.value.url
    }
  }
};
</script>
<style></style>
