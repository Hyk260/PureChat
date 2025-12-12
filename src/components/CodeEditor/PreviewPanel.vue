<template>
  <div class="preview-only-view">
    <div v-if="code.trim()" class="preview-frame">
      <iframe
        ref="iframeRef"
        :srcdoc="code"
        title="HTML Preview"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
    <div v-else class="empty-preview">
      <p>没有内容可预览</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  code: string
}

defineProps<Props>()

const iframeRef = useTemplateRef("iframeRef")

defineExpose({ iframeRef })
</script>

<style lang="scss" scoped>
.preview-only-view {
  height: 100%;
  background: white;
  position: relative;

  .preview-frame {
    width: 100%;
    height: 100%;
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: white;
    }
  }

  .empty-preview {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--el-bg-color-page);
    color: var(--el-text-color-secondary);
    font-size: 14px;
  }
}
</style>
