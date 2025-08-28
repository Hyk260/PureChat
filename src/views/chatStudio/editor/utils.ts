import { nextTick } from "vue"

import { documentExts, textExts } from "@shared/config"

export const createMediaElement = (type, props) => ({
  type,
  ...props,
  children: [{ text: "" }],
})

export const insertEmoji = ({ url, item }, editor) => {
  if (!editor) {
    console.warn("editor is null")
    return
  }
  editor.restoreSelection()
  editor.insertNode(
    createMediaElement("image", {
      class: "EmoticonPack",
      src: url,
      alt: item,
      style: { width: "26px" },
    })
  )
  editor.focus(true)
}

export const TEXT_FILE_EXTENSIONS = new Set([...textExts, ...documentExts])

export const isTextFile = (fileName) => {
  const extension = fileName.toLowerCase()
  return TEXT_FILE_EXTENSIONS.has(`.${extension}`)
}

export const customAlert = (s, t) => {
  switch (t) {
    case "success":
      console.log("success")
      break
    case "info":
      console.log("info")
      break
    case "warning":
      console.log("warning")
      break
    case "error":
      console.log("error")
      break
    default:
      console.log("default")
      break
  }
}

export const handleToggleLanguage = () => {
  // const placeholder = document.querySelector(".w-e-text-placeholder");
  // if (placeholder) placeholder.innerHTML = placeholderMap.value["input"];
}

export const handleEditorKeyDown = async (show) => {
  if (!show) return
  await nextTick()
  // 解决@好友上键切换光标移动问题
  const container = document.querySelector(".w-e-text-container")
  if (!container) return
  container.onkeydown = (e) => {
    // 键盘上下键
    if ([38, 40].includes(e.keyCode)) {
      return false
    }
  }
}
