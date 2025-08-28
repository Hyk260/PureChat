<template>
  <div v-show="isGroup && !shouldDisplay" class="message-name">
    <span v-if="isSystem" class="isSystem">系统通知</span>
    <span v-else-if="isFound" class="isFound">管理员</span>
    <span v-else-if="isGroup" class="isGroup" :class="{ 'mention-self': isSelf(item) }" @click="handleAt">
      <span :class="styleNick">{{ item.nick || item.from }}</span>
      <span v-if="!isSelf(item)" class="mention">@</span>
      <span v-if="isLeader" class="admin">群主</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

import { useChatStore, useGroupStore } from "@/stores"
import { isSelf } from "@/utils/chat"
import emitter from "@/utils/mitt-bus"

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
})

const groupStore = useGroupStore()
const chatStore = useChatStore()

const groupProfile = computed(() => groupStore.groupProfile)
const isMultiSelectMode = computed(() => chatStore.isMultiSelectMode)
const isLeader = computed(() => groupProfile.value?.ownerID === props.item.from)
const from = computed(() => props.item.from)
const chatType = computed(() => props.item.conversationType)
const isGroup = computed(() => chatType.value !== "C2C")
const isSystem = computed(() => from.value === "@TIM#SYSTEM")
const isFound = computed(() => from.value === "@TLS#NOT_FOUND")
const shouldDisplay = computed(() => props.item.isRevoked || props.item.type === "TIMGroupTipElem")
const styleNick = computed(() => (isMultiSelectMode.value ? "" : "nick"))

function handleAt() {
  if (isMultiSelectMode.value) return
  if (isSelf(props.item)) return
  emitter.emit("handleAt", { id: from.value, name: props.item.nick })
}
</script>

<style lang="scss" scoped>
.message-name {
  margin-bottom: 5px;
  white-space: nowrap;
  color: var(--color-time-divider);
  font-size: 12px;
}

.admin {
  white-space: nowrap;
  background: #e6f7ff;
  border: 1px solid rgb(145, 213, 255);
  color: #1890ff;
  border-radius: 2px;
  font-size: 10px;
  padding: 0 4px;
  display: inline-block;
}

.isGroup {
  cursor: pointer;

  .mention {
    visibility: hidden;
  }

  &:hover {
    .mention,
    .nick {
      color: rgb(84, 180, 239);
      visibility: visible;
    }
  }
}
.mention-self {
  display: flex;
  flex-direction: row-reverse;
  .admin {
    margin-right: 6px;
  }
}
</style>
