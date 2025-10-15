<script setup lang="ts">
const props = defineProps<{
  node: {
    type: "code_block"
    language: string
    code: string
    raw: string
    diff?: boolean
  }
}>()

const languageClass = computed(() => {
  const lang = props.node?.language || ""
  return lang ? `language-${String(lang.split(/\s+/g)[0]).replace(/[^\w-]/g, "")}` : ""
})
</script>

<template>
  <pre :class="languageClass"><code>{{ node.code }}</code></pre>
</template>
