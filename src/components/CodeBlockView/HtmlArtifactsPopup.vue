<template>
  <Teleport to="body">
    <el-dialog
      v-model="visible"
      :title="title"
      :width="isFullscreen ? '100vw' : '90vw'"
      :fullscreen="isFullscreen"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :destroy-on-close="true"
      class="html-artifacts-popup"
      @close="handleClose"
    >
      <template #header>
        <div class="popup-header" @dblclick="toggleFullscreen">
          <div class="header-left">
            <span class="title-text">{{ title }}</span>
          </div>

          <div class="header-center">
            <div class="view-controls">
              <el-button
                :type="viewMode === 'split' ? 'primary' : 'default'"
                size="small"
                @click="setViewMode('split')"
              >
                <el-icon><Grid /></el-icon>
                分屏
              </el-button>
              <el-button :type="viewMode === 'code' ? 'primary' : 'default'" size="small" @click="setViewMode('code')">
                <el-icon><Document /></el-icon>
                代码
              </el-button>
              <el-button
                :type="viewMode === 'preview' ? 'primary' : 'default'"
                size="small"
                @click="setViewMode('preview')"
              >
                <el-icon><View /></el-icon>
                预览
              </el-button>
            </div>
          </div>

          <div class="header-right">
            <el-dropdown trigger="click" @command="handleCapture">
              <el-button type="text" size="small">
                <el-icon><Camera /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="file">保存为文件</el-dropdown-item>
                  <el-dropdown-item command="clipboard">复制到剪贴板</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-button type="text" size="small" @click="toggleFullscreen">
              <el-icon><FullScreen v-if="!isFullscreen" /><Aim v-else /></el-icon>
            </el-button>

            <el-button type="text" size="small" @click="handleClose">
              <el-icon><Close /></el-icon>
            </el-button>
          </div>
        </div>
      </template>

      <div class="popup-content">
        <div v-if="viewMode === 'split'" class="split-view">
          <div class="code-panel">
            <div class="code-editor">
              <textarea
                v-model="htmlContent"
                class="html-editor"
                placeholder="HTML 代码..."
                @input="handleCodeChange"
              />
            </div>
            <div class="code-toolbar">
              <el-button type="primary" size="small" @click="handleSave">
                {{ saved ? "已保存" : "保存" }}
              </el-button>
            </div>
          </div>

          <div class="preview-panel">
            <div v-if="htmlContent.trim()" class="preview-frame">
              <iframe
                ref="previewFrameRef"
                :srcdoc="htmlContent"
                title="HTML Preview"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
            <div v-else class="empty-preview">
              <p>没有内容可预览</p>
            </div>
          </div>
        </div>

        <div v-else-if="viewMode === 'code'" class="code-only-view">
          <div class="code-editor">
            <textarea v-model="htmlContent" class="html-editor" placeholder="HTML 代码..." @input="handleCodeChange" />
          </div>
          <div class="code-toolbar">
            <el-button type="primary" size="small" @click="handleSave">
              {{ saved ? "已保存" : "保存" }}
            </el-button>
          </div>
        </div>

        <div v-else-if="viewMode === 'preview'" class="preview-only-view">
          <div v-if="htmlContent.trim()" class="preview-frame">
            <iframe
              ref="previewFrameRef"
              :srcdoc="htmlContent"
              title="HTML Preview"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
          <div v-else class="empty-preview">
            <p>没有内容可预览</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { Aim, Camera, Close, Document, FullScreen, Grid, View } from "@element-plus/icons-vue"

import { ElMessage } from "element-plus"

interface Props {
  open: boolean
  title: string
  html: string
  onSave?: (html: string) => void
  onClose: () => void
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const visible = computed({
  get: () => props.open,
  set: (value) => {
    if (!value) {
      handleClose()
    }
  },
})

const viewMode = ref<"split" | "code" | "preview">("split")
const isFullscreen = ref(false)
const saved = ref(false)
const htmlContent = ref("")
const previewFrameRef = ref<HTMLIFrameElement | null>(null)

// 监听 HTML 内容变化
watch(
  () => props.html,
  (newHtml) => {
    htmlContent.value = newHtml
  },
  { immediate: true }
)

// 监听全屏状态，防止 body 滚动
watch(isFullscreen, (isFull) => {
  if (isFull) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }
})

const setViewMode = (mode: "split" | "code" | "preview") => {
  viewMode.value = mode
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const handleCodeChange = () => {
  saved.value = false
}

const handleSave = () => {
  saved.value = true
  ElMessage.success({ message: "保存成功" })

  // 2秒后重置保存状态
  setTimeout(() => {
    saved.value = false
  }, 2000)
}

const handleCapture = async (command: "file" | "clipboard") => {
  if (!previewFrameRef.value) return

  try {
    if (command === "file") {
      // 创建临时文件并下载
      const blob = new Blob([htmlContent.value], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${props.title || "html-preview"}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      ElMessage.success({ message: "文件已保存" })
    } else if (command === "clipboard") {
      // 复制到剪贴板
      await navigator.clipboard.writeText(htmlContent.value)
      ElMessage.success({ message: "已复制到剪贴板" })
    }
  } catch (error) {
    console.error("Capture failed:", error)
    ElMessage.error({ message: "操作失败" })
  }
}

const handleClose = () => {
  // 恢复 body 滚动
  document.body.style.overflow = ""
  props.onClose()
  emit("close")
}

// 组件卸载时恢复 body 滚动
onBeforeUnmount(() => {
  document.body.style.overflow = ""
})
</script>

<style lang="scss" scoped>
.html-artifacts-popup {
  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    position: relative;
    padding: 0;

    .header-left {
      flex: 1;
      min-width: 0;

      .title-text {
        font-size: 16px;
        font-weight: bold;
        color: var(--el-text-color-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
        display: inline-block;
      }
    }

    .header-center {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .view-controls {
        display: flex;
        gap: 8px;
        padding: 4px;
        background: var(--el-bg-color-page);
        border-radius: 8px;
        border: 1px solid var(--el-border-color);
      }
    }

    .header-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
    }
  }

  .popup-content {
    height: 80vh;
    display: flex;
    flex-direction: column;

    .split-view {
      display: flex;
      height: 100%;
      gap: 1px;
      background: var(--el-border-color);

      .code-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: var(--el-bg-color);

        .code-editor {
          flex: 1;
          position: relative;

          .html-editor {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            padding: 16px;
            font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
            font-size: 14px;
            line-height: 1.5;
            background: var(--el-bg-color);
            color: var(--el-text-color-primary);
            resize: none;
            box-sizing: border-box;
          }
        }

        .code-toolbar {
          padding: 12px 16px;
          border-top: 1px solid var(--el-border-color);
          background: var(--el-bg-color-page);
          display: flex;
          justify-content: flex-end;
        }
      }

      .preview-panel {
        flex: 1;
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
    }

    .code-only-view {
      height: 100%;
      display: flex;
      flex-direction: column;
      background: var(--el-bg-color);

      .code-editor {
        flex: 1;
        position: relative;

        .html-editor {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          padding: 16px;
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          font-size: 14px;
          line-height: 1.5;
          background: var(--el-bg-color);
          color: var(--el-text-color-primary);
          resize: none;
          box-sizing: border-box;
        }
      }

      .code-toolbar {
        padding: 12px 16px;
        border-top: 1px solid var(--el-border-color);
        background: var(--el-bg-color-page);
        display: flex;
        justify-content: flex-end;
      }
    }

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
  }
}

// 全屏模式样式
:deep(.el-dialog.is-fullscreen) {
  .popup-content {
    height: calc(100vh - 120px);
  }
}
</style>
