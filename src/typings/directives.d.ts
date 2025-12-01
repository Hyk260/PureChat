import type { Directive } from "vue";
import type { CopyEl, OptimizeOptions } from "@/directives";

declare module "vue" {
  export interface ComponentCustomProperties {
    /** 文本复制指令 */
    vCopy: Directive<CopyEl, string>;
    /** 防抖、节流指令 */
    vOptimize: Directive<HTMLElement, OptimizeOptions>;
  }
}

export {};
