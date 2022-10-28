<template>
  <div class="image_preview" @click="geiPic(url)">
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :preview-src-list="srcList"
      :initial-index="4"
      fit="cover"
    />
  </div>
</template>

<script setup>
import { downloadFilesByUrl } from "@/utils/message-input-utils.js";
import { loadFile } from "@/api/index";
const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
});
const { message } = props;
console.log(message);
const url =
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const srcList = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
];
const geiPic = async (url) => {
  // downloadFilesByUrl(url);
  const res = await loadFile({
    file_url: url,
  });
  console.log(res);
};
</script>

<style lang="scss" scoped>
.image_preview {
  background: #c2e8ff;
  width: fit-content;
  padding: 10px 14px;
  max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>
