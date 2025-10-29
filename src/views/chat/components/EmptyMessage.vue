<template>
  <div v-if="!chatStore.currentConversation" :class="[className]">
    <ElEmpty :description="$t('common.emptyText')" :image-size="150" />
    <div v-if="className === 'no-msg'" class="flex-c launch" @click="launch">发起会话</div>
  </div>
</template>

<script setup lang="ts">
import { ElEmpty } from "element-plus"
import { useChatStore, useSidebarStore } from "@/stores"

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
})

const chatStore = useChatStore()
const sidebarStore = useSidebarStore()

function launch() {
  if (__LOCAL_MODE__) {
    sidebarStore.toggleOutside({ path: "/discover" })
  } else {
    sidebarStore.toggleOutside({ path: "/friends" })
  }
}
</script>

<style lang="scss" scoped>
.no-msg {
  color: rgba(0, 0, 0, 0.45);
  margin-top: 50%;
}

.empty {
  height: 100%;
  :deep(.el-empty) {
    height: 100%;
  }
}
.launch {
  cursor: pointer;
  color: #29d;
  font-size: 13px;
}
</style>
