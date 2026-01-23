import { nextTick } from "vue"
import { throttle } from "lodash-es"
import emitter from "@/utils/mitt-bus"

export * from "./customData"

/**
 * 滚动到指定消息ID对应的DOM位置，并添加动画效果
 */
export const scrollToDomPosition = (msgid: string) => {
  const dom = document.getElementById(`${msgid}`)
  if (!dom) {
    window.$message?.warning("无法查看上下文")
    return
  }
  dom.scrollIntoView({ behavior: "smooth", block: "center" })
  dom.classList.add("shrink-style")
  setTimeout(() => {
    dom.classList.remove("shrink-style")
  }, 2000)
}

export const scrollToMessage = (
  id: string,
  delay = 300,
  options: ScrollIntoViewOptions | boolean = { behavior: "smooth", block: "center" }
) => {
  nextTick(() => {
    setTimeout(() => {
      const dom = document.getElementById(id)
      if (!dom) return
      dom.scrollIntoView(options)
    }, delay)
  })
}

const createProgressHandler = () => {
  let lastProgress = 0
  const handleProgressUpdate = throttle((progress, callback) => {
    if (progress.num !== lastProgress) {
      lastProgress = progress.num
      callback?.()
    }
  }, 50)
  return handleProgressUpdate
}

const handleProgressUpdate = createProgressHandler()

export const fileUploading = (message, rawProgress = 0) => {
  const num = Math.round(rawProgress)

  handleProgressUpdate({ num }, () => {
    const uuid = message?.payload?.uuid || ""
    emitter.emit("fileUploading", { uuid, num })
    console.log("[file] uploading:", `${num}%`)
  })
}
