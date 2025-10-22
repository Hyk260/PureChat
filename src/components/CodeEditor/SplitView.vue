<template>
  <div class="split-view">
    <el-splitter>
      <el-splitter-panel :min="400">
        <div class="code-panel">
          <CodeEditor :code="code" @change="handleCodeChange" />
        </div>
      </el-splitter-panel>
      <el-splitter-panel :min="400">
        <div class="preview-panel">
          <PreviewPanel ref="previewPanelRef" :code="code" />
        </div>
      </el-splitter-panel>
    </el-splitter>
  </div>
</template>

<script setup lang="ts">
import { ElSplitter, ElSplitterPanel } from "element-plus"
import CodeEditor from "./CodeEditor.vue"
import PreviewPanel from "./PreviewPanel.vue"

interface Props {
  code: string
}

interface Emits {
  (e: "change", code: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const previewPanelRef = ref<InstanceType<typeof PreviewPanel> | null>(null)

const handleCodeChange = (newCode: string) => {
  emit("change", newCode)
}

defineExpose({ previewPanelRef })
</script>

<style lang="scss" scoped>
.split-view {
  display: flex;
  height: 100%;
  background: var(--el-border-color);

  .code-panel {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--el-bg-color);
    min-width: 400px;
  }

  .preview-panel {
    height: 100%;
    flex: 1;
    background: white;
    min-width: 400px;
  }
}
</style>
