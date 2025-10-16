<script setup lang="ts">
const props = defineProps<{
  language: string
  code: string
}>()

const languageClass = computed(() => {
  const lang = props?.language || ""
  return lang ? `language-${String(lang.split(/\s+/g)[0]).replace(/[^\w-]/g, "")}` : ""
})
</script>

<template>
  <pre :class="languageClass"><code>{{ code }}</code></pre>
</template>
