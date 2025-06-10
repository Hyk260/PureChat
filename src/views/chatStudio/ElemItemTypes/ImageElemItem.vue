<template>
  <div class="image-preview" @click="handleImageClick(url)">
    <el-image
      :src="url"
      :style="imgStyle"
      :preview-src-list="chatStore.imgUrlList"
      :hide-on-click-modal="true"
      :initial-index="initialIndex"
      :infinite="false"
      :zoom-rate="1.2"
      :max-scale="5"
      :min-scale="0.3"
      :preview-teleported="true"
      loading="lazy"
      fit="cover"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { showIMPic } from "../utils/utils";
import { useChatStore } from "@/stores/index";
import { getImageSize } from "@/utils/common";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  self: {
    type: Boolean,
    default: false,
  },
});

const imgStyle = ref({});
const chatStore = useChatStore();

const initialIndex = computed(() => {
  const currentUrl = getImageProperties(0)?.url;
  return chatStore.imgUrlList.findIndex(item => item === currentUrl);
});

function getImageProperties(num = 0) {
  try {
    const { payload: { imageInfoArray } } = props.message;
    return imageInfoArray[num] || null;
  } catch (error) {
    console.error('Failed to get image properties:', error);
    return null;
  }
}

const url = computed(() => getImageProperties(0)?.url);

async function initImageSize() {
  try {
    const imageInfo = getImageProperties(0);
    let width = imageInfo?.width || 0;
    let height = imageInfo?.height || 0;

    if (width <= 0 || height <= 0) {
      const { width: newWidth, height: newHeight } = await getImageSize(url.value);
      width = newWidth;
      height = newHeight;
    }

    const { width: finalWidth, height: finalHeight } = showIMPic(width, height);
    imgStyle.value = { width: finalWidth, height: finalHeight };
  } catch (error) {
    console.error('Failed to initialize image size:', error);
    // Set default size if calculation fails
    imgStyle.value = { width: '142px', height: '82px' };
  }
}

const handleImageClick = (url) => {
  console.log('Image clicked:', url);
};

onMounted(() => {
  initImageSize();
});
</script>

<style lang="scss" scoped>
.image-preview {
  user-select: none;
  width: fit-content;
  max-width: 142px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid var(--color-border-default);
  overflow: hidden;

  :deep(.el-image) {
    border-radius: 5px;
    // vertical-align: bottom;
    min-height: 82px;
    display: block;
  }
}
</style>
