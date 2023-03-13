import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import storage from "storejs";
import NProgress from "@/utils/progress";
import routes from "./routes";
import store from "@/store";
import { ACCESS_TOKEN } from "@/store/mutation-types";
const { title, production } = require("@/config/vue.custom.config");
import { setPageTitle } from "@/utils/common";

// hack router push callback
const originalPush = createRouter.prototype.push;
createRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

// 登录验证白名单
const whiteList = ["login", "home"];
const loginRoutePath = "/login";
const defaultRoutePath = "/home";

// console.log(process.env, "环境变量");
// createWebHashHistory() hash模式
// createWebHistory() history模式
const router = createRouter({
  history: production ? createWebHashHistory() : createWebHistory(),
  routes,
});
// 默认是  Hash  模式, 手动设置为  History  模式
// 更新视图但不重新请求页面是前端路由原理的核心之一

let isF = false;
router.beforeEach(async (to, from, next) => {
  // console.log(to, "to")
  // console.log(from,"from")
  if (from.path === to.path) return;
  setPageTitle(to.meta.title);
  const token = storage.get(ACCESS_TOKEN);

  if (token) {
    // start progress bar
    NProgress.start();
    if (isF) {
      next();
    } else {
      isF = true;
      next({ ...to, replace: true });
    }
  } else {
    if (to.path !== loginRoutePath) {
      next({ path: loginRoutePath });
    } else {
      next();
    }
  }
});

// 后置守卫
router.afterEach(async (to, from, next) => {
  // finish progress bar
  NProgress.done();
});
// 应用场景，进入页面登录判断、管理员权限判断、浏览器判断

export default router;
