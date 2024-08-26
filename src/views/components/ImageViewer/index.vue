<template>
  <el-image-viewer
    v-if="dialog"
    :initialIndex="0"
    :url-list="[url]"
    :zoom-rate="1.2"
    :max-scale="7"
    :min-scale="0.2"
    @close="setDialog(false)"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import emitter from "@/utils/mitt-bus";
import { useBoolean } from "@/utils/hooks/index";

const url = ref('https://ljx-1307934606.cos.ap-beijing.myqcloud.com/xuax.jpg')
const [dialog,setDialog] = useBoolean()

onMounted(() => {
  emitter.on('onImageViewer', (src) => {
    // url.value = src
    setDialog(true)
  })
})
</script>

<style lang="scss" scoped></style>
