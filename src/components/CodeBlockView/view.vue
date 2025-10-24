<template>
  <HtmlArtifactsCard
    v-if="isHtml"
    :html="htmlContent"
    :is-streaming="isStreaming"
    :on-save="handleSave"
    @save="handleSave"
  />

  <CodeBlockDisplay v-else :code="children" :language="language" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { ElMessage } from "element-plus"
import HtmlArtifactsCard from "./HtmlArtifactsCard.vue"
import CodeBlockDisplay from "./components/CodeBlockDisplay.vue"

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
  window.$message?.success("保存成功")
}
</script>

<style lang="scss" scoped>
// 样式已移至子组件中，这里不再需要重复定义
</style>
