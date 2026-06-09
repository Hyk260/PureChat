import type { Component } from "vue"
import { computed, defineComponent, h } from "vue"

/**
 * 工厂函数：生成一个 Combine 组件，将 Mono 图标和 Text 文本并排展示。
 * 消除了 11 个 Icon 目录中 Combine.vue 的重复模板和逻辑。
 */
export function createCombineComponent(
  name: string,
  Mono: Component,
  Text: Component,
  textMultiple: number,
  title: string
): Component {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      size: { type: [String, Number], default: "1em" },
    },
    setup(props) {
      const textSize = computed(() => {
        const sizeValue = typeof props.size === "string" ? props.size : `${props.size}px`
        const numericSize = typeof props.size === "number" ? props.size : parseFloat(sizeValue) || 16
        return `${numericSize * textMultiple}px`
      })

      return () =>
        h("div", { class: "flex-c gap-4", "aria-label": title }, [
          h(Mono, { size: props.size }),
          h(Text, { size: textSize.value }),
        ])
    },
  })
}
