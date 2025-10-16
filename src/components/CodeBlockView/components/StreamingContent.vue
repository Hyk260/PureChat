<template>
  <div class="streaming-content">
    <div class="terminal-preview">
      <div class="terminal-content">
        <div class="terminal-line">
          <span class="terminal-prompt">$</span>
          <span class="terminal-code">
            {{ lastLines }}
            <span class="terminal-cursor"></span>
          </span>
        </div>
      </div>
    </div>

    <div class="button-container">
      <el-button type="primary" @click="$emit('preview')">
        <el-icon><View /></el-icon>
        预览
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { View } from "@element-plus/icons-vue"

interface Props {
  lastLines: string
}

defineProps<Props>()

defineEmits<{
  preview: []
}>()
</script>

<style lang="scss" scoped>
.streaming-content {
  .terminal-preview {
    margin: 16px;
    background: var(--el-bg-color-page);
    border-radius: 8px;
    overflow: hidden;
    font-family: var(--el-font-family-mono);
    border: 1px solid var(--el-border-color);

    .terminal-content {
      padding: 12px;
      background: var(--el-bg-color-page);
      color: var(--el-text-color-primary);
      font-size: 13px;
      line-height: 1.4;
      min-height: 80px;

      .terminal-line {
        display: flex;
        align-items: flex-start;
        gap: 8px;

        .terminal-prompt {
          color: var(--el-color-success);
          font-weight: bold;
          flex-shrink: 0;
        }

        .terminal-code {
          flex: 1;
          white-space: pre-wrap;
          word-break: break-word;
          color: var(--el-text-color-primary);
          background-color: transparent !important;

          .terminal-cursor {
            display: inline-block;
            width: 2px;
            height: 16px;
            background: var(--el-color-success);
            animation: blink 1s infinite;
            margin-left: 2px;
          }
        }
      }
    }
  }

  .button-container {
    margin: 10px 16px;
    display: flex;
    flex-direction: row;
  }
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
</style>
