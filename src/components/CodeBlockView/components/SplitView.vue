<template>
  <div class="split-view">
    <div class="code-panel">
      <div class="code-editor">
        <textarea :value="modelValue" class="html-editor" placeholder="HTML 代码..." @input="handleInput" />
      </div>
      <div class="code-toolbar">
        <el-button type="primary" @click="$emit('save')">
          {{ saved ? "已保存" : "保存" }}
        </el-button>
      </div>
    </div>

    <div class="preview-panel">
      <div v-if="modelValue.trim()" class="preview-frame">
        <iframe
          ref="iframeRef"
          :srcdoc="modelValue"
          title="HTML Preview"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
      <div v-else class="empty-preview">
        <p>没有内容可预览</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  saved: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
  change: []
  save: []
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit("update:modelValue", target.value)
  emit("change")
}

defineExpose({ iframeRef })
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
</style>
