// createWebComponent.ts
import React from 'react';
import ReactDOM from 'react-dom/client';

interface WebComponentOptions {
  tagName: string;
  reactComponent: React.ComponentType<any>;
  props?: string[];
}

export function createWebComponent({
  tagName,
  reactComponent: Component,
  props = [],
}: WebComponentOptions): void {
  class WebComponentWrapper extends HTMLElement {
    private root: ReactDOM.Root | null = null;
    private observer: MutationObserver | null = null;

    static get observedAttributes(): string[] {
      return props;
    }

    connectedCallback(): void {
      this.root = ReactDOM.createRoot(this);
      this.renderComponent();
      
      // 观察属性变化
      this.observer = new MutationObserver(() => this.renderComponent());
      this.observer.observe(this, { attributes: true });
    }

    disconnectedCallback(): void {
      this.observer?.disconnect();
      this.root?.unmount();
    }

    attributeChangedCallback(): void {
      this.renderComponent();
    }

    private renderComponent(): void {
      const componentProps = props.reduce((acc, prop) => {
        let value = this.getAttribute(prop);
        
        // 处理布尔值和JSON对象
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        
        try {
          const parsedValue = JSON.parse(value as string);
          value = parsedValue;
        } catch (e) {
          // 如果不是JSON，保持原始值
        }
        
        return { ...acc, [prop]: value };
      }, {});

      this.root?.render(<Component {...componentProps} />);
    }
  }

  if (!customElements.get(tagName)) {
    customElements.define(tagName, WebComponentWrapper);
  }
}
