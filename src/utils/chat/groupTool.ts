import { nextTick } from "vue"

import { useChatStore } from "@/stores/modules/chat"

import type { GroupMember } from "@/stores/modules/group/type"

/**
 * 按角色对成员列表进行排序。
 *
 * @param {Array} list - 要排序的成员对象数组。
 * 每个成员对象应具有一个对应于定义角色的 'role' 属性。
 * 示例成员对象: { name: 'Alice', role: 'Member' }
 *
 */
export function sortMembersByRole(list: GroupMember[]) {
  const roles = { Owner: 1, Admin: 2, Member: 3 }

  return list.sort((a, b) => {
    return roles[a.role || "Member"] - roles[b.role || "Member"]
  })
}
/**
 * 机器人排在首位
 * 比较用户ID，确保带有@RBT#的用户排在前面
 */
export const prioritizeRBTUserID = (list: GroupMember[]) => {
  return list.sort((a, b) => {
    const isAHasRBT = a.userID.includes("@RBT#")
    const isBHasRBT = b.userID.includes("@RBT#")
    if (isAHasRBT && !isBHasRBT) return -1 // a在前
    if (isBHasRBT && !isAHasRBT) return 1 // b在前
    return 0 // 两者相等
  })
}

export function findGroupChat(group: { groupID: string }) {
  const { groupID } = group || {}
  nextTick(() => {
    setTimeout(() => {
      const dom = document.getElementById(`message_GROUP${groupID}`)
      if (dom) {
        useChatStore().addConversation({ sessionId: `GROUP${groupID}` })
        dom.scrollIntoView({ behavior: "smooth", block: "center" })
      } else {
        console.warn("定位到群聊失败")
      }
    }, 1350)
  })
}

export const GroupModifyType = {
  name: 60,
  avatar: 100,
  notification: 400,
}

// 获取字符串的字节长度并检查是否超过指定的限制
export const isByteLengthExceedingLimit = (str: string, type: string) => {
  const encoder = new TextEncoder()
  const byteArray = encoder.encode(str)
  const byteLength = byteArray.length
  console.log("byteLength:", byteLength, "type:", type, "modify:", GroupModifyType[type])
  return byteLength > GroupModifyType[type]
}

export const groupSystemNotice = (message) => {
  const groupName = message.payload.groupProfile.name || message.payload.groupProfile.groupID
  switch (message.payload.operationType) {
    case 1:
      return `${message.payload.operatorID} 申请加入群组：${groupName}`
    case 2:
      return `成功加入群组：${groupName}`
    case 3:
      return `申请加入群组：${groupName}被拒绝`
    case 4:
      return `你被管理员${message.payload.operatorID}踢出群组：${groupName}`
    case 5:
      // ${message.payload.operatorID}
      return `群：${groupName} 已被管理员解散`
    case 6:
      return `${message.payload.operatorID}创建群：${groupName}`
    case 7:
      // ${message.payload.operatorID}
      return `管理员邀请你加群：${groupName}`
    case 8:
      return `你退出群组：${groupName}`
    case 9:
      return `你被${message.payload.operatorID}设置为群：${groupName}的管理员`
    case 10:
      return `你被${message.payload.operatorID}撤销群：${groupName}的管理员身份`
    case 12:
      return `${message.payload.operatorID}邀请你加群：${groupName}`
    case 13:
      return `${message.payload.operatorID}同意加群：${groupName}`
    case 14:
      return `${message.payload.operatorID}拒接加群：${groupName}`
    case 255:
      return "自定义群系统通知: " + message.payload.userDefinedField
    default:
      return "待开发"
  }
}
