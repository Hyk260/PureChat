import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/assets/icons';
import '@/styles/index.scss'

import { loadAllPlugins } from './plugins'
import { loadAllassembly } from './components';





const app = createApp(App)
// 加载所有插件
loadAllPlugins(app)
// 自动加载组件
loadAllassembly(app)

app.use(store)
app.use(router)
app.mount('#app')