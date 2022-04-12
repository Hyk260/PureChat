import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/assets/svg';
import '@/styles/index.scss'
import * as ElIcons from '@element-plus/icons-vue'
import { loadAllPlugins } from './plugins'
import { loadAllassembly } from './components';



const app = createApp(App)

for (const name in ElIcons){
  app.component(name,ElIcons[name])
}
// 加载所有插件
loadAllPlugins(app)
// 自动加载组件
loadAllassembly(app)

app.use(store)
app.use(router)
// app.use(fragment.Plugin);
app.mount('#app')