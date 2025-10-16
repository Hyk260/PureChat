<template>
  <div class="split-view">
    <div class="code-panel">
      <CodeEditor :code="code" @change="handleCodeChange" />
    </div>

    <div class="preview-panel">
      <PreviewPanel ref="previewPanelRef" :code="code" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from "./CodeEditor.vue"
import PreviewPanel from "./PreviewPanel.vue"

interface Props {
  code: string
}

interface Emits {
  (e: 'change', code: string): void
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
  gap: 1px;
  background: var(--el-border-color);

  .code-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--el-bg-color);
  }

  .preview-panel {
    flex: 1;
    background: white;
    position: relative;
  }
}
</style>
