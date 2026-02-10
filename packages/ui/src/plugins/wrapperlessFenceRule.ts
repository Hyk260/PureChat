// import { escapeHtml, unescapeAll } from "markdown-it/lib/common/utils.mjs"

// const wrapperlessFenceRule = (tokens, idx, options, _env, _slf) => {
//   const token = tokens[idx]
//   const info = token.info ? unescapeAll(token.info).trim() : ""
//   let langName = ""
//   let langAttrs = ""

//   if (info) {
//     const arr = info.split(/(\s+)/g)
//     langName = arr[0]
//     langAttrs = arr.slice(2).join("")
//   }

//   let highlighted
//   if (options.highlight) {
//     highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content)
//   } else {
//     highlighted = escapeHtml(token.content)
//   }

//   return highlighted + "\n"
// }

// export default wrapperlessFenceRule
