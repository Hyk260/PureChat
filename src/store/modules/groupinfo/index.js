import { getGroupMemberList } from "@/api/im-sdk-api/index";
export default {
  // namespaced: true,
  state: {
    groupDrawer: false, // 群聊开关
    groupList: [],
    currentMemberList: [], // 当前群组成员列表
  },
  getters: {},
  mutations: {
    setgroupDrawer(state, payload) {
      state.groupDrawer = payload;
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
