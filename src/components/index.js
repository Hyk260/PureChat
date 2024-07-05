import FontIcon from "./FontIcon/index.vue";
import QrCode from "./QrCode/index.vue";
import SvgIcon from "./SvgIcon/index.vue";
import UserAvatar from "./UserAvatar/index.vue";
import Navbar from "./Navbar/index.vue";
import DragBox from "./DragBox/index.vue";


const importModules = (app) => {
  app.component("DragBox", DragBox);
  app.component("Navbar", Navbar);
  app.component("QrCode", QrCode);
  app.component("SvgIcon", SvgIcon);
  app.component("UserAvatar", UserAvatar);
  app.component("FontIcon", FontIcon);
};

/** 注册全局组件 */
export function loadAllassembly(app) {
  importModules(app);
}
