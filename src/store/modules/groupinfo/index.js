import { restApi } from "@/api/node-admin-api/index";
import {
  getGroupList,
  getGroupProfile,
  getGroupMemberList,
  quitGroup,
  createGroup,
  dismissGroup,
} from "@/api/im-sdk-api/index";
import { compareByRole } from "@/utils/chat/index";

export default {
  state: {
    groupList: [], //群组列表
    groupProfile: null, // 群聊数据
    currentMemberList: [], // 当前群组成员列表
  },
  getters: {
    hasGroupList(state) {
      return state.groupList.length > 0;
    },
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
      state.groupProfile = payload;
    },
  },
  actions: {
    // 获取群成员列表
    async getGroupMemberList({ state, getters }, payload) {
      const groupID = getters.toAccount;
      const { memberList, code } = await getGroupMemberList({ groupID });
      let sortlist = memberList;
      sortlist.sort(compareByRole);
      state.currentMemberList = sortlist;
    },
    // 获取群列表数据
    async getGroupList({ state }, payload) {
      const { code, groupList } = await getGroupList();
      if (code !== 0) return;
      state.groupList = groupList;
    },
    // 退出群聊
    async QUIT_GROUP({ state, dispatch }, payload) {
      const { groupId, convId } = payload;
      const { code } = await quitGroup({ groupId });
      if (code !== 0) return;
      dispatch("DELETE_SESSION", { convId });
    },
    // 创建群聊
    async CREATE_GROUP({ state }, payload) {
      const { groupName } = payload;
      await createGroup({ groupName });
    },
    // 解散群组
    async DISMISS_GROUP({ dispatch }, payload) {
      const { groupId, convId } = payload;
      const { code, groupID } = await dismissGroup(groupId);
      if (code !== 0) return;
      // dispatch("DELETE_SESSION", { convId });
      // const { ErrorCode } = await restApi({
      //   params: groupId,
      //   funName: "destroyGroup",
      // });
      // if (ErrorCode !== 0) return;
      dispatch("DELETE_SESSION", { convId });
    },
    // 获取群详细资料
    async getGroupProfile({ commit }, payload) {
      const { type } = payload;
      if (type !== "GROUP") return;
      const { groupID } = payload.groupProfile;
      const { code, data } = await getGroupProfile({ groupID });
      if (code !== 0) return;
      commit("setGroupProfile", data);
    },
  },
};
