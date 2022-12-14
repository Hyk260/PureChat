import { getGroupMemberList, getGroupProfile } from "@/api/im-sdk-api/index";
export default {
  // namespaced: true,
  state: {
    groupDrawer: false, // 群聊开关
    groupList: [],
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
    setgroupDrawer(state, payload) {
      state.groupDrawer = payload;
    },
    setGroupProfile(state, payload) {
      const { type } = payload;
      if (type == "GROUP") {
        const { groupID } = payload.groupProfile;
        getGroupProfile({ groupID }).then((data) => {
          state.groupProfile = data;
          console.log(state.groupProfile);
        });
      }
    },
  },
  actions: {
    async getGroupMemberList({ state, commit }, payload) {
      const { groupID } = payload;
      // groupID offset count
      const { memberList, offset } = await getGroupMemberList({ groupID });
      state.currentMemberList = memberList;
      console.log(memberList);
    },
  },
};
