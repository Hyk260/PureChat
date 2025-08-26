import { directive } from "v-contextmenu"

import type { App } from "vue"

// import { optimize } from "./optimize";
import "v-contextmenu/dist/themes/default.css"

/** setup custom vue directives. - [安装自定义的vue指令] */
export function setupDirectives(app: App) {
  app.directive("contextmenu", directive as any)
  // app.directive("optimize", optimize)
}
