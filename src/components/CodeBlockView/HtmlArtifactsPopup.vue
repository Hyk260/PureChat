<template>
  <ElDialog
    v-model="dialogVisible"
    appendToBody
    :showClose="false"
    :title="title"
    :width="dialogWidth"
    :fullscreen="isFullscreen"
    alignCenter
    :closeOnClickModal="false"
    :closeOnPressEscape="true"
    :destroyOnClose="true"
    headerClass="html-artifacts-header"
    bodyClass="html-artifacts-body"
    class="html-artifacts-popup"
    @close="handleClose"
  >
    <template #header>
      <div class="popup-header" @dblclick="toggleFullscreen">
        <div class="header-left">
          <span class="title-text">{{ displayTitle }}</span>
        </div>

        <div class="header-center">
          <div class="view-controls">
            <ElSegmented v-model="viewMode" :options="viewModes">
              <template #default="scope">
                <div class="flex-c gap-5">
                  <component :is="scope.item.icon" :size="15" />
                  <div>{{ scope.item.label }}</div>
                </div>
              </template>
            </ElSegmented>
          </div>
        </div>

        <div class="header-right">
          <ElDropdown trigger="click" @command="handleCapture">
            <div class="flex-c">
              <Camera :size="17" />
            </div>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem command="file">保存为文件</ElDropdownItem>
                <ElDropdownItem command="clipboard">复制到剪贴板</ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>

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
      <SplitView v-else-if="viewMode === 'split'" :code="htmlContent" @change="handleCodeChange" />
      <PreviewPanel v-else :code="htmlContent" />
      <!-- <HtmlEditorView :mode="viewMode" :code="htmlContent" @change="handleCodeChange" /> -->
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { Camera, Code, Eye, Maximize, Minimize, SquareSplitHorizontal as Split, X } from "lucide-vue-next"
import { ElSegmented } from "element-plus"
import { useHtmlArtifacts } from "../../composables/useHtmlArtifacts"
import CodeEditor from "../CodeEditor/CodeEditor.vue"
import PreviewPanel from "../CodeEditor/PreviewPanel.vue"
import SplitView from "../CodeEditor/SplitView.vue"
// import HtmlEditorView, { type ViewMode } from "../CodeEditor/HtmlEditorView.vue"
import emitter from "@/utils/mitt-bus"

type CaptureCommand = "file" | "clipboard"

interface Props {
  title: string
}

const props = defineProps<Props>()

const { extractTitle } = useHtmlArtifacts()

const DEFAULT_WIDTH = "85vw"
const FULLSCREEN_WIDTH = "100vw"

const dialogVisible = ref(false)
const viewMode = ref<"split" | "code" | "preview">("split")
const isFullscreen = ref(false)
const htmlContent = ref("")

const viewModes = [
  { value: "split", label: "分屏 ", icon: Split },
  { value: "code", label: "代码", icon: Code },
  { value: "preview", label: "预览", icon: Eye },
]

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const dialogWidth = computed(() => (isFullscreen.value ? FULLSCREEN_WIDTH : DEFAULT_WIDTH))

const displayTitle = computed(() => extractTitle(htmlContent.value))

const handleCodeChange = (newContent: string) => {
  htmlContent.value = newContent
}

const saveAsFile = async () => {
  const blob = new Blob([htmlContent.value], { type: "text/html" })
  const url = URL.createObjectURL(blob)

  try {
    const link = document.createElement("a")
    link.href = url
    link.download = `${props.title || "html-preview"}.html`
    link.click()

    window.$message?.success("文件已保存")
  } finally {
    URL.revokeObjectURL(url)
  }
}

const handleCapture = async (command: CaptureCommand) => {
  const captureHandlers = {
    file: saveAsFile,
    clipboard: () => window.copyToClipboard(htmlContent.value),
  }
  try {
    await captureHandlers[command]()
  } catch (error) {
    console.error(`捕获操作失败 [${command}]:`, error)
    window.$message?.error("操作失败，请重试")
  }
}

const handleClose = () => {
  dialogVisible.value = false
}

onMounted(() => {
  emitter.on("openHtmlArtifactsPopup", (data) => {
    dialogVisible.value = data.visible
    htmlContent.value = data.code
  })
})

onBeforeUnmount(() => {
  emitter.off("openHtmlArtifactsPopup")
})
</script>

<style>
.html-artifacts-popup {
  padding: 0;
  min-width: 900px;
  height: 85vh;
}
.html-artifacts-header {
  padding-bottom: 0;
  margin: 16px;
}
.html-artifacts-body {
  height: calc(100% - 48px);
}
.is-fullscreen .html-artifacts-body {
  height: calc(100% - 48px);
}
</style>

<style lang="scss" scoped>
.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: relative;
  // padding: 10px;

  .header-left {
    flex: 1;
    display: flex;
    align-items: center;
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

  // .header-center {}

  .header-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    div {
      color: #000000e0;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  // border-radius: 0 0 6px 6px;
  border-radius: 5px;
}
</style>
