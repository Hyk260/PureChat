<template>
  <div class="frame w-full" v-loading="loading" :element-loading-text="$t('status.hsLoad')">
    <iframe :src="frameSrc[type]" class="frame-iframe" ref="frameRef" />
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, unref } from "vue";

const docs = __APP_INFO__.pkg.docs
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
});
const frameSrc = {
  document: docs,
  github: "https://github.com/Hyk260",
  gitee: "https://gitee.com",
};
const frameRef = ref();
const loading = ref(true);

function hideLoading() {
  loading.value = false;
}
function init() {
  nextTick(() => {
    const iframe = unref(frameRef);
    if (!iframe) return;
    if (iframe.attachEvent) {
      iframe.attachEvent("onload", () => {
        hideLoading();
      });
    } else {
      iframe.onload = () => {
        hideLoading();
      };
    }
  });
}

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.frame {
  .frame-iframe {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
  }
}
</style>
