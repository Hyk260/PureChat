import { login, logout, register } from "@/api/node-admin-api/index";
import { ACCOUNT, TIM_PROXY, USER_MODEL } from "@/constants/index";
import router from "@/router";
import chat from "@/utils/IM/im-sdk/tim";
import { timProxy } from "@/utils/IM/index";
import { localStg } from "@/utils/storage";
import { verification } from "@/utils/message/index";
import emitter from "@/utils/mitt-bus";
import { ElMessage } from "element-plus";
import { initThemeSettings } from "@/theme/settings"

const themeScheme = initThemeSettings()

const user = {
  state: {
    timProxy,
    message: null,
    loading: false, // 登录按钮加载状态
    currentPage: 0,
    userProfile: localStg.get(TIM_PROXY)?.userProfile || {}, // IM用户信息
    lang: localStg.get('lang') || "zh-CN", // 默认语言
    themeScheme,// 主题方案
  },
  mutations: {
    setCurrentPage(state, num) {
      state.currentPage = num;
    },
    setCurrentProfile(state, user) {
      state.userProfile = user;
    },
    setLang(state, lang) {
      state.lang = lang;
    },
    setThemeScheme(state, theme) {
      state.themeScheme = theme;
    },
    setLoading(state, val) {
      state.loading = val;
    },
    reset(state) {
      Object.assign(state, {
        loading: false,
        currentPage: 0,
        userProfile: {},
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
        offset: 30,
      });
    },
  },
  actions: {
    authorized({ commit, dispatch }, data) {
      const { code, msg, result } = data;
      console.log({ code, msg, result }, "授权登录信息");
      if (code == 200) {
        window.TIMProxy.init();
        dispatch("handleIMLogin", {
          userID: result.username,
          userSig: result.userSig,
        });
        localStg.set(USER_MODEL, result)
        router.push("/chat");
        verification(code, msg);
      } else {
        verification(code, msg);
      }
    },
    // 登录
    async handleUserLogin({ state, commit, dispatch }, data) {
      commit("setLoading", true);
      const { code, msg, result } = await login(data);
      console.log({ code, msg, result }, "登录信息");
      if (code == 200) {
        window.TIMProxy.init();
        dispatch("handleIMLogin", {
          userID: result.username,
          userSig: result.userSig,
        });
        localStg.set(USER_MODEL, result)
        // 保存登录信息 keep
        data?.keep && localStg.set(ACCOUNT, data);
        router.push("/chat");
        verification(code, msg);
      } else {
        verification(code, msg);
        setTimeout(() => {
          commit("setLoading", false);
        }, 1000)
      }
    },
    // 退出登录
    async handleUserLogout({ state, commit, dispatch }) {
      router.push("/login");
      setTimeout(() => {
        logout();
        emitter.all.clear();
        dispatch("handleIMLogout");
      }, 500);
    },
    // 登录im
    async handleIMLogin({ state, commit, dispatch }, user) {
      try {
        const { code, data } = await chat.login(user);
        if (code == 0) {
          console.log("[chat] im登录成功 login", data);
        } else {
          dispatch("handleUserLogout");
        }
      } catch (error) {
        dispatch("handleUserLogout");
        console.log("[chat] im登录失败 login", error);
      }
    },
    // 退出im
    async handleIMLogout({ commit, dispatch }) {
      const { code, data } = await chat.logout();
      if (code == 0) {
        console.log("[chat] im退出登录 logout", data);
        commit("reset");
        // 清除消息记录
        commit("clearHistory");
      }
    },
    // 重新登陆
    reLoginHandler({ state, dispatch }) {
      if (__LOCAL_MODE__) return
      try {
        const data = localStg.get(USER_MODEL) || {};
        if (data) {
          const { username: userID, userSig } = data;
          console.log("reLoginHandler", { userID, userSig });
          window.TIMProxy.init();
          dispatch("handleIMLogin", { userID, userSig });
        } else {
          dispatch("handleUserLogout");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default user;
