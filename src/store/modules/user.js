import storage from "storejs";
import { login } from "@/api/user";
import { getMenu } from "@/api/menu";
import router from "@/router";
import views from "@/utils/assembly.js";
import initLocalStorage from "@/store/data/initLocalStorage";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import tim from "@/utils/im-sdk/tim";
import { nextTick } from "vue";
import { getMyProfile, logout } from '@/api/im-sdk-api';
import { verification } from "@/utils/message/index";
import { ElNotification } from "element-plus";

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
      const result = await logout();
      commit("toggleIsLogin");
      commit("reset");
      console.log(result, "TIM_LOG_OUT");
    },
    // 获取个人资料
    async GET_MYPROFILE({ commit }) {
      let result = await getMyProfile()
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
    // 菜单列表
    async GET_MENU({ dispatch }){
      let menu = await getMenu();
      dispatch("updateRoute", menu);
    },
    // 登录
    async LOG_IN({ state, commit, dispatch }, data) {
      const { username, password } = data
      const res = await login({ username, password });
      console.log(res, "登录信息");
      const { code, msg, result } = res;
      console.log(result)
      if (code == 200){
        commit("updateData", { key: "user", value: result });
        dispatch("TIM_LOG_IN", username);
        dispatch('GET_MENU')
        setTimeout(() => {
          router.push("/home");
          ElNotification({
            title: "Success",
            message: "登录成功",
            type: "success",
          });
        }, 1000);
      } else {
        verification(code, msg)
      }
    },
    // 退出登陆
    LOG_OUT() {
      router.push("/login");
      storage.clear();
      storage.remove("userdata");
      storage.remove(ACCESS_TOKEN);
    },
  },
};

export default user;
