<script setup lang="ts">
interface Props {
  language: string
  code: string
}

const props = defineProps<Props>()

const languageClass = computed(() => {
  const lang = props?.language || ""
  return lang ? `hljs language-${String(lang.split(/\s+/g)[0]).replace(/[^\w-]/g, "")}` : ""
})
</script>

<template>
  <ElScrollbar>
    <pre :class="languageClass" tabindex="0">
      <!-- <code>{{ code }}</code> -->
      <code translate="no" v-text="code"></code>
    </pre>
  </ElScrollbar>
</template>
