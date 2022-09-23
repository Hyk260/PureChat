import storage from "storejs";
import { Login } from "@/api/user";
import router from "@/router";
import views from "@/utils/assembly.js";
import initLocalStorage from "@/store/data/initLocalStorage";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import tim from "@/utils/im-sdk/tim";

const user = {
  state: {
    // 前端生成的验证码（按实际需求替换）
    verifyCode: "",
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
      state.isLogin = typeof isLogin === "undefined" ? !state.isLogin : isLogin;
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
    // 设置验证码
    SET_VERIFYCODE({ state }, verifyCode) {
      state.verifyCode = verifyCode;
    },
    // 登录im
    async TIM_LOG_IN({ state, rootState, commit }, userID) {
      // console.log(state,rootState.data.user.username)
      const result = await tim.login({
        userID,
        userSig: window?.genTestUserSig(userID).userSig,
      });
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
      const result = await tim.logout();
      // tim.destroy();
      commit("toggleIsLogin");
      commit("reset");
      console.log(result, "TIM_LOG_OUT");
    },
    // 获取个人资料
    async GET_MYPROFILE({ commit }) {
      let promise = tim.getMyProfile();
      promise
        .then(({ data }) => {
          console.log(data, "个人资料"); 
          commit("updateCurrentUserProfile", data);
        })
        .catch((imError) => {
          console.warn("getMyProfile error:", imError); 
        });
    },
    // 退出登陆
    LOG_OUT() {
      router.push("/login");
      storage.remove("userdata");
      storage.remove(ACCESS_TOKEN);
    },
  },
};

export default user;
