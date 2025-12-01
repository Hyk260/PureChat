<template>
  <div class="static-content">
    <div class="button-container">
      <ElButton type="primary" :disabled="!hasContent" @click="$emit('preview')">
        <ElIcon><View /></ElIcon>
        预览
      </ElButton>

      <ElButton type="default" :disabled="!hasContent" @click="$emit('external')">
        <ElIcon><Link /></ElIcon>
        外部打开
      </ElButton>

      <ElButton type="default" :disabled="!hasContent" @click="$emit('download')">
        <ElIcon><Download /></ElIcon>
        下载
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, Link, View } from "@element-plus/icons-vue"

interface Props {
  hasContent: boolean
}

defineProps<Props>()

interface Emits {
  (e: "preview"): void
  (e: "external"): void
  (e: "download"): void
}

const emit = defineEmits<Emits>()
</script>

<style lang="scss" scoped>
.static-content {
  .button-container {
    margin: 10px 16px;
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .static-content .button-container {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
