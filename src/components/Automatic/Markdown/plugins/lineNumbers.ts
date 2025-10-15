import MarkdownIt from "markdown-it"

const REG_LINE_NUMBERS = /:line-numbers(?:=(\d+))?(?=$|\s)/ // 例 :line-numbers 或 :line-numbers=5
const REG_NO_LINE_NUMBERS = /:no-line-numbers(?=$|\s)/ // 例 :no-line-numbers
const REG_CLOSE_DIV = /<\/div>$/ // 匹配最外层 </div>
const REG_PRE_LANG_CLASS = /"(language-[^"]*?)"/ // 提取 language-xxx class

export const lineNumberPlugin = (md: MarkdownIt, globalEnable = false) => {
  const originFence = md.renderer.rules.fence?.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, idx, options, env, self): string => {
    const rawHtml = originFence?.(tokens, idx, options, env, self) ?? ""
    const info = tokens[idx]?.info ?? ""

    /* ---------- 判断是否需要渲染行号 ---------- */
    const hasLineDirective = REG_LINE_NUMBERS.test(info)
    const hasNoLineDirective = REG_NO_LINE_NUMBERS.test(info)
    const needLineNumber = globalEnable ? !hasNoLineDirective : hasLineDirective

    if (!needLineNumber) return rawHtml // 早返回，保持最小开销

    /* ---------- 解析起始行号 ---------- */
    const [, startStr] = info.match(REG_LINE_NUMBERS) ?? []
    const startLine = startStr ? Number(startStr) : 1

    /* ---------- 抽取 <code> 内容 ---------- */
    const codeOpenIdx = rawHtml.indexOf("<code>")
    const codeCloseIdx = rawHtml.indexOf("</code>")

    // 若解析失败则直接返回原 HTML，避免 runtime error
    if (codeOpenIdx === -1 || codeCloseIdx === -1) return rawHtml

    const codeContent = rawHtml.slice(codeOpenIdx + 6, codeCloseIdx) // 6 = "<code>".length

    /* ---------- 计算正确的行数 ---------- */
    const lines = codeContent.split("\n")
    if (lines.at(-1) === "") lines.pop()
    const totalLines = lines.length

    /* ---------- 生成行号 HTML ---------- */
    const lineNumberHtml = Array.from(
      { length: totalLines },
      (_, i) => `<span class="line-number">${i + startLine}</span><br>`
    ).join("")

    const lineNumberWrapper = `<div class="line-numbers-wrapper" aria-hidden="true">${lineNumberHtml}</div>`

    /* ---------- 拼装最终 HTML ---------- */
    return (
      rawHtml
        // a) 在最外层 </div> 前插入行号包裹
        .replace(REG_CLOSE_DIV, `${lineNumberWrapper}</div>`)
        // b) 给 <pre> 标签额外加一个 line-numbers-mode class
        .replace(REG_PRE_LANG_CLASS, '"$1 line-numbers-mode"')
    )
  }
}
