import {
  getGroupMemberList,
  getGroupProfile,
  getGroupList,
  quitGroup,
  createGroup,
} from "@/api/im-sdk-api/index";

import {
  dismissGroup,
} from "@/api/im-sdk-api/group";

export default {
  // namespaced: true,
  state: {
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
        getGroupProfile({ groupID }).then(data => {
          state.groupProfile = data;
        });
      }
    },
  },
  actions: {
    async getGroupMemberList({ state, commit, getters }, payload) {
      const groupID = getters.toAccount;
      const { memberList, offset } = await getGroupMemberList({ groupID });
      state.currentMemberList = memberList;
    },
    async getGroupList({ state }, payload) {
      const list = await getGroupList();
      state.groupList = list;
    },
    // 退出群聊
    QUIT_GROUP({ state }, payload) {
      const { groupId } = payload
      quitGroup({ groupId });
    },
    // 创建群聊
    CREATE_GROUP({ state }, payload) {
      const { groupName } = payload;
      createGroup({ groupName });
    },
    // 解散群组
    DISMISS_GROUP({ state }, payload) {
      const { groupId } = payload;
      dismissGroup(groupId)
    }
  },
};
