import { emojiMap, emojiUrl } from "@/utils/emoji/emoji-map";

export function decodeText(text) {
  const renderDom = []; // 存储渲染后的 DOM 元素
  let remainingText = text; // 剩余未处理的文本
  let leftBracketIndex = -1; // 左括号的索引
  let rightBracketIndex = -1; // 右括号的索引

  while (remainingText !== "") {
    leftBracketIndex = remainingText.indexOf("[");
    rightBracketIndex = remainingText.indexOf("]");

    // 如果左括号在第一个位置
    if (leftBracketIndex === 0) {
      // 如果没有右括号
      if (rightBracketIndex === -1) {
        // 直接将文本推入渲染数组中
        renderDom.push({
          name: "text",
          text: remainingText,
        });
        remainingText = "";
      } else {
        // 获取表情文本
        const emojiText = remainingText.slice(0, rightBracketIndex + 1);
        const emoji = emojiMap[emojiText];
        // 如果是已知表情
        if (emoji) {
          // 将表情推入渲染数组中
          renderDom.push({
            name: "img",
            src: emojiUrl + emoji,
            localSrc: emoji, // 本地表情包地址
          });
          remainingText = remainingText.substring(rightBracketIndex + 1);
        } else {
          // 不是已知表情，将左括号推入渲染数组中
          renderDom.push({
            name: "text",
            text: "[",
          });
          remainingText = remainingText.slice(1);
        }
      }
    } else if (leftBracketIndex === -1) {
      // 没有左括号，将文本推入渲染数组中
      renderDom.push({
        name: "text",
        text: remainingText,
      });
      remainingText = "";
    } else {
      // 将左括号之前的文本推入渲染数组中
      renderDom.push({
        name: "text",
        text: remainingText.slice(0, leftBracketIndex),
      });
      remainingText = remainingText.substring(leftBracketIndex);
    }
  }
  return renderDom;
}
