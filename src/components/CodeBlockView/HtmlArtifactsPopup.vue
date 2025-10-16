<template>
  <Teleport to="body">
    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :title="title"
      :width="isFullscreen ? '100vw' : '85vw'"
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
                v-for="mode in viewModes"
                :key="mode.value"
                :type="viewMode === mode.value ? 'primary' : 'default'"
                @click="setViewMode(mode.value)"
              >
                <div class="flex-c gap-5">
                  <component :is="mode.icon" :size="16" />
                  <span>{{ mode.label }}</span>
                </div>
              </el-button>
            </div>
          </div>

          <div class="header-right">
            <el-dropdown trigger="click" @command="handleCapture">
              <div class="flex-c">
                <Camera :size="16" />
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="file">保存为文件</el-dropdown-item>
                  <el-dropdown-item command="clipboard">复制到剪贴板</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <div class="flex-c" @click="toggleFullscreen">
              <Minimize v-if="isFullscreen" :size="16" />
              <Maximize v-else :size="16" />
            </div>

            <div class="flex-c" @click="handleClose">
              <X :size="16" />
            </div>
          </div>
        </div>
      </template>

      <div class="popup-content">
        <CodeEditor v-if="viewMode === 'code'" :code="htmlContent" @change="handleCodeChange" />
        <PreviewPanel v-else-if="viewMode === 'preview'" ref="previewPanelRef" :code="htmlContent" />
        <SplitView v-else ref="splitViewRef" :code="htmlContent" @change="handleCodeChange" />
      </div>
    </el-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { Camera, Code, Eye, Maximize, Minimize, SquareSplitHorizontal as Split, X } from "lucide-vue-next"

import { ElMessage } from "element-plus"

import CodeEditor from "../CodeEditor/CodeEditor.vue"
import PreviewPanel from "../CodeEditor/PreviewPanel.vue"
import SplitView from "../CodeEditor/SplitView.vue"

type ViewMode = "split" | "code" | "preview"

interface Props {
  open: boolean
  title: string
  html: string
  onClose: () => void
}

interface Emits {
  (e: 'close'): void
  (e: 'content-change', html: string): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const viewModes = [
  { value: "split", label: "分屏", icon: Split },
  { value: "code", label: "代码", icon: Code },
  { value: "preview", label: "预览", icon: Eye },
]

const dialogVisible = computed({
  get: () => props.open,
  set: (value) => {
    if (!value) {
      handleClose()
    }
  },
})

const viewMode = ref<ViewMode>("split")
const isFullscreen = ref(false)
const htmlContent = ref("")
const previewPanelRef = ref<InstanceType<typeof PreviewPanel> | null>(null)
const splitViewRef = ref<InstanceType<typeof SplitView> | null>(null)

watch(
  () => props.html,
  (newHtml) => {
    htmlContent.value = newHtml
  },
  { immediate: true }
)

watch(isFullscreen, (isFull) => {
  document.body.style.overflow = isFull ? "hidden" : ""
})

const setViewMode = (mode: "split" | "code" | "preview") => {
  viewMode.value = mode
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const handleCodeChange = (newContent: string) => {
  htmlContent.value = newContent
  emit("content-change", newContent)
}

const handleCapture = async (command: "file" | "clipboard") => {
  try {
    if (command === "file") {
      await downloadHtmlFile()
    } else if (command === "clipboard") {
      await copyToClipboard()
    }
  } catch (error) {
    console.error("Capture failed:", error)
    ElMessage.error({ message: "操作失败" })
  }
}

const downloadHtmlFile = async () => {
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
}

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(htmlContent.value)
  ElMessage.success({ message: "已复制到剪贴板" })
}

const handleClose = () => {
  document.body.style.overflow = ""
  props.onClose()
  emit("close")
}

onBeforeUnmount(() => {
  document.body.style.overflow = ""
})
</script>

<style lang="scss" scoped>
:deep(.el-dialog.is-fullscreen) {
  .popup-content {
    height: calc(100vh - 120px);
  }
}
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
        // gap: 8px;
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
      div {
        cursor: pointer;
        border-radius: 4px;
        width: 24px;
        height: 24px;
        &:hover {
          background: rgba(0, 0, 0, 0.03);
        }
      }
    }
  }

  .popup-content {
    height: 80vh;
    display: flex;
    flex-direction: column;
  }
}
</style>
