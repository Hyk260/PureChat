<template>
  <ElImageViewer
    v-if="dialog"
    ref="imageViewerRef"
    :initialIndex="0"
    :hideOnClickModal="true"
    :urlList="[url]"
    :zoomRate="1.2"
    :maxScale="7"
    :minScale="0.2"
    @close="setDialog(false)"
  />
</template>

<script setup lang="ts">
import { ElImageViewer } from "element-plus"
import {
  onMounted,
  onUnmounted,
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
