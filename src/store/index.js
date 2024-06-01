import { USER_MODEL, USER_SETUP } from "@/constants/index";
import { setTheme } from "@/utils/common";
import storage from "@/utils/localforage/index";
import { createStore } from "vuex";
// import { importModules } from "./importModules";
import saveToLocalStorage from "./plugins/localStorage"; // 自定义插件

import conversation from "./modules/conversation/index";
import groupinfo from "./modules/groupinfo";
import robot from "./modules/robot";
import sidebar from "./modules/sidebar";
import user from "./modules/user";

// 默认设置
const defaultSettings = {
  lang: "zh-CN", // 默认语言
  appearance: "light", // 主题颜色
  arrowRight: false, // 聊天会话列表折叠 true ？'折叠' : '不折叠'
  fullScreen: false, // 全屏输入框是否启用
};

// 默认用户信息
const defaultData = {
  verifyCode: "",
  user: null,
};
// console.log(importModules());
const store = createStore({
  // modules: importModules(),
  modules: {
    conversation,
    groupinfo,
    robot,
    sidebar,
    user,
  },
  state: {
    data: storage.get(USER_MODEL) || defaultData,
    settings: storage.get(USER_SETUP) || defaultSettings,
  },
  mutations: {
    // 更新用户设置
    UPDATE_USER_SETUP(state, { key, value }) {
      state.settings[key] = value;
    },
    // 更新用户信息
    UPDATE_USER_INFO(state, { key, value }) {
      state.data[key] = value;
    },
  },
  // 自定义属性
  plugins: [saveToLocalStorage],
});

// 刷新页面保存当前主题色
setTheme(store.state.settings.appearance);

export default store;
