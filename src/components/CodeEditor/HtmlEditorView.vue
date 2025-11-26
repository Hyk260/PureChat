<template>
  <div class="html-editor-view">
    <div
      class="editor-container"
      :class="{
        'is-split': mode === 'split',
        'is-editor-only': mode === 'editor',
        'is-hidden': mode === 'preview',
      }"
    >
      <CodeEditor
        :code="code"
        :language="language"
        :theme="theme"
        :readOnly="readOnly"
        :debounce="debounce"
        @change="handleCodeChange"
      />
    </div>

    <div
      v-show="mode === 'split' || mode === 'preview'"
      class="preview-container"
      :class="{
        'is-split': mode === 'split',
        'is-preview-only': mode === 'preview',
      }"
    >
      <PreviewPanel :code="code" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from "./CodeEditor.vue"
import PreviewPanel from "./PreviewPanel.vue"

/**
 * 视图模式类型
 * - split: 分屏模式（代码编辑器 + 预览面板）
 * - editor: 纯代码编辑模式
 * - preview: 纯预览模式
 */
export type ViewMode = "split" | "editor" | "preview"

interface Props {
  /** 当前显示模式 */
  mode: ViewMode
  /** HTML 代码内容 */
  code: string
  /** 编辑器语言 */
  language?: string
  /** 编辑器主题 */
  theme?: string
  /** 是否只读 */
  readOnly?: boolean
  /** 防抖延迟（毫秒） */
  debounce?: number
}

interface Emits {
  (e: "change", value: string): void
}

withDefaults(defineProps<Props>(), {
  language: "html",
  theme: "vs-dark",
  readOnly: false,
  debounce: 300,
})

const emit = defineEmits<Emits>()

const handleCodeChange = (newCode: string) => {
  emit("change", newCode)
}
</script>

<style lang="scss" scoped>
.html-editor-view {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 1px;
  background: var(--el-border-color);
}

.editor-container {
  height: 100%;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  &.is-split {
    flex: 1;
  }

  &.is-editor-only {
    flex: 1;
    width: 100%;
  }

  &.is-hidden {
    display: none;
  }
}

.preview-container {
  height: 100%;
  flex: 1;
  min-width: 0;
  overflow: hidden;

  &.is-split {
    flex: 1;
  }

  &.is-preview-only {
    flex: 1;
    width: 100%;
  }
}
</style>
