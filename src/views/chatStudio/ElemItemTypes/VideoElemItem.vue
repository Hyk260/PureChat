<template>
  <div class="video-elem-item">
    <div ref="artRef" class="artplayer" :style="style"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Artplayer from "artplayer"
import { state, indicator } from "./utils"

const props = defineProps({
  message: {
    type: Object,
    default: () => ({}),
  },
  // snapshotUrl 视频封面图
  // videoSize 视频大小，单位：Byte
})

const artRef = ref(null)
const art = ref(null)
const loading = ref("")
const style = ref({})
const option = computed(() => ({
  url: props.message.payload?.videoUrl || "",
  contextmenu: [],
  container: artRef.value,
  lang: "zh-cn",
  theme: "#23ade5",
  fullscreen: true,
  icons: {
    state,
    loading: `<img width="50" heigth="50" src="${loading.value}">`,
    indicator,
  }
}))

const initArt = () => {
  Artplayer.CONTEXTMENU = false
  art.value = new Artplayer(option.value)
  art.value.on("ready", () => {
    // art.value.mini = true
  })
}

onMounted(() => {
  initArt()
})

onBeforeUnmount(() => {
  if (art.value && art.value.destroy) {
    art.value.destroy(false)
  }
})
</script>

<style lang="scss">
.video-elem-item {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
}
.art-video-player {
  z-index: 1;
}
.artplayer {
  width: 240px;
  height: 135px;
}
.art-state {
  svg {
    width: 50px;
  }
}
.art-control-volume {
  display: none !important;
}
</style>
