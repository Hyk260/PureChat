import storage from "storejs";
import tim from "@/utils/im-sdk/tim";
import { nextTick } from "vue";
import { getMyProfile, TIM_logout, TIM_login } from "@/api/im-sdk-api";

const user = {
  state: {
    currentUserProfile: {},
    isLogin: false,
    isSDKReady: false, // TIM SDK 是否 ready
    userID: 0,
    userSig: "",
    sdkAppID: 0,
  },
  getters: {},
  mutations: {
    toggleIsSDKReady(state, isSDKReady) {
      state.isSDKReady = isSDKReady;
    },
    updateCurrentUserProfile(state, userProfile) {
      state.currentUserProfile = userProfile;
    },
    GET_USER_INFO(state, payload) {
      state.userID = payload.userID;
      state.userSig = payload.userSig;
      state.sdkAppID = payload.sdkAppID;
    },
    toggleIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    reset(state) {
      Object.assign(state, {
        currentUserProfile: {},
        isLogin: false,
        isSDKReady: false, // TIM SDK 是否 ready
      });
    },
  },
  actions: {
    // state, commit, dispatch, getters, rootGetters, rootState
    // 登录im
    async TIM_LOG_IN({ state, rootState, commit }, userID) {
      // console.log(state,rootState.data.user.username)
      const result = TIM_login({ userID })
      console.log(result, "TIM_LOG_IN");
      commit("toggleIsLogin", true);
      let data = {
        userID: userID,
        userSig: window?.genTestUserSig(userID).userSig,
        sdkAppID: window?.genTestUserSig("").SDKAppID,
      };
      commit("GET_USER_INFO", data);
      console.log(data, "GET_USER_INFO");
    },
    // 退出im
    async TIM_LOG_OUT({ commit }) {
      const result = await TIM_logout();
      commit("toggleIsLogin", false);
      commit("reset");
      console.log(result, "TIM_LOG_OUT");
    },
    // 获取个人资料
    async GET_MYPROFILE({ commit }) {
      let result = await getMyProfile();
      commit("updateCurrentUserProfile", result);
    },
    // 重新登陆
    RE_LOGIN({ state, rootState, dispatch }) {
      let nick = rootState.data?.user?.username;
      let isSDKReady = state?.isSDKReady;
      nextTick(() => {
        setTimeout(() => {
          if (!isSDKReady) dispatch("TIM_LOG_IN", nick);
        }, 300);
      });
    },
  },
};

export default user;
