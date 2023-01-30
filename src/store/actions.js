import storage from "storejs";
import router from "@/router";
import views from "@/utils/assembly.js";
import { ToTree } from "@/utils/ToTree";
import { login, logout } from "@/api/user";
import { getMenu } from "@/api/menu";
import { verification } from "@/utils/message/index";
import emitter from "@/utils/mitt-bus";

const actions = {
  // 更新路由
  updateRoute({ commit, state }, route) {
    route.map((t) => {
      if (t.componentName) {
        t.component = views[t.componentName];
      }
    });
    let root = route.find((t) => (t.path = "/"));
    ToTree(root, route);
    // 动态添加路由
    root.children.forEach((item) => {
      router.addRoute(item);
    });
    console.log(root.children);
    commit("updateData", { key: "Routingtable", value: root.children });
  },
  // 设置验证码
  SET_VERIFYCODE({ state }, verifyCode) {
    state.data.verifyCode = verifyCode;
  },
  // 菜单列表
  async GET_MENU({ dispatch }) {
    let menu = await getMenu();
    dispatch("updateRoute", menu);
  },
  // 登录
  async LOG_IN({ state, commit, dispatch }, data) {
    const { username, password } = data;
    const { code, msg, result } = await login({ username, password });
    emitter.emit("showload", true);
    console.log({ code, msg, result }, "登录信息");
    if (code == 200) {
      window.TIMProxy.init()
      commit("updateData", { key: "user", value: result });
      dispatch("TIM_LOG_IN", {
        userID: username,
        userSig: result.userSig,
      });
      dispatch("GET_MENU");
      setTimeout(() => {
        emitter.emit("showload", false);
        commit("showMessage", { message: msg });
        router.push("/home");
      }, 1000);
    } else {
      verification(code, msg);
      emitter.emit("showload", false);
    }
  },
  // 退出登录
  LOG_OUT({ state, commit, dispatch }) {
    logout();
    router.push("/login");
    // 清除消息记录
    commit("SET_HISTORYMESSAGE", { type: "CLEAR_HISTORY" });
  },
};

export default actions;
