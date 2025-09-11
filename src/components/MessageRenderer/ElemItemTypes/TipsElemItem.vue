<template>
  <div class="message-view_withdraw" @click="onClick">
    <span class="withdraw">
      <span> {{ getChangeType() }} </span>
      <el-icon v-show="!isReEdit && message.type !== 'TIMCustomElem'" class="close" @click.stop="onClose(message)">
        <CircleCloseFilled />
      </el-icon>
    </span>
    <span v-if="isReEdit" class="edit" @click.stop="onEdit">重新编辑</span>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue"
import { CircleCloseFilled } from "@element-plus/icons-vue"

import { DB_Message } from "@/database/schemas/message"
import { useChatStore, useUserStore } from "@/stores"
import emitter from "@/utils/mitt-bus"

const props = defineProps({
  message: {
    type: Object as PropType<DB_Message>,
    default: () => ({}),
  },
})

const chatStore = useChatStore()
const userStore = useUserStore()

const isMine = computed(() => props.message.flow === "out")
const isReEdit = computed(() => chatStore.revokeMsgMap.get(props.message.ID))

async function onClose(data: DB_Message) {
  chatStore.deleteMessage({
    sessionId: data.conversationID,
    messageIdArray: [data.ID],
    message: [data],
  })
}

function onClick() {
  console.log(chatStore.revokeMsgMap)
}

function onEdit() {
  const data = props.message
  emitter.emit("handleSetHtml", data?.payload?.text)
  chatStore.updateRevokeMsg({ data, type: "delete" })
}

function getChangeType() {
  const { conversationType: type, nick, from, revokerInfo } = props.message
  const isGroup = type === "GROUP"
  const isC2C = type === "C2C"
  if (isMine.value) {
    if (isGroup) {
      if (from !== revokerInfo?.userID) {
        return `${revokerInfo?.nick} 撤回了一条成员消息`
      }
    }
    return "你撤回了一条消息"
  } else {
    if (isC2C) {
      return "对方撤回了一条消息"
    }
    if (isGroup) {
      if (from !== revokerInfo?.userID) {
        const name = userStore.userProfile?.nick === revokerInfo?.nick ? "你" : revokerInfo?.nick
        return `${name} 撤回了成员 ${nick} 的一条消息`
      }
      return `${nick} 撤回了一条消息`
    } else {
      return "撤回了一条消息"
    }
  }
}
</script>

<style lang="scss" scoped>
.message-view_withdraw {
  font-size: 12px;
  vertical-align: middle;
  word-wrap: normal;
  word-break: break-all;
  margin-top: 5px;
  line-height: 16px;
  display: flex;
  align-items: center;
  .withdraw {
    display: flex;
    align-items: center;
    color: var(--color-time-divider);
    padding: 4px 6px;
    .close {
      margin-left: 4px;
      cursor: pointer;
    }
  }
  .edit {
    user-select: none;
    color: #337ecc;
    cursor: pointer;
  }
}
</style>
