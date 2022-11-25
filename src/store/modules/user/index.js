import storage from "storejs";
import { useRouter, useRoute } from "vue-router";
import { nextTick } from "vue";
import { verification } from "@/utils/message/index";
import { getMyProfile, TIM_logout, TIM_login } from "@/api/im-sdk-api";
import { ElMessage } from "element-plus";
import IM from "@/utils/IM";
const tim = new IM();

const user = {
  state: {
    currentUserProfile: {}, // IM用户信息
    isLogin: false, // IM登陆状态
    isSDKReady: false, // TIM SDK 是否 ready
    userID: 0,
    userSig: "",
    sdkAppID: 0,
    message: null,
    tim,
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
        isSDKReady: false,
      });
    },
    showMessage(state, options) {
      if (state.message) {
        state.message.close();
      }
      state.message = ElMessage({
        message: options.message,
        type: options.type || "success",
        duration: options.duration || 2000,
        // offset: 40,
      });
    },
  },
  actions: {
    // state, commit, dispatch, getters, rootGetters, rootState
    // 登录im
    async TIM_LOG_IN({ commit }, user) {
      const { userID, userSig } = user;
      const result = await TIM_login({ userID, userSig });
      console.log(result, "TIM_LOG_IN");
      const { code, data } = result;
      if (code == 0) {
        let info = {
          userID,
          userSig,
          sdkAppID: "",
        };
        commit("showMessage", { message: "IM登陆成功!" });
        commit("toggleIsLogin", true);
        commit("GET_USER_INFO", info);
        console.log(info, "GET_USER_INFO");
      } else {
        console.log("err");
      }
    },
    // 退出im
    async TIM_LOG_OUT({ commit }) {
      const result = await TIM_logout();
      console.log(result, "TIM_LOG_OUT");
      commit("toggleIsLogin", false);
      commit("reset");
    },
    // 获取个人资料
    async GET_MYPROFILE({ commit }) {
      let result = await getMyProfile();
      commit("updateCurrentUserProfile", result);
    },
    // 重新登陆
    RE_LOGIN({ state, rootState, dispatch }) {
      let userID = rootState.data?.user?.username;
      let userSig = rootState.data?.user?.userSig;
      let isSDKReady = state?.isSDKReady;
      setTimeout(() => {
        // dispatch("TIM_LOG_IN", { userID, userSig });
      }, 500);
    },
  },
};

export default user;
