<template>
  <div class="card-header">
    <div class="icon-wrapper" :class="{ streaming: isStreaming }">
      <el-icon v-if="isStreaming" class="streaming-icon">
        <Loading />
      </el-icon>
      <el-icon v-else class="static-icon">
        <Document />
      </el-icon>
    </div>

    <div class="title-section">
      <div class="title">{{ title }}</div>
      <div class="type-badge">
        <el-icon><Document /></el-icon>
        <span>HTML</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Document, Loading } from "@element-plus/icons-vue"

interface Props {
  isStreaming: boolean
  title: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px 16px;
  background: var(--el-bg-color-page);
  border-bottom: 1px solid var(--el-border-color);
  border-radius: 8px 8px 0 0;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;

  &.streaming {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3);

    .streaming-icon {
      animation: spin 1s linear infinite;
    }
  }

  .static-icon,
  .streaming-icon {
    font-size: 20px;
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

.title-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  font-size: 14px;
  font-weight: bold;
  color: var(--el-text-color-primary);
  line-height: 1.4;
  font-family: "Ubuntu", sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  background: var(--el-bg-color-mute);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  font-size: 10px;
  font-weight: 500;
  color: var(--el-text-color-secondary);
  width: fit-content;
}

// 响应式设计
@media (max-width: 768px) {
  .card-header {
    padding: 16px 20px 12px;
  }

  .icon-wrapper {
    width: 36px;
    height: 36px;

    .static-icon,
    .streaming-icon {
      font-size: 16px;
    }
  }

  .title {
    font-size: 13px;
  }
}
</style>
