import { directive } from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

/** setup custom vue directives. - [安装自定义的vue指令] */
export function setupDirectives(app) {
  app.directive("contextmenu", directive);
}
