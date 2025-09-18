import React from "react"
import * as ReactDOM from "react-dom/client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, prism } from "react-syntax-highlighter/dist/esm/styles/prism"

export interface MarkdownProps {
  markdown?: string
  className?: string
  theme?: "light" | "dark"
  enableHighlight?: boolean
}

const MarkdownComponent: React.FC<MarkdownProps> = ({
  markdown = "",
  className,
  theme = "light",
  enableHighlight = true,
}) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className: codeClassName, children, ...props }) {
            const match = /language-(\w+)/.exec(codeClassName || "")
            return !inline && match && enableHighlight ? (
              <SyntaxHighlighter 
                style={theme === "dark" ? oneDark : prism} 
                language={match[1]} 
                PreTag="div" 
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={codeClassName} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

class MarkdownWebComponent extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  constructor() {
    super();
    this._content = '';
    this._theme = 'light';
    this._enableHighlight = true;
  }

  static get observedAttributes() {
    return ['markdown', 'theme', 'enable-highlight'];
  }

  get markdown() {
    return this._content;
  }

  set markdown(value) {
    this._content = value;
    this._render();
  }

  get theme() {
    return this._theme;
  }

  set theme(value) {
    this._theme = value;
    this._render();
  }

  get enableHighlight() {
    return this._enableHighlight;
  }

  set enableHighlight(value) {
    this._enableHighlight = value === 'true' || value === true;
    this._render();
  }

  connectedCallback() {
    // 创建 Root
    this.root = ReactDOM.createRoot(this);
    this._render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'markdown':
          this.markdown = newValue;
          break;
        case 'theme':
          this.theme = newValue;
          break;
        case 'enable-highlight':
          this.enableHighlight = newValue === 'true';
          break;
      }
    }
  }

  private _render() {
    if (this.root) {
      this.root.render(
        <MarkdownComponent
          markdown={this._content}
          className={this.className}
          theme={this._theme as "light" | "dark"}
          enableHighlight={this._enableHighlight}
        />
      );
    }
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

if (!customElements.get('react-markdown-wc')) {
  customElements.define('react-markdown-wc', MarkdownWebComponent);
}

export default MarkdownWebComponent;
