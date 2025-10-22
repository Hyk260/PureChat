<template>
  <div class="code-only-view">
    <div class="code-editor">
      <template v-if="!useTextarea && VueMonacoEditor">
        <VueMonacoEditor
          :value="code"
          :language="language"
          :theme="theme"
          :options="editorOptions"
          @mount="handleEditorMount"
          @change="handleCodeChange"
        />
      </template>
      <textarea
        v-else
        :value="code"
        :readonly="readOnly"
        class="html-editor"
        placeholder="HTML 代码..."
        @input="handleTextareaInput"
      />
    </div>
    <div class="code-toolbar">
      <el-tooltip
        v-if="!useTextarea"
        content="格式化"
        :show-arrow="false"
        :offset="8"
        transition="slide-fade"
        placement="top"
      >
        <el-button circle @click="formatCode">
          <Sparkles :size="16" />
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="false" content="保存" :show-arrow="false" :offset="8" transition="slide-fade" placement="top">
        <el-button circle @click="handleSaveChange">
          <Save :size="16" />
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Save, Sparkles } from "lucide-vue-next"

import { MONACO_OPTIONS } from "@/config/monaco-editor-config"

import type { editor } from "monaco-editor"

interface Props {
  code: string
  language?: string
  theme?: string
  readOnly?: boolean
  debounce?: number
}

interface Emits {
  (e: "change", code: string): void
}

const props = withDefaults(defineProps<Props>(), {
  language: "html",
  theme: "vs-dark", // hc-black hc-light vs-dark
  readOnly: false,
  debounce: 300,
})

const emit = defineEmits<Emits>()

const useTextarea = ref(false)
const VueMonacoEditor = shallowRef<Component | null>(null)
const editorInstance = shallowRef<editor.IStandaloneCodeEditor>()

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const editorOptions = computed<editor.IStandaloneEditorConstructionOptions>(() => ({
  ...MONACO_OPTIONS,
  readOnly: props.readOnly,
  language: "html",
}))

const handleEditorMount = (editor: editor.IStandaloneCodeEditor) => {
  editorInstance.value = editor
  // setupCustomContextMenu(editor)
  editor.focus()
}

const handleSaveChange = () => {}

const loadMonacoEditor = async () => {
  try {
    const module = await import("@guolao/vue-monaco-editor")
    VueMonacoEditor.value = module.VueMonacoEditor
  } catch (error) {
    console.warn("Monaco Editor 加载失败，切换到备用编辑器:", error)
    useTextarea.value = true
  }
}

const emitChangeDebounced = (value: string) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    emit("change", value)
    debounceTimer = null
  }, props.debounce)
}

const handleTextareaInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emitChangeDebounced(target.value)
}

const handleCodeChange = (value: string | undefined) => {
  emitChangeDebounced(value ?? "")
}

const formatCode = () => {
  editorInstance.value?.getAction("editor.action.formatDocument")?.run()
}

watch(
  () => props.code,
  (newValue) => {
    if (!editorInstance.value) return

    const currentValue = editorInstance.value?.getValue()
    if (newValue !== currentValue) {
      const position = editorInstance.value.getPosition()
      editorInstance.value.setValue(newValue)
      if (position) {
        // 恢复光标位置
        editorInstance.value.setPosition(position)
      }
    }
  }
)

const clearCode = () => {
  const emptyValue = ""

  if (editorInstance.value) {
    editorInstance.value.setValue(emptyValue)
  }

  emit("change", emptyValue)
}

const getCode = (): string => {
  return editorInstance.value?.getValue() || props.code
}

const focusEditor = () => {
  if (editorInstance.value) {
    editorInstance.value.focus()
  } else if (useTextarea.value) {
    // 如果是 textarea，获取 DOM 元素并聚焦
    nextTick(() => {
      const textarea = document.querySelector(".html-editor") as HTMLTextAreaElement
      textarea?.focus()
    })
  }
}

const getEditor = () => {
  return editorInstance.value
}

onMounted(() => {
  loadMonacoEditor()
})

onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})

defineExpose({
  formatCode,
  clearCode,
  getCode,
  focus: focusEditor,
  getEditor,
})
</script>

<style lang="scss" scoped>
.code-only-view {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;

  .code-editor {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
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

  .code-toolbar {
    right: 12px;
    bottom: 10px;
    position: absolute;
  }
}
</style>
