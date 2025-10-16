<template>
  <div v-if="isHtml" class="html-view">
    <HtmlArtifactsCard :html="htmlContent" :is-streaming="isStreaming" :on-save="handleSave" @save="handleSave" />
  </div>

  <div v-else class="code-block-view">
    <div class="code-header">
      <span class="language-tag">{{ `<${language.toUpperCase()}>` }}</span>
    </div>
    <div class="code-content">
      <pre class="code-block">
        <code :class="`language-${language}`">
          {{ children }}
        </code>
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { ElMessage } from "element-plus"
import HtmlArtifactsCard from "./HtmlArtifactsCard.vue"

interface Props {
  children: string
  language: string
  onSave?: (newContent: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  language: "plaintext",
})

const emit = defineEmits<{
  save: [content: string]
}>()

const isStreaming = ref(false)
const htmlContent = ref(props.children)

// 判断是否为 HTML 语言
const isHtml = computed(() => {
  const lang = props.language.toLowerCase()
  return lang === "html" || lang === "htm"
})

// 监听 children 变化
watch(
  () => props.children,
  (newContent) => {
    htmlContent.value = newContent
  },
  { immediate: true }
)

// 处理保存
const handleSave = (newContent: string) => {
  if (props.onSave) {
    props.onSave(newContent)
  }
  emit("save", newContent)
  ElMessage.success({ message: "保存成功" })
}
</script>

<style lang="scss" scoped>
.html-view {
  width: 100%;
}

.code-block-view {
  position: relative;
  width: 100%;
  min-width: 45ch;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;

  .code-header {
    display: flex;
    align-items: center;
    color: var(--el-text-color-primary);
    font-size: 14px;
    line-height: 1;
    font-weight: bold;
    padding: 0 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 34px;
    background-color: var(--el-bg-color-page);
    border-bottom: 1px solid var(--el-border-color);

    .language-tag {
      color: var(--el-text-color-primary);
    }
  }

  .code-content {
    .code-block {
      margin: 0;
      padding: 16px;
      background: var(--el-bg-color);
      color: var(--el-text-color-primary);
      font-family: var(--el-font-family-mono);
      font-size: 14px;
      line-height: 1.6;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-word;

      code {
        background: transparent;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }
    }
  }
}
</style>
