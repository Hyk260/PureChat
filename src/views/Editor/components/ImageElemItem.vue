<template>
  <div class="image_preview" @click="geiPic(url)">
    <!-- :preview-src-list="srcList" -->
    <el-image
      :src="url"
      :preview-src-list="srcList"
      :initial-index="4"
      fit="cover"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
});
const { message } = props;
console.log(message);
const url = message.payload.imageInfoArray[0].url;

const srcList = [];
srcList.push(url);

const geiPic = async (url) => {
  console.log(url);
};
</script>

<style lang="scss" scoped>
.image_preview {
  width: fit-content;
  padding: 10px 14px;
  max-width: 140px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>
