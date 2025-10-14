import type MarkdownIt from "markdown-it"

export interface Options {
  /**
   * 支持<img>标签的原生延迟加载。
   * @default false
   */
  lazyLoading?: boolean
}

export const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i

export const imagePlugin = (md: MarkdownIt, { lazyLoading }: Options = {}) => {
  const imageRule = md.renderer.rules.image as any

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx] as any
    let url = token.attrGet("src")
    if (url && !EXTERNAL_URL_RE.test(url)) {
      if (!/^\.?\//.test(url)) url = "./" + url
      token.attrSet("src", decodeURIComponent(url))
    }
    if (lazyLoading) {
      token.attrSet("loading", "lazy")
    }
    return imageRule(tokens, idx, options, env, self)
  }
}
