<template>
  <div class="image-preview" @click="handleImageClick(url)">
    <ElImage
      :src="url"
      :style="imgStyle"
      :previewSrcList="chatStore.imgUrlList"
      :hideOnClickModal="true"
      :initialIndex="initialIndex"
      :infinite="false"
      :scale="0.7"
      :zoomRate="1.2"
      :maxScale="8"
      :minScale="0.3"
      :previewTeleported="true"
      :loading="loading"
      :lazy="true"
      alt="图片"
      fit="cover"
    >
      <template #progress="{ activeIndex, total }">
        <span>{{ activeIndex + 1 + "-" + total }}</span>
      </template>
      <template #toolbar="{ actions, prev, next, reset, activeIndex }">
        <ElIcon @click="prev"><Back /></ElIcon>
        <ElIcon @click="next"><Right /></ElIcon>
        <ElIcon @click="actions('zoomOut')"><ZoomOut /></ElIcon>
        <ElIcon @click="actions('zoomIn', { zoomRate: 2 })">
          <ZoomIn />
        </ElIcon>
        <ElIcon @click="actions('clockwise', { rotateDeg: 90 })">
          <RefreshRight />
        </ElIcon>
        <ElIcon @click="actions('clockwise', { rotateDeg: -90 })">
          <RefreshLeft />
        </ElIcon>
        <ElIcon @click="reset"><Refresh /></ElIcon>
        <!-- <ElIcon @click="download(activeIndex)"><Download /></ElIcon> -->
      </template>
    </ElImage>
  </div>
</template>

<script setup lang="ts">
import { ElImage } from "element-plus"
import {
  Back,
  DArrowRight,
  Download,
  Refresh,
  RefreshLeft,
  RefreshRight,
  Right,
  ZoomIn,
  ZoomOut,
} from "@element-plus/icons-vue"
import { useChatStore } from "@/stores"
import { DB_Message, ImagePayloadType } from "@pure/database/schemas"
import { showIMPic } from "@/utils/chat"
import { getImageSize } from "@/utils/common"

interface Props {
  message: DB_Message
  loading?: "lazy" | "eager"
}

const props = withDefaults(defineProps<Props>(), {
  loading: "lazy",
})

const imgStyle = ref({})
const chatStore = useChatStore()

const initialIndex = computed(() => {
  const currentUrl = getImageProperties(0)?.url
  return chatStore.imgUrlList.findIndex((item) => item === currentUrl)
})

function getImageProperties(num = 0) {
  try {
    const data = props.message.payload as ImagePayloadType
    return data.imageInfoArray[num] || null
  } catch (error) {
    console.error("Failed to get image properties:", error)
    return null
  }
}

const url = computed(() => getImageProperties(0)?.url || "")

async function initImageSize() {
  try {
    const imageInfo = getImageProperties(0)
    let width = imageInfo?.width || 0
    let height = imageInfo?.height || 0

    if (width <= 0 || height <= 0) {
      const { width: newWidth, height: newHeight } = await getImageSize(url.value)
      width = newWidth
      height = newHeight
    }

    const { width: finalWidth, height: finalHeight } = showIMPic(width, height)
    imgStyle.value = { width: finalWidth, height: finalHeight }
  } catch (error) {
    console.error("Failed to initialize image size:", error)
    // Set default size if calculation fails
    imgStyle.value = { width: "142px", height: "82px" }
  }
}

const download = (index: number) => {
  const url = chatStore.imgUrlList[index] || ""
  const suffix = url.slice(url.lastIndexOf("."))
  const filename = Date.now() + suffix

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(new Blob([blob]))
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(blobUrl)
      link.remove()
    })
}

const handleImageClick = (url: string) => {
  console.log("Image message:", props.message)
  console.log("Image clicked:", url)
}

onMounted(() => {
  initImageSize()
})
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
