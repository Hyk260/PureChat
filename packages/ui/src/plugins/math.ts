import mathjax3 from "markdown-it-mathjax3"

import type MarkdownIt from "markdown-it"

// Heuristic to decide whether a piece of text is likely math.
// Matches common TeX commands, math operators, function-call patterns like f(x),
// superscripts/subscripts, and common math words.
export function isMathLike(s: string) {
  if (!s) return false
  const stripped = s.trim()
  // quick bailouts
  if (stripped.length > 2000) return true // very long blocks likely math

  // TeX commands e.g. \frac, \alpha
  const texCmd = /\\[a-z]+/i.test(s)
  // Explicit common TeX tokens (keeps compatibility with previous heuristic)
  const texSpecific = /\\(?:text|frac|left|right|times)/.test(s)
  // caret or underscore for super/subscripts
  const superSub = /\^|_/.test(s)
  // common math operator symbols or named commands
  const ops = /[=+\-*/^<>]|\\times|\\pm|\\cdot|\\le|\\ge|\\neq/.test(s)
  // function-like patterns: f(x), sin(x)
  const funcCall = /[A-Z]+\s*\([^)]+\)/i.test(s)
  // common math words
  const words = /\b(?:sin|cos|tan|log|ln|exp|sqrt|frac|sum|lim|int|prod)\b/.test(s)

  return texCmd || texSpecific || superSub || ops || funcCall || words
}

// Exported helper for direct testing and reuse
export function normalizeStandaloneBackslashT(s: string) {
  const map: Record<string, string> = {
    "\t": "t",
    "\r": "r",
    "\b": "b",
    "\f": "f",
    "\v": "v",
  }

  s = s.replace(/(^|[^\\])([\t\r\b\f\v])/g, (_m, p1, p2) => `${p1}\\${map[p2]}`)
  return s.replace(/!/g, "\\!")
}

export function applyMath(md: MarkdownIt) {
  // Inline rule for \(...\) and $$...$$ and $...$
  const mathInline = (state: any, silent: boolean) => {
    const delimiters: [string, string, boolean][] = [
      ["\\(", "\\)", true],
      ["$$", "$$", true],
    ]

    for (const [open, close] of delimiters) {
      const start = state.pos
      if (state.src.slice(start, start + open.length) !== open) continue

      const end = state.src.indexOf(close, start + open.length)
      if (end === -1) continue

      if (!silent) {
        const token = state.push("math_inline", "math", 0)
        token.content = state.src.slice(start + open.length, end)
        token.markup = open === "$$" ? "$$" : "\\(\\)"
      }

      state.pos = end + close.length
      return true
    }
    return false
  }

  // Block math rule similar to previous implementation
  const mathBlock = (state: any, startLine: number, endLine: number, silent: boolean) => {
    const delimiters: [string, string][] = [
      ["\\[", "\\]"],
      ["$$", "$$"],
      ["[", "]"],
    ]

    const startPos = state.bMarks[startLine] + state.tShift[startLine]
    const lineText = state.src.slice(startPos, state.eMarks[startLine]).trim()
    let matched = false
    let openDelim = ""
    let closeDelim = ""

    for (const [open, close] of delimiters) {
      if (lineText === open || lineText.startsWith(open)) {
        if (open === "[") {
          if (lineText === "[") {
            if (startLine + 1 < endLine) {
              const nextLineStart = state.bMarks[startLine + 1] + state.tShift[startLine + 1]
              const nextLineText = state.src.slice(nextLineStart, state.eMarks[startLine + 1])
              const hasMathContent = isMathLike(nextLineText)
              if (hasMathContent) {
                matched = true
                openDelim = open
                closeDelim = close
                break
              }
            }
            continue
          }
        } else {
          matched = true
          openDelim = open
          closeDelim = close
          break
        }
      }
    }

    if (!matched) return false
    if (silent) return true

    if (lineText.includes(closeDelim) && lineText.indexOf(closeDelim) > openDelim.length) {
      const startDelimIndex = lineText.indexOf(openDelim)
      const endDelimIndex = lineText.indexOf(closeDelim, startDelimIndex + openDelim.length)
      const content = lineText.slice(startDelimIndex + openDelim.length, endDelimIndex)

      // For the heuristic-only bracket delimiter '[', check content is math-like
      if (openDelim === "[" && !isMathLike(content)) return false

      const token: any = state.push("math_block", "math", 0)
      token.content = normalizeStandaloneBackslashT(content) // 规范化 \t -> \\\t
      token.markup = openDelim === "$$" ? "$$" : openDelim === "[" ? "[]" : "\\[\\]"
      token.map = [startLine, startLine + 1]
      token.block = true

      state.line = startLine + 1
      return true
    }

    let nextLine = startLine
    let content = ""
    let found = false

    const firstLineContent = lineText === openDelim ? "" : lineText.slice(openDelim.length)

    if (firstLineContent.includes(closeDelim)) {
      const endIndex = firstLineContent.indexOf(closeDelim)
      content = firstLineContent.slice(0, endIndex)
      found = true
      nextLine = startLine
    } else {
      if (firstLineContent) content = firstLineContent

      for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
        const lineStart = state.bMarks[nextLine] + state.tShift[nextLine] - 1
        const lineEnd = state.eMarks[nextLine]
        const currentLine = state.src.slice(lineStart, lineEnd)
        if (currentLine.trim() === closeDelim) {
          found = true
          break
        } else if (currentLine.includes(closeDelim)) {
          found = true
          const endIndex = currentLine.indexOf(closeDelim)
          content += (content ? "\n" : "") + currentLine.slice(0, endIndex)
          break
        }
        content += (content ? "\n" : "") + currentLine
      }
    }

    // For bracket-delimited math, ensure it's math-like before accepting
    if (openDelim === "[" && !isMathLike(content)) return false

    const token: any = state.push("math_block", "math", 0)

    token.content = normalizeStandaloneBackslashT(content) // 规范化 \t -> \\\t
    token.markup = openDelim === "$$" ? "$$" : openDelim === "[" ? "[]" : "\\[\\]"
    token.map = [startLine, nextLine + 1]
    token.block = true
    token.loading = !found

    state.line = nextLine + 1
    return true
  }

  md.inline.ruler.before("escape", "math", mathInline)
  md.block.ruler.before("paragraph", "math_block", mathBlock, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  })

  md.renderer.rules.math_inline = (tokens: any, idx) => {
    const token = tokens[idx]
    return `<span class="math-inline">${escapeHtml(token.content)}</span>`
  }

  md.renderer.rules.math_block = (tokens, idx) => {
    const token = tokens[idx]
    return `<div class="math-block">${escapeHtml(token.content)}</div>`
  }

  // Configure MathJax for better rendering if available
  const mathjaxPlugin = (mathjax3 as any).default ?? mathjax3
  md.use(mathjaxPlugin, {
    tex: {
      inlineMath: [
        ["\\(", "\\)"],
        ["$", "$"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
        ["[", "]"],
      ],
      processEscapes: true,
      processEnvironments: true,
      processRefs: true,
    },
  })

  function escapeHtml(str: string) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }
}
