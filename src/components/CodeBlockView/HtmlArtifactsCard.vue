<template>
  <div class="html-artifacts-card" :class="{ streaming: isStreaming }">
    <CardHeader :is-streaming="isStreaming" :title="displayTitle" />

    <CardContent
      :is-streaming="isStreaming"
      :has-content="hasContent"
      :last-lines="lastLines"
      @preview="openPopup"
      @external="openExternal"
      @download="downloadHtml"
    />

    <!-- HTML 预览弹窗 -->
    <HtmlArtifactsPopup
      :open="popupOpen"
      :title="displayTitle"
      :html="htmlContent"
      :on-save="onSave"
      @close="closePopup"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { useHtmlArtifacts } from "@/composables/useHtmlArtifacts"

import CardContent from "./components/CardContent.vue"
import CardHeader from "./components/CardHeader.vue"
import HtmlArtifactsPopup from "./HtmlArtifactsPopup.vue"

interface Props {
  html: string
  onSave?: (html: string) => void
  isStreaming?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isStreaming: false,
})

const emit = defineEmits<{
  save: [html: string]
}>()

const {
  popupOpen,
  extractTitle,
  getLastLines,
  downloadHtml: downloadHtmlFile,
  openExternal: openExternalWindow,
} = useHtmlArtifacts()

const htmlContent = computed(() => props.html || "")
const hasContent = computed(() => htmlContent.value.trim().length > 0)
const displayTitle = computed(() => extractTitle(htmlContent.value))
const lastLines = computed(() => getLastLines(htmlContent.value))

const openPopup = () => {
  if (!hasContent.value) return
  popupOpen.value = true
}

const closePopup = () => {
  popupOpen.value = false
}

const handleSave = (newHtml: string) => {
  if (props.onSave) {
    props.onSave(newHtml)
  }
  emit("save", newHtml)
}

const openExternal = () => {
  if (!hasContent.value) return
  openExternalWindow(htmlContent.value)
}

const downloadHtml = () => {
  if (!hasContent.value) return
  downloadHtmlFile(htmlContent.value, displayTitle.value)
}
</script>

<style lang="scss" scoped>
.html-artifacts-card {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;
  margin: 10px 0;
  margin-top: 0;
  transition: all 0.3s ease;

  &.streaming {
    border-color: var(--el-color-warning);
    box-shadow: 0 0 0 1px var(--el-color-warning-light-8);
  }
}
</style>
