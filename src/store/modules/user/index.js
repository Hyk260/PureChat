import { login, logout, register } from "@/api/node-admin-api/index";
import { ACCOUNT, TIM_PROXY, USER_MODEL } from "@/constants/index";
import router from "@/router";
import chat from "@/utils/IM/im-sdk/tim";
import { timProxy } from "@/utils/IM/index";
import storage from "@/utils/localforage/index";
import { verification } from "@/utils/message/index";
import emitter from "@/utils/mitt-bus";
import { ElMessage } from "element-plus";
import { nextTick } from "vue";

const user = {
  state: {
    timProxy,
    message: null,
    showload: false, // 登录按钮加载状态
    currentPage: 0,
    userProfile: storage.get(TIM_PROXY)?.userProfile || {}, // IM用户信息
  },
  mutations: {
    setCurrentPage(state, num) {
      state.currentPage = num;
    },
    setCurrentProfile(state, user) {
      state.userProfile = user;
    },
    reset(state) {
      Object.assign(state, {
        showload: false,
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
        // dispatch("GET_MENU");
        dispatch("TIM_LOG_IN", {
          userID: result.username,
          userSig: result.userSig,
        });
        commit("UPDATE_USER_INFO", { key: "user", value: result });
        router.push("/chatstudio");
        verification(code, msg);
      } else {
        verification(code, msg);
      }
    },
    // 注册
    async REGISTER({ state }, data) {
      const result = await register(data);
    },
    // 登录
    async LOG_IN({ state, commit, dispatch }, data) {
      const { code, msg, result } = await login(data);
      console.log({ code, msg, result }, "登录信息");
      if (code == 200) {
        window.TIMProxy.init();
        dispatch("TIM_LOG_IN", {
          userID: result.username,
          userSig: result.userSig,
        });
        commit("UPDATE_USER_INFO", { key: "user", value: result });
        // 保存登录信息 keep
        data?.keep && storage.set(ACCOUNT, data);
        router.push("/chatstudio");
        verification(code, msg);
      } else {
        verification(code, msg);
      }
    },
    // 退出登录
    async LOG_OUT({ state, commit, dispatch }) {
      router.push("/login");
      nextTick(() => {
        logout();
        emitter.all.clear();
        dispatch("TIM_LOG_OUT");
      });
    },
    // 登录im
    async TIM_LOG_IN({ state, commit, dispatch }, user) {
      try {
        const { code, data } = await chat.login(user);
        if (code == 0) {
          console.log("[chat] im登录成功 login", data);
        } else {
          dispatch("LOG_OUT");
        }
      } catch (error) {
        dispatch("LOG_OUT");
        console.log("[chat] im登录失败 login", error);
      }
    },
    // 退出im
    async TIM_LOG_OUT({ commit, dispatch }) {
      const { code, data } = await chat.logout();
      if (code == 0) {
        console.log("[chat] im退出登录 logout", data);
        commit("reset");
        // 清除消息记录
        commit("SET_HISTORYMESSAGE", { type: "CLEAR_HISTORY" });
      }
    },
    // 重新登陆
    LOG_IN_AGAIN({ state, dispatch }) {
      try {
        const { user } = storage.get(USER_MODEL) || {};
        if (user) {
          const { username: userID, userSig } = user;
          console.log({ userID, userSig }, "LOG_IN_AGAIN");
          window.TIMProxy.init();
          dispatch("TIM_LOG_IN", { userID, userSig });
        } else {
          dispatch("LOG_OUT");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default user;
