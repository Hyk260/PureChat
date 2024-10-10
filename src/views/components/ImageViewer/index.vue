<template>
  <el-image-viewer
    v-if="dialog"
    ref="imageViewerRef"
    :initialIndex="0"
    :hide-on-click-modal="true"
    :url-list="[url]"
    :zoom-rate="1.2"
    :max-scale="7"
    :min-scale="0.2"
    @close="setDialog(false)"
  />
</template>

<script setup>
import { ref, onMounted, useTemplateRef } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useBoolean } from "@/utils/hooks/index";
import emitter from "@/utils/mitt-bus";

const imageViewerRef = useTemplateRef('imageViewerRef')
const url = ref("https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png");
const [dialog, setDialog] = useBoolean();

// onClickOutside(imageViewerRef, () => {
//   setDialog(false)
// });

onMounted(() => {
  emitter.on("handleImageViewer", (src) => {
    if (src) {
      url.value = src;
      setDialog(true);
    }
  });
});
</script>

<style lang="scss" scoped></style>
