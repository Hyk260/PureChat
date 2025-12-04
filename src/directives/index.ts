import type { App } from "vue"

export * from "./copy"
export * from "./optimize"

// import { optimize } from "./optimize";
import { copy } from "./copy"

/** setup custom vue directives. - [安装自定义的vue指令] */
export function setupDirectives(app: App) {
  // app.directive("optimize", optimize)
  app.directive("copy", copy)
}
