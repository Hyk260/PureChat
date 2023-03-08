import storage from "storejs";
import { useRouter, useRoute } from "vue-router";
import { nextTick } from "vue";
import { getMyProfile, TIM_logout, TIM_login } from "@/api/im-sdk-api";
import { ElMessage } from "element-plus";
import TIMProxy from "@/utils/IM";
let tim = new TIMProxy();
// new Proxy(tim, {
//   set(target, key, val) {
//     console.log(val);
//     return Reflect.set(target, key, val);
//   },
//   get(target, key) {
//     const value = Reflect.get(target, key);
//     console.log(value);
//     return value;
//   },
// });
// console.log(tim);
const user = {
  state: {
    currentUserProfile: {}, // IM用户信息
    isLogin: false, // IM登陆状态
    isSDKReady: false, // TIM SDK 是否 ready
    userID: 0,
    userSig: "",
    message: null,
    showload: false,
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
      const { code, data } = await TIM_login({ userID, userSig });
      console.log({ code, data }, "TIM_LOG_IN");
      if (code == 0) {
        commit("showMessage", { message: "IM初始化成功!" });
        commit("GET_USER_INFO", { userID, userSig });
        commit("toggleIsLogin", true);
        console.log({ userID, userSig }, "GET_USER_INFO");
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
        window.TIMProxy.init();
        dispatch("TIM_LOG_IN", { userID, userSig });
      }, 500);
    },
  },
};

export default user;
