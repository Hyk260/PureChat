import {
  getGroupMemberList,
  getGroupProfile,
  getGroupList,
} from "@/api/im-sdk-api/index";
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
    // setgroupDrawer(state, payload) {
    //   state.groupDrawer = payload;
    // },
    setGroupProfile(state, payload) {
      const { type } = payload;
      if (type == "GROUP") {
        const { groupID } = payload.groupProfile;
        getGroupProfile({ groupID }).then((data) => {
          state.groupProfile = data;
          // console.log(state.groupProfile);
        });
      }
    },
  },
  actions: {
    async getGroupMemberList({ state, commit, getters }, payload) {
      // const { groupID } = payload;
      console.log(getters.toAccount)
      const groupID = getters.toAccount
      // groupID offset count
      const { memberList, offset } = await getGroupMemberList({ groupID });
      console.log(memberList)
      state.currentMemberList = memberList;
    },
    async getGroupList({ state }, payload) {
      // state.groupList =
      const list = await getGroupList();
      console.log(list);
      state.groupList = list;
    },
  },
};
