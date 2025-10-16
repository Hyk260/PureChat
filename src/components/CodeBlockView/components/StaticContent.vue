<template>
  <div class="static-content">
    <div class="button-container">
      <el-button type="primary" :disabled="!hasContent" @click="$emit('preview')">
        <el-icon><View /></el-icon>
        预览
      </el-button>

      <el-button type="default" :disabled="!hasContent" @click="$emit('external')">
        <el-icon><Link /></el-icon>
        外部打开
      </el-button>

      <el-button type="default" :disabled="!hasContent" @click="$emit('download')">
        <el-icon><Download /></el-icon>
        下载
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, Link, View } from "@element-plus/icons-vue"

interface Props {
  hasContent: boolean
}

defineProps<Props>()

defineEmits<{
  preview: []
  external: []
  download: []
}>()
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
