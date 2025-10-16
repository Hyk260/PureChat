<template>
  <div class="html-artifacts-card" :class="{ streaming: isStreaming }">
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
        <div class="title">{{ displayTitle }}</div>
        <div class="type-badge">
          <el-icon><Document /></el-icon>
          <span>HTML</span>
        </div>
      </div>
    </div>

    <div class="card-content">
      <div v-if="isStreaming && !hasContent" class="generating-container">
        <el-icon class="loading-icon"><Loading /></el-icon>
        <span class="generating-text">正在生成内容...</span>
      </div>

      <div v-else-if="isStreaming && hasContent" class="streaming-content">
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
          <el-button type="primary" @click="openPopup">
            <el-icon><View /></el-icon>
            预览
          </el-button>
        </div>
      </div>

      <div v-else class="static-content">
        <div class="button-container">
          <el-button type="primary" :disabled="!hasContent" @click="openPopup">
            <el-icon><View /></el-icon>
            预览
          </el-button>

          <el-button type="default" :disabled="!hasContent" @click="openExternal">
            <el-icon><Link /></el-icon>
            外部打开
          </el-button>

          <el-button type="default" :disabled="!hasContent" @click="downloadHtml">
            <el-icon><Download /></el-icon>
            下载
          </el-button>
        </div>
      </div>
    </div>

    <!-- HTML 预览弹窗 -->
    <HtmlArtifactsPopup
      :open="popupOpen"
      :title="displayTitle"
      :html="htmlContent"
      :on-save="onSave"
      @close="closePopup"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { Document, Download, Link, Loading, View } from "@element-plus/icons-vue"

import { ElMessage } from "element-plus"

import HtmlArtifactsPopup from "./HtmlArtifactsPopup.vue"

interface Props {
  html: string
  onSave?: (html: string) => void
  isStreaming?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isStreaming: false,
})

const emit = defineEmits<{
  save: [html: string]
}>()

const popupOpen = ref(false)

const htmlContent = computed(() => props.html || "")
const hasContent = computed(() => htmlContent.value.trim().length > 0)

const displayTitle = computed(() => {
  if (!htmlContent.value) return "HTML Artifacts"

  // 尝试从 HTML 中提取 title 标签
  const titleMatch = htmlContent.value.match(/<title[^>]*>([^<]*)<\/title>/i)
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim()
  }

  // 尝试从 h1 标签中提取
  const h1Match = htmlContent.value.match(/<h1[^>]*>([^<]*)<\/h1>/i)
  if (h1Match && h1Match[1]) {
    return h1Match[1].trim()
  }

  return "HTML Artifacts"
})

// 获取最后几行代码用于终端预览
const lastLines = computed(() => {
  if (!htmlContent.value) return ""
  const lines = htmlContent.value.trim().split("\n")
  return lines.slice(-3).join("\n")
})

const openPopup = () => {
  if (!hasContent.value) return
  popupOpen.value = true
}

const closePopup = () => {
  popupOpen.value = false
}

const handleSave = (newHtml: string) => {
  if (props.onSave) {
    props.onSave(newHtml)
  }
  emit("save", newHtml)
}

const openExternal = async () => {
  if (!hasContent.value) return

  try {
    // 创建临时文件
    const blob = new Blob([htmlContent.value], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    // 在新窗口中打开
    const newWindow = window.open(url, "_blank")
    if (!newWindow) {
      ElMessage.warning({ message: "无法打开新窗口，请检查浏览器设置" })
    }

    // 清理 URL
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 1000)
  } catch (error) {
    console.error("Failed to open external:", error)
    ElMessage.error({ message: "打开外部窗口失败" })
  }
}

const downloadHtml = async () => {
  if (!hasContent.value) return

  try {
    const blob = new Blob([htmlContent.value], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    // 使用标题作为文件名，如果没有则使用时间戳
    const fileName =
      displayTitle.value !== "HTML Artifacts" ? `${displayTitle.value}.html` : `html-artifact-${Date.now()}.html`

    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    ElMessage.success({ message: "下载成功" })
  } catch (error) {
    console.error("Download failed:", error)
    ElMessage.error({ message: "下载失败" })
  }
}
</script>

<style lang="scss" scoped>
.html-artifacts-card {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;
  margin: 10px 0;
  margin-top: 0;
  transition: all 0.3s ease;

  &.streaming {
    border-color: var(--el-color-warning);
    box-shadow: 0 0 0 1px var(--el-color-warning-light-8);
  }
}

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

.card-content {
  padding: 0;
  background: var(--el-bg-color);
}

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

.static-content {
  .button-container {
    margin: 10px 16px;
    display: flex;
    flex-direction: row;
    gap: 8px;
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

  .button-container {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
