<template>
  <div class="group-tip-element-wrapper" @click="onClick(message)">
    {{ getGroupTipContent(message) }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/index';

const props = defineProps({
  message: {
    type: Object,
    default: () => ({}),
  },
})

const userStore = useUserStore()
const userProfile = userStore.userProfile

const isSme = computed(() => userProfile?.userID === props.message.payload.operatorID)

const onClick = (data) => {
  console.log("group-data:", data)
  console.log("group-user:", userProfile)
}

const operator = (message) => {
  const { operatorInfo } = message.payload || {}
  const { userID, nick, role } = operatorInfo || {}
  if (role === 0) return "管理员"
  if (isSme.value) return "你"
  return nick || userID
}

const memberJoin = (message) => {
  // groupJoinType 1: "申请加群" 2: "邀请加群"
  const { groupJoinType, userIDList } = message.payload
  if (userIDList.length === 1) {
    if (userProfile.value?.userID === userIDList[0]) {
      return "你已经是群成员了，和大家打个招呼吧！🎉"
    }
  }
  // 被邀请入群
  if (groupJoinType === 2) {
    return `${operator(message) || "管理员"} 邀请 ${message.nick || userIDList[0]} 加入群聊`
  }
  return `${message.nick || userIDList[0]} 加入群聊 🎉`
}

const memberProfileUpdated = (message) => {
  for (let member of message.payload.memberList) {
    if (member.muteTime > 0) {
      return `群成员：${member.userID}被禁言${member.muteTime}秒`
    } else {
      return `群成员：${member.userID}被取消禁言`
    }
  }
}

const getGroupTipContent = (message) => {
  const { userIDList, operationType } = message.payload
  const userName = message?.nick || userIDList.join(",")
  switch (operationType) {
    // 1 有成员加群
    case 1:
      return memberJoin(message)
    // 2	有群成员退群
    case 2:
      return `${userName} 退出群聊`
    // 3	有群成员被踢出群
    case 3:
      return `${operator(message)} 将 ${userName} 移出群聊`
    // 4	有群成员被设为管理员
    case 4:
      return `${userName} 被设置为管理员`
    // 5	有群成员被撤销管理员
    case 5:
      return `${userName} 被撤销管理员`
    // 6	群组资料变更
    case 6:
      return "群资料修改"
    // 7	群成员资料变更，例如：群成员被禁言
    case 7:
      return memberProfileUpdated(message)
    default:
      return "[群提示消息]"
  }
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
