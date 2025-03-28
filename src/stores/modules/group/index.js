import { defineStore } from 'pinia';
import {
  getGroupList,
  getGroupProfile,
  getGroupMemberList,
  quitGroup,
  createGroup,
  dismissGroup,
} from "@/api/im-sdk-api/index";
import { sortMembersByRole, findGroupChat } from "@/utils/chat/index";
import { SetupStoreId } from '../../plugins/index';
import { useChatStore, useUserStore } from "@/stores/index";

export const useGroupStore = defineStore(SetupStoreId.Group, {
  state: () => ({
    groupList: [], // 群组列表
    groupProfile: {}, // 群聊数据
    currentMemberList: [], // 当前群组成员列表
  }),
  getters: {
    hasGroupList() {
      return this.groupList.length > 0
    },
    isOwner() {
      return this.groupProfile?.selfInfo?.role === "Owner"
    },
    isAdmin() {
      return this.groupProfile?.selfInfo?.role === "Admin"
    },
    currentMembersWithoutSelf() {
      return this.currentMemberList.filter((t) => t.userID !== useUserStore().userProfile?.userID)
    }
  },
  actions: {
    // 更新群详情
    setGroupProfile(payload) {
      this.groupProfile = payload;
    },
    // 获取群成员列表
    async handleGroupMemberList(payload) {
      const { isSort = true, groupID = "" } = payload || {};
      const groupId = groupID.replace("GROUP", "") // || this.toAccount;

      if (!groupId) {
        console.error("群ID不存在");
        return;
      }
      const { memberList, code } = await getGroupMemberList({ groupID: groupId });
      if (code !== 0) return;
      if (isSort) {
        this.currentMemberList = sortMembersByRole(memberList);
      } else {
        this.currentMemberList = memberList;
      }
    },
    // 获取群列表数据
    async handleGroupList() {
      const { code, groupList } = await getGroupList();
      if (code !== 0) return;
      this.groupList = groupList;
    },
    // 退出群聊
    async handleQuitGroup(payload) {
      const { groupId, convId } = payload;
      const { code } = await quitGroup({ groupId });
      if (code !== 0) return;
      useChatStore().deleteSession({ convId });
    },
    // 创建群聊
    async handleCreateGroup(payload) {
      const { groupName, positioning = true } = payload;
      const { code, group } = await createGroup({ groupName });
      if (code !== 0) return;
      if (positioning) {
        // 定位到群聊
        findGroupChat(group);
      }
    },
    // 解散群组
    async handleDismissGroup(payload) {
      const { groupId, convId } = payload;
      const { code, groupID } = await dismissGroup(groupId);
      console.log("解散群组 dismissGroup:", code, groupID);
      if (code !== 0) {
        console.error("解散群组 error:", code, groupID);
        return;
      }
      useChatStore().deleteSession({ convId });
    },
    // 获取群详细资料
    async handleGroupProfile(payload) {
      const { type } = payload;
      if (type !== "GROUP") return;
      const { groupID } = payload.groupProfile;
      const { code, data } = await getGroupProfile({ groupID });
      if (code !== 0) return;
      this.setGroupProfile(data);
    },
  },
});