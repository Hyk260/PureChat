<template>
  <div class="group-tip-element-wrapper" @click="onClick">
    {{ groupTipContent }}
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/modules/user"

import type { DB_Message, GroupTipPayloadType } from "@pure/database/schemas"

interface Props {
  message: DB_Message
}

const props = defineProps<Props>()

const userStore = useUserStore()

const userProfile = computed(() => userStore.userProfile)

const groupTipContent = computed(() => getGroupTipContent(props.message))

const isCurrentUserOperator = computed(() => {
  const payload = getPayload(props.message)
  return userProfile.value?.userID === payload.operatorID
})

const getPayload = (message: DB_Message) => {
  return message.payload as GroupTipPayloadType
}

const onClick = () => {
  console.log("group-data:", props.message)
  console.log("group-user:", userProfile.value)
}

const getOperatorName = (message: DB_Message) => {
  const payload = getPayload(message)
  const { userID, nick, role } = payload?.operatorInfo || {}
  if (role === 0) return "管理员"
  if (isCurrentUserOperator.value) return "你"
  return nick || userID || "未知用户"
}

const handleMemberJoin = (message: DB_Message) => {
  const payload = getPayload(message)
  const { groupJoinType, userIDList = [] } = payload

  if (userIDList.length === 1) {
    if (userProfile.value?.userID === userIDList[0]) {
      return "你已经是群成员了，和大家打个招呼吧！🎉"
    }
  }
  // 被邀请入群
  if (groupJoinType === 2) {
    return `${getOperatorName(message) || "管理员"} 邀请 ${message.nick || userIDList[0]} 加入群聊`
  }

  return `${message.nick || userIDList[0]} 加入群聊 🎉`
}

/**
 * 处理成员资料变更（禁言/取消禁言）提示
 */
const handleMemberProfileUpdate = (message: DB_Message) => {
  const payload = getPayload(message)
  const { memberList = [] } = payload

  for (const member of memberList) {
    const { userID, muteTime } = member
    if (muteTime > 0) {
      return `群成员：${userID} 被禁言 ${muteTime} 秒`
    } else if (muteTime === 0) {
      return `群成员：${userID} 被取消禁言`
    }
  }

  return ""
}

const operationHandlers = {
  1: handleMemberJoin, // 成员加群
  2: (message: DB_Message) => {
    // 成员退群
    const { userIDList = [] } = getPayload(message)
    const userName = message.nick || userIDList.join(",")
    return `${userName} 退出群聊`
  },
  3: (message: DB_Message) => {
    // 成员被踢出群
    const { userIDList = [] } = getPayload(message)
    const userName = message.nick || userIDList.join(",")
    return `${getOperatorName(message)} 将 ${userName} 移出群聊`
  },
  4: (message: DB_Message) => {
    // 设为管理员
    const { userIDList = [] } = getPayload(message)
    const userName = message.nick || userIDList.join(",")
    return `${userName} 被设置为管理员`
  },
  5: (message: DB_Message) => {
    // 撤销管理员
    const { userIDList = [] } = getPayload(message)
    const userName = message.nick || userIDList.join(",")
    return `${userName} 被撤销管理员`
  },
  6: () => "群资料修改", // 群组资料变更
  7: handleMemberProfileUpdate, // 群成员资料变更（禁言等）
}

const getGroupTipContent = (message: DB_Message) => {
  const { operationType } = getPayload(message)
  const handler = operationHandlers[operationType as keyof typeof operationHandlers]
  return handler ? handler(message) : "[群提示消息]"
}
</script>

<style lang="scss" scoped>
.group-tip-element-wrapper {
  font-size: 12px;
  border-radius: 3px;
  vertical-align: middle;
  word-wrap: normal;
  word-break: break-all;
  color: var(--color-time-divider);
  padding: 6px 6px;
  line-height: 16px;
}
</style>
