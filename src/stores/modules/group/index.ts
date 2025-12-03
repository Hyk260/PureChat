import { defineStore } from "pinia"

import {
  createGroup,
  dismissGroup,
  getGroupList,
  getGroupMemberList,
  getGroupProfile,
  quitGroup,
} from "@/service/im-sdk-api"
import { useChatStore, useUserStore } from "@/stores"
import { SetupStoreId } from "@/stores/enum"
import { findGroupChat, sortMembersByRole } from "@/utils/chat"

import type {
  GroupState,
  HandleCreateGroupPayload,
  HandleDismissGroupPayload,
  HandleGroupMemberListPayload,
  HandleGroupProfilePayload,
  HandleQuitGroupPayload,
  SetGroupProfilePayload,
} from "./type"

import type { GroupMemberType as GroupMember } from "@/types"

export const useGroupStore = defineStore(SetupStoreId.Group, {
  state: (): GroupState => ({
    groupList: [], // 群组列表
    groupProfile: null, // 群聊数据
    currentMemberList: [], // 当前群组成员列表
  }),
  getters: {
    hasGroupList(): boolean {
      return this.groupList.length > 0
    },
    isOwner(): boolean {
      return this.groupProfile?.selfInfo?.role === "Owner"
    },
    isAdmin(): boolean {
      return this.groupProfile?.selfInfo?.role === "Admin"
    },
    currentMembersWithoutSelf(): GroupMember[] {
      return this.currentMemberList.filter((t) => t.userID !== useUserStore().userProfile?.userID)
    },
  },
  actions: {
    setGroupProfile(payload: SetGroupProfilePayload) {
      this.groupProfile = payload.groupProfile
    },
    async handleGroupMemberList(payload: HandleGroupMemberListPayload) {
      const { isSort = true, groupID = "" } = payload || {}
      const groupId = groupID.replace("GROUP", "") || useChatStore().toAccount

      if (!groupId) {
        console.error("群ID不存在")
        return
      }
      const { memberList, code } = await getGroupMemberList({ groupID: groupId })
      if (code !== 0) return
      if (isSort) {
        this.currentMemberList = sortMembersByRole(memberList)
      } else {
        this.currentMemberList = memberList
      }
    },
    async handleGroupList() {
      const { code, groupList } = await getGroupList()
      if (code !== 0) return
      this.groupList = groupList
    },
    async handleQuitGroup(payload: HandleQuitGroupPayload) {
      const { sessionId, groupId } = payload
      const { code } = await quitGroup({ groupId })
      if (code !== 0) return
      useChatStore().deleteSession({ sessionId })
    },
    async handleCreateGroup(payload: HandleCreateGroupPayload) {
      const { groupName, positioning = true } = payload
      const { code, group } = await createGroup({ groupName })
      if (code !== 0) return
      if (positioning) {
        findGroupChat(group)
      }
    },
    async handleDismissGroup(payload: HandleDismissGroupPayload) {
      const { sessionId, groupId } = payload
      const { code, groupID } = await dismissGroup(groupId)
      console.log("解散群组 dismissGroup:", code, groupID)
      if (code !== 0) {
        console.error("解散群组 error:", code, groupID)
        return
      }
      useChatStore().deleteSession({ sessionId })
    },
    async handleGroupProfile(payload: HandleGroupProfilePayload) {
      const { type } = payload
      if (type !== "GROUP") return
      if (!payload.groupProfile?.groupID) return
      const { groupID } = payload.groupProfile
      const { code, data } = await getGroupProfile({ groupID })
      if (code !== 0) return
      this.setGroupProfile({ groupProfile: data })
    },
  },
})
