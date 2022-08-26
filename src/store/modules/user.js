import storage from "storejs";
import { Login } from "@/api/user";
import router from "@/router";
import views from "@/utils/assembly.js";
import initLocalStorage from "@/store/data/initLocalStorage";
import { ACCESS_TOKEN } from "@/store/mutation-types";

const user = {
  state: {
    // 前端生成的验证码（按实际需求替换）
    verifyCode: "",
  },
  getters: {},
  mutations: {},
  actions: {
    // state, commit, dispatch, getters, rootGetters, rootState
    // 设置验证码
    SET_VERIFYCODE({ state }, verifyCode) {
      state.verifyCode = verifyCode;
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
