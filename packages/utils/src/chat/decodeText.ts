export interface RenderDom {
  name: "text" | "img"
  text?: string
  cloudSrc?: string
  localSrc?: string
  testlocalSrc?: string
}

/**
 * 解析文本中的表情符号并转换为渲染DOM元素数组
 *
 * 该函数会解析输入文本中的表情符号，将已知表情符号转换为图片节点，
 * 将普通文本转换为文本节点。表情符号格式为 [表情名称]，例如 [smile]。
 *
 * @param {Object} params - 函数参数对象
 * @param {string} params.text - 要解析的文本，可能包含表情符号
 * @param {Record<string, string>} params.emojiMap - 表情符号映射表，
 *   键为表情符号文本（如 "[smile]"），值为本地图片路径
 * @returns {Array<RenderDom>} 渲染DOM元素数组，每个元素包含：
 *   - name: "text" | "img" - 节点类型（文本或图片）
 *   - text?: string - 文本内容（仅文本节点）
 *   - localSrc?: string - 本地图片路径（仅图片节点）
 */
export function decodeText({ text, emojiMap }: { text: string; emojiMap: Record<string, string> }): Array<RenderDom> {
  if (!text || typeof text !== "string") {
    return []
  }

  if (!emojiMap || typeof emojiMap !== "object") {
    return [{ name: "text", text }]
  }

  if (text.indexOf("[") === -1) {
    return [{ name: "text", text }]
  }

  const renderDom: Array<RenderDom> = [] // 存储渲染后的 DOM 元素
  let remainingText = text // 剩余未处理的文本
  let leftBracketIndex = -1 // 左括号的索引
  let rightBracketIndex = -1 // 右括号的索引

  while (remainingText !== "") {
    leftBracketIndex = remainingText.indexOf("[")
    rightBracketIndex = remainingText.indexOf("]")

    // 如果左括号在第一个位置
    if (leftBracketIndex === 0) {
      // 如果没有右括号
      if (rightBracketIndex === -1) {
        // 直接将文本推入渲染数组中
        renderDom.push({
          name: "text",
          text: remainingText,
        })
        remainingText = ""
      } else {
        // 获取表情文本
        const emojiText = remainingText.slice(0, rightBracketIndex + 1)
        const emoji = emojiMap[emojiText]
        // 如果是已知表情
        if (emoji) {
          // 将表情推入渲染数组中
          renderDom.push({
            name: "img",
            // cloudSrc: emojiUrl + emoji,
            localSrc: emoji || "", // 本地表情包地址
            // testlocalSrc: getEmojiAssetUrlSync(emoji || ""),
          })
          remainingText = remainingText.substring(rightBracketIndex + 1)
        } else {
          // 不是已知表情，将左括号推入渲染数组中
          renderDom.push({
            name: "text",
            text: "[",
          })
          remainingText = remainingText.slice(1)
        }
      }
    } else if (leftBracketIndex === -1) {
      // 没有左括号，将文本推入渲染数组中
      renderDom.push({
        name: "text",
        text: remainingText,
      })
      remainingText = ""
    } else {
      // 将左括号之前的文本推入渲染数组中
      renderDom.push({
        name: "text",
        text: remainingText.slice(0, leftBracketIndex),
      })
      remainingText = remainingText.substring(leftBracketIndex)
    }
  }

  return renderDom
}
