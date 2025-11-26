<template>
  <CodeBlockView :children="code" :language="language" :onSave="onSave" @save="handleSave" />
</template>

<script setup lang="ts">
import CodeBlockView from "./view.vue"

interface Props {
  code: string
  language?: string
  onSave?: (newContent: string) => void
}

withDefaults(defineProps<Props>(), {
  language: "plaintext",
})

const emit = defineEmits<{
  save: [content: string]
}>()

const handleSave = (content: string) => {
  emit("save", content)
}
</script>

<style lang="scss" scoped></style>
