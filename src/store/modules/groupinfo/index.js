import {
  getGroupList,
  getGroupProfile,
  getGroupMemberList,
  quitGroup,
  createGroup,
  dismissGroup,
} from "@/api/im-sdk-api/index";
import { sortMembersByRole, findGroupChat } from "@/utils/chat/index";

export default {
  state: {
    groupList: [], //群组列表
    groupProfile: null, // 群聊数据
    currentMemberList: [], // 当前群组成员列表
  },
  getters: {
    // 群主
    isOwner(state) {
      if (!state.groupProfile) return "";
      const { role } = state.groupProfile?.selfInfo;
      return role === "Owner";
    },
    // 管理员
    isAdmin(state) {
      if (!state.groupProfile) return "";
      const { role } = state.groupProfile?.selfInfo;
      return role === "Admin";
    },
  },
  mutations: {
    // 更新群详情
    setGroupProfile(state, payload) {
      console.log("setGroupProfile:", payload);
      state.groupProfile = payload;
    },
  },
  actions: {
    // 获取群成员列表
    async getGroupMemberList({ state, getters }, payload) {
      const { isSort = true, groupID = "" } = payload || {};
      const groupId = groupID || getters.toAccount;

      if (!groupId) {
        console.error("群ID不存在");
        return;
      }
      const { memberList, code } = await getGroupMemberList({ groupID: groupId });
      if (code !== 0) return;
      if (isSort) {
        state.currentMemberList = sortMembersByRole(memberList);
      } else {
        state.currentMemberList = memberList;
      }
    },
    // 获取群列表数据
    async getGroupList({ state }) {
      const { code, groupList } = await getGroupList();
      if (code !== 0) return;
      state.groupList = groupList;
    },
    // 退出群聊
    async handleQuitGroup({ state, dispatch }, payload) {
      const { groupId, convId } = payload;
      const { code } = await quitGroup({ groupId });
      if (code !== 0) return;
      dispatch("deleteSession", { convId });
    },
    // 创建群聊
    async handleCreateGroup({ state }, payload) {
      const { groupName, positioning = true } = payload;
      const { code, group } = await createGroup({ groupName });
      console.log("创建群聊:", code, group);
      if (code !== 0) return;
      if (positioning) {
        // 定位到群聊
        findGroupChat(group);
      }
    },
    // 解散群组
    async dismissGroup({ dispatch }, payload) {
      const { groupId, convId } = payload;
      const { code, groupID } = await dismissGroup(groupId);
      console.log("解散群组 dismissGroup:", code, groupID);
      if (code !== 0) {
        console.error("解散群组 error:", code, groupID);
        return;
      }
      dispatch("deleteSession", { convId });
    },
    // 获取群详细资料
    async getGroupProfile({ commit }, payload) {
      const { type } = payload;
      if (type !== "GROUP") return;
      const { groupID } = payload.groupProfile;
      const { code, data } = await getGroupProfile({ groupID });
      if (code !== 0) return;
      console.log("getGroupProfile:", data);
      commit("setGroupProfile", data);
    },
  },
};
