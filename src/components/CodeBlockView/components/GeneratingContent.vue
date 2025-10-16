<template>
  <div class="generating-container">
    <el-icon class="loading-icon"><Loading /></el-icon>
    <span class="generating-text">正在生成内容...</span>
  </div>
</template>

<script setup lang="ts">
import { Loading } from "@element-plus/icons-vue"
</script>

<style lang="scss" scoped>
.generating-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 20px;
  min-height: 78px;

  .loading-icon {
    font-size: 20px;
    color: var(--el-color-primary);
    animation: spin 1s linear infinite;
  }

  .generating-text {
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
