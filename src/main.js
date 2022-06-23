import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/styles/index.scss";
import "@/styles/nprogress.css";
import pkg from "../package.json";

import * as ElIcons from "@element-plus/icons-vue";
import { loadAllPlugins } from "./plugins";
import { loadAllassembly } from "./components";

import NProgress from "nprogress";

import FontIcon from "./layout/FontIcon/indx.vue";
import { registerSvgIcon } from "./assets/icons/index";

NProgress.configure({
  // 动画方式
  easing: "ease",
  // 递增进度条的速度
  speed: 500,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3,
});

const app = createApp(App);
app.component(FontIcon);

for (const name in ElIcons) {
  app.component(name, ElIcons[name]);
}

app.config.globalProperties.__APP_INFO__ = pkg;

// 加载所有插件
loadAllPlugins(app);
// 自动加载组件
loadAllassembly(app);
registerSvgIcon(app);

app.use(store);
app.use(router);
app.mount("#app");
