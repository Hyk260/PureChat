<template>
  <div class="card-content">
    <GeneratingContent v-if="isStreaming && !hasContent" />
    
    <StreamingContent
      v-else-if="isStreaming && hasContent"
      :last-lines="lastLines"
      @preview="$emit('preview')"
    />
    
    <StaticContent
      v-else
      :has-content="hasContent"
      @preview="$emit('preview')"
      @external="$emit('external')"
      @download="$emit('download')"
    />
  </div>
</template>

<script setup lang="ts">
import GeneratingContent from "./GeneratingContent.vue"
import StaticContent from "./StaticContent.vue"
import StreamingContent from "./StreamingContent.vue"

interface Props {
  isStreaming: boolean
  hasContent: boolean
  lastLines: string
}

defineProps<Props>()

defineEmits<{
  preview: []
  external: []
  download: []
}>()
</script>

<style lang="scss" scoped>
.card-content {
  padding: 0;
  background: var(--el-bg-color);
}
</style>
