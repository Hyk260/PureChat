import { createApp, version } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/styles/index.scss";
import pkg from "../package.json";

import { loadAllPlugins } from "./plugins";
import { loadAllassembly } from "./components";
import { directive } from "v-contextmenu";
import { MotionPlugin } from "@vueuse/motion";

import FontIcon from "./layout/FontIcon/indx.vue";
import { registerSvgIcon } from "./assets/icons/index";

const app = createApp(App);
app.component(FontIcon);
app.directive("contextmenu", directive);
app.config.globalProperties.__APP_INFO__ = pkg;

// 加载所有插件
loadAllPlugins(app);
// 自动加载组件
loadAllassembly(app);
registerSvgIcon(app);

app.use(store);
app.use(router);
app.use(MotionPlugin);
app.mount("#app");
