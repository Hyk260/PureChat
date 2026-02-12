import { nextTick } from "vue"

import { documentExts, textExts } from "@pure/const"
import { IDomEditor } from "@wangeditor/editor"
import { getFileType, fileToBase64, formatSize } from "@pure/utils"

const { DEV: isDev } = import.meta.env

export const TEXT_FILE_EXTENSIONS = new Set([...textExts, ...documentExts])

export const isTextFile = (fileName: string) => {
  const extension = fileName.toLowerCase()
  return TEXT_FILE_EXTENSIONS.has(`.${extension}`)
}

export const createMediaElement = (type: string, props: any = {}) => ({
  type,
  ...props,
  children: [{ text: "" }],
})

export const handleAssistantFile = async (file: File, editor: IDomEditor) => {
  if (!file || !editor) return

  const fileType = getFileType(file?.name)

  if (!isTextFile(fileType)) {
    window.$message?.warning(`暂不支持${fileType || file.name}文件`)
    return
  }

  const type = file.type.match("^image/") ? "image" : "file"
  const base64Url = await fileToBase64(file)
  if (type === "image") {
    const imageElement = {
      type: "image",
      src: base64Url,
      fileName: file.name,
      style: { width: "125px" },
      children: [{ text: "" }],
    }
    editor.insertNode(imageElement)
  } else if (type === "file") {
    const node = createMediaElement("attachment", {
      fileName: file.name,
      fileSize: formatSize(file.size),
      link: base64Url,
      path: file?.path || "",
    })
    editor.insertNode(node)
  }
}

export const handleString = (item: DataTransferItem, editor: IDomEditor) => {
  if (item.type === "text/plain") {
    item.getAsString((str) => {
      editor.insertText(str.trimStart())
      console.log("handleString text/plain:", str)
    })
  } else if (item.type === "text/html") {
    item.getAsString((html) => {
      console.log("handleString text/html:", html)
    })
  }
}

export const insertEmoji = (option, editor: IDomEditor) => {
  if (!editor) throw new Error("editor is undefined")
  const { url, item } = option

  const data = createMediaElement("image", {
    class: "EmoticonPack",
    src: url,
    alt: item,
    style: { width: "26px" },
  })
  editor.restoreSelection()
  editor.insertNode(data)
  editor.focus(true)
}

export const customAlert = (s: string, t: string) => {
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

export const handleEditorKeyDown = async (bol: boolean) => {
  if (!bol) return
  await nextTick()
  // 解决@好友上键切换光标移动问题
  const container = document.querySelector(".w-e-text-container") as HTMLDivElement
  if (!container) return
  container.onkeydown = (e) => {
    // 键盘上下键
    if ([38, 40].includes(e.keyCode)) {
      return false
    } else {
      return true
    }
  }
}
