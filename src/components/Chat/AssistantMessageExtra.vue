<template>
  <div class="assistant-message-extra">
    <!-- <Usage
      v-if="content !== LOADING_FLAT && extra?.fromModel"
      :metadata="metadata || {}"
      :model="extra?.fromModel"
      :provider="extra?.fromProvider"
    /> -->
    <ModelIcon :model="'gpt-3.5-turbo'" :size="12" type="mono" />
    gpt-3.5-turbo
  </div>
</template>

<script setup lang="ts">
import { ModelIcon } from "@/components/Features"

interface Props {
  extra?: any
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.assistant-message-extra {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  font-size: 12px;
}
</style>
