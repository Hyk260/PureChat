import { createApp, version } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/styles/index.scss";
import "v-contextmenu/dist/themes/default.css";

import { useI18n } from "./plugins/i18n";
import { useElIcons } from "./plugins/icons";
import { loadAllassembly } from "./components";
import { directive } from "v-contextmenu";
import { MotionPlugin } from "@vueuse/motion";
import { registerSvgIcon } from "./assets/icons/index";

const app = createApp(App);

app.directive("contextmenu", directive);
// 加载所有插件
// loadAllPlugins(app);
// 自动加载组件
loadAllassembly(app);
// svg组件
registerSvgIcon(app);

app.use(store);
app.use(router);
app.use(useI18n);
app.use(useElIcons);
app.use(MotionPlugin);
app.mount("#app");
