<template>
  <el-image-viewer
    v-if="dialog"
    ref="imageViewerRef"
    :initial-index="0"
    :hide-on-click-modal="true"
    :url-list="[url]"
    :zoom-rate="1.2"
    :max-scale="7"
    :min-scale="0.2"
    @close="setDialog(false)"
  />
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  // useTemplateRef
} from "vue"

import { useState } from "@/hooks/useState"
import emitter from "@/utils/mitt-bus"

defineOptions({ name: "ImageViewer" })

// const imageViewerRef = useTemplateRef("imageViewerRef")
const url = ref("")
const [dialog, setDialog] = useState(false)

// onClickOutside(imageViewerRef, () => {
//   setDialog(false)
// });

onMounted(() => {
  emitter.on("handleImageViewer", (src) => {
    if (src) {
      url.value = src
      setDialog(true)
    }
  })
})
onUnmounted(() => {
  emitter.off("handleImageViewer")
})
</script>

<style lang="scss" scoped></style>
