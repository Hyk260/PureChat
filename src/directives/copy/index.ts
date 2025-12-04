import { useEventListener } from "@vueuse/core"
import type { Directive, DirectiveBinding } from "vue"

export interface CopyEl extends HTMLElement {
  copyValue: string
}

/**
 * 文本复制指令（默认单击复制，默认使用 el.copyValue 保存复制文本）
 * v-copy="value"                        // 单击复制
 * v-copy.arg="value"                    // 指定操作类型（如 click, dblclick）
 * v-copy="value" v-copy.arg="mouseenter"// 按条件复制
 */
export const copy: Directive = {
  mounted(el: CopyEl, binding: DirectiveBinding<string>) {
    const { value } = binding
    if (!value) {
      throw new Error('文本复制指令需要绑定值，如 v-copy="modelValue"')
    }
    el.copyValue = value
    const arg = binding.arg ?? "click"
    useEventListener(el, arg, () => {
      window.copyToClipboard(el.copyValue)
    })
  },
  updated(el: CopyEl, binding: DirectiveBinding) {
    el.copyValue = binding.value
  },
}
