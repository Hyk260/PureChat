import React from "react"
import ReactDOM from "react-dom/client"

interface WebComponentOptions {
  tagName: string
  reactComponent: React.ComponentType<any>
  props?: string[]
}

const kebabToCamel = (str: string): string => str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())

export function createWebComponent({ tagName, reactComponent: Component, props = [] }: WebComponentOptions): void {
  class WebComponentWrapper extends HTMLElement {
    private root: ReactDOM.Root | null = null
    private observer: MutationObserver | null = null

    static get observedAttributes(): string[] {
      return props
    }

    constructor() {
      super()
      // 创建 Shadow DOM 来隔离样式和属性
      // this.attachShadow({ mode: "open" })
    }

    connectedCallback(): void {
      this.root = ReactDOM.createRoot(this)
      this.renderComponent()

      // 观察属性变化
      this.observer = new MutationObserver(() => this.renderComponent())
      this.observer.observe(this, { attributes: true })
    }

    disconnectedCallback(): void {
      this.observer?.disconnect()
      this.root?.unmount()
    }

    attributeChangedCallback(): void {
      this.renderComponent()
    }

    private getComponentProps() {
      const allAttributes = Array.from(this.attributes)

      return allAttributes.reduce((acc, attr) => {
        // 跳过 Vue 的内部属性
        if (attr.name.startsWith("data-v-")) return acc
        const propName = kebabToCamel(attr.name)
        let value = attr.value
        // 处理布尔类型的属性
        const booleanProps = [
          "fullFeaturedCodeBlock",
          "enableLatex",
          "enableMermaid",
          "enableImageGallery",
          "enableCustomFootnotes",
          "enableGithubAlert",
          "enableStream",
          "animated",
          "allowHtml",
          "showFootnotes",
        ]
        if (booleanProps.includes(propName)) {
          value = value === "true"
        }
        // 尝试解析 JSON 格式的属性值
        if (value && typeof value === "string" && (value.startsWith("{") || value.startsWith("["))) {
          try {
            value = JSON.parse(value)
          } catch {
            // 解析失败时保持原值
          }
        }
        return { ...acc, [propName]: value }
      }, {})
    }

    private renderComponent(): void {
      const props = this.getComponentProps()
      this.root?.render(<Component {...props} />)
    }
  }

  if (!customElements.get(tagName)) {
    customElements.define(tagName, WebComponentWrapper)
  }
}
