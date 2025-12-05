<template>
  <div v-if="showPortal && IS_LOCAL_MODE && currentConversation" class="topic-panel">
    
  </div>
</template>

<script setup>
import { useChatStore, usePortalStore } from "@/stores"

const portalStore = usePortalStore()
const chatStore = useChatStore()

const { showPortal } = storeToRefs(portalStore)
const { currentConversation } = storeToRefs(chatStore)
</script>

<style lang="scss" scoped>
.topic-panel {
  flex: 0 0 auto;
  height: 100%;
  max-height: 100vh;
  min-width: 280px;
  border-left: 1px solid var(--color-border-default);
}
</style>
