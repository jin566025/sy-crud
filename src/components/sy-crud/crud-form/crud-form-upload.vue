<template>
  <div>
    <el-upload
      class="upload-component text-over"
      :action="host + '/api/upload/2'"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="2"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :file-list="fileList"
      :disabled="options.disabled"
      :before-upload="options.beforeUpload"
      :on-success="handleSuccess"
      :headers="headers"
      ref="uploadRef"
    >
      <template v-if="options.disabled">
        <!-- @click="toPage(file.url)" -->
        <a
          class="blue"
          @click="onFileClick(file.url)"
          type="text"
          v-if="file.url"
          >{{ file.name }}</a
        >
      </template>
      <template v-else>
        <el-button size="small" :icon="options.icon">{{
          options.placeholder
        }}</el-button>
        <div slot="tip" class="el-upload__tip">
          <i v-if="options.tipIcon" :class="options.tipIcon"></i>
          {{ options.tip }}
        </div>
      </template>
    </el-upload>
    <el-image-viewer
      v-if="isImageViewerShow && isImage"
      :on-close="closeViewer"
      :url-list="[previewUrl]"
      style="z-index:3000"
    />
  </div>
</template>
<script>

import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { setHeaders } from "@/utils/utils";
export default {
  name: "CrudFormUpload",
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
  components: {
    ElImageViewer,
  },
  data() {
    return {
      fileList: [],
      host: "",
      file: {},
      isImageViewerShow: false,
      isImage: false,
      isPdf: false,
      previewUrl: "",
      headers: {}
    };
  },
  mounted() {
    this.host = this.$http.getBaseUrl();
    this.headers = setHeaders();
    if (this.options.value && this.options.value.uri) {
      let file = {
        url: `${this.options.value.uri}`,
        name: this.options.value.filename
      };
      this.file = file;
      if (!this.options.disabled) {
        this.fileList = [file];
      }
    }
  },
  methods: {
    closeViewer() {
      this.isImageViewerShow = false;
    },
    onFileClick(url) {
      //this.$emit("onFileClick", url);
      console.log("onFileClick", url);
      const images = ["jpeg", "JPEG", "png", "PNG", "jpg", "JPG"];
      const pdfs = ["pdf", "PDF"];
      const words = ["doc", "docx"];
      let files = url.split(".");
      if (files.length > 0) {
        let fileType = files[files.length - 1];
        const isImage = images.includes(fileType);
        const isPdf = pdfs.includes(fileType);
        const isWord = words.includes(fileType);
        if (isImage) {
          this.isImageViewerShow = true;
          this.previewUrl = url;
          this.isImage = true;
        } else if (isWord) {
          // let docurl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
          //   url
          // )}`;
          let docurl = `http://view.xdocin.com/xdoc?_xdoc=${encodeURIComponent(
            url
          )}`;
          window.open(docurl);
        } else {
          window.open(url);
        }
      } else {
        window.open(url);
      }
    },
    
    toPage(href) {
      window.open(href, "_blank");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {},
    beforeRemove(file, fileList) {
      //return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(file, fileList) {},
    handleSuccess(file, fileList) {
      if (file.url) {
        this.fileList = [fileList];
        console.log("fileList", fileList);
        this.query[this.options.key] = {
          id: fileList.response.fileId,
          filename: fileList.name,
          uri: fileList.response.url
        };
        this.$message({
          message: "上传成功",
          type: "success"
        });
      } else {
        this.$message.error("上传失败");
        if (this.$refs.uploadRef.uploadFiles.length > 0) {
          this.$refs.uploadRef.uploadFiles.splice(0, 1);
        }
      }
    }
  }
};
</script>
<style>
.upload-component .el-upload__tip {
  line-height: 1.25;
}
.text-over .el-upload {
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}
.blue {
  color: #1492ff;
}
</style>
