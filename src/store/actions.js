import storage from "storejs";
import router from "@/router";
import views from "@/utils/assembly.js";
import { ToTree } from "@/utils/ToTree";
import { ACCESS_TOKEN } from "@/store/mutation-types";

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
};

export default actions;
