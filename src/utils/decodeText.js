import { emojiMap, emojiUrl, localemojiUrl } from "./emoji-map"

export function decodeText(text) {
  let renderDom = []
  let temp = text
  let left = -1
  let right = -1
  while (temp !== '') {
    left = temp.indexOf('[')
    right = temp.indexOf(']')
    switch (left) {
      case 0:
        if (right === -1) {
          renderDom.push({
            name: 'text',
            text: temp
          })
          temp = ''
        } else {
          let _emoji = temp.slice(0, right + 1)
          let emoji = emojiMap[_emoji]
          if (emoji) {
            // let url = require(`@/assets/expression/${emoji}`)
            // console.log(url)
            renderDom.push({
              name: 'img',
              src: emojiUrl + emojiMap[_emoji]
            })
            temp = temp.substring(right + 1)
          } else {
            renderDom.push({
              name: 'text',
              text: '['
            })
            temp = temp.slice(1)
          }
        }
        break
      case -1:
        renderDom.push({
          name: 'text',
          text: temp
        })
        temp = ''
        break
      default:
        renderDom.push({
          name: 'text',
          text: temp.slice(0, left)
        })
        temp = temp.substring(left)
        break
    }
  }
  return renderDom
}
