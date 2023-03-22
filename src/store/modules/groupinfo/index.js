import { getGroupProfile, deleteConversation } from "@/api/im-sdk-api/index";
import {
  getGroupList,
  getGroupMemberList,
  quitGroup,
  createGroup,
  dismissGroup,
} from "@/api/im-sdk-api/group";

export default {
  // namespaced: true,
  state: {
    isShowAddBook: false, // 地址本状态
    popover: false, // 卡片
    seat: null,
    groupDrawer: false, // 群聊开关
    groupList: [], //群组列表
    groupProfile: null,
    currentMemberList: [], // 当前群组成员列表
  },
  getters: {
    // 群主
    isOwner(state) {
      if (state.groupProfile) {
        const { role } = state.groupProfile.selfInfo;
        return role == "Owner";
      } else {
        return "";
      }
    },
    // 管理员
    isAdmin(state) {
      if (state.groupProfile) {
        const { role } = state.groupProfile.selfInfo;
        return role == "Admin";
      } else {
        return "";
      }
    },
  },
  mutations: {
    setGroupProfile(state, payload) {
      const { type } = payload;
      if (type == "GROUP") {
        const { groupID } = payload.groupProfile;
        getGroupProfile({ groupID }).then((data) => {
          state.groupProfile = data;
        });
      }
    },
    setAddbookStatus(state, status) {
      state.isShowAddBook = status;
    },
    setPopoverStatus(state, payload) {
      const { status, seat, cardData } = payload;
      state.popover = status;
      state.seat = seat;
      state.cardData = cardData;
    },
    setGroupStatus(state, status) {
      state.groupDrawer = status;
    },
  },
  actions: {
    async getGroupMemberList({ state, commit, getters }, payload) {
      const groupID = getters.toAccount;
      const { memberList, code } = await getGroupMemberList({ groupID });
      state.currentMemberList = memberList;
    },
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
    async DISMISS_GROUP({ state, dispatch, commit }, payload) {
      const { groupId, convId } = payload;
      const { code, groupID } = await dismissGroup(groupId);
      if (code !== 0) return;
      dispatch("DELETE_SESSION", { convId });
    },
  },
};
