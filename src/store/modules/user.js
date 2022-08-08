import storage from "storejs";
import { Login } from "@/api/user";
import router from "@/router";
import views from "@/utils/assembly.js";
import initLocalStorage from "@/store/data/initLocalStorage";

const user = {
  state: {
    // 前端生成的验证码（按实际需求替换）
    verifyCode: "",
  },
  getters: {},
  mutations: {},
  actions: {
    // 设置验证码
    SET_VERIFYCODE(state, verifyCode) {
      state.verifyCode = verifyCode;
    },
  },
};

export default user;
