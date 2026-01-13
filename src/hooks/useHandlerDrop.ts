import { delay } from "@/utils/common"
import emitter from "@/utils/mitt-bus"

import type { DB_Session } from "@pure/database/schemas"

interface DragHandlerProps {
  event: DragEvent
  item: DB_Session
  callback?: (arg0: any) => void
}

/**
 * 处理拖拽相关操作的 Hook
 * @returns 返回拖拽相关的处理函数
 */
export const useHandlerDrop = () => {
  let lastEnterElement: EventTarget | null = null

  /**
   * 验证拖拽数据是否有效
   * @param event 拖拽事件
   * @returns boolean
   */
  const isValidDragData = (event: DragEvent): boolean => {
    return Boolean(event.dataTransfer?.items?.length)
  }

  /**
   * 清除所有拖拽样式
   */
  const clearAllDropZoneStyles = () => {
    const elements = document.querySelectorAll(".over-style")
    elements.forEach((element) => {
      element.classList.remove("over-style")
    })
  }

  /**
   * 设置元素的拖拽样式
   * @param item Session 数据
   * @param action 添加或移除样式
   */
  function setOverStyle(item: DB_Session, action: "add" | "remove") {
    try {
      const element = document.getElementById(`message_${item.conversationID}`)
      if (element) {
        if (action === "add") {
          clearAllDropZoneStyles()
          element.classList.add("over-style")
        } else {
          element.classList.remove("over-style")
        }
      }
    } catch (error) {
      console.error("设置拖拽样式失败:", error)
    }
  }

  /**
   * 处理拖拽释放
   */
  const handleDrop = async ({ event, item, callback }: DragHandlerProps) => {
    if (!isValidDragData(event)) return

    event.preventDefault()
    event.stopPropagation()
    setOverStyle(item, "remove")

    const files = event.dataTransfer?.files
    if (files?.[0]) {
      callback?.(item)
      await delay(100)
      emitter.emit("handleFileDrop", files[0])
    }
  }

  /**
   * 处理拖拽进入
   */
  const handleDragEnter = ({ event, item }: DragHandlerProps) => {
    if (!isValidDragData(event)) return

    event.preventDefault()
    event.stopPropagation()
    lastEnterElement = event.currentTarget
    setOverStyle(item, "add")
  }

  /**
   * 处理拖拽离开
   */
  const handleDragLeave = ({ event, item }: DragHandlerProps) => {
    if (!isValidDragData(event)) return

    event.preventDefault()
    event.stopPropagation()
    if (lastEnterElement === event.currentTarget) return
    setOverStyle(item, "remove")
  }

  /**
   * 处理拖拽悬停
   */
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return {
    handleDrop: (e: DragEvent, item: DB_Session, callback: any) => handleDrop({ event: e, item, callback }),
    handleDragEnter: (e: DragEvent, item: DB_Session) => handleDragEnter({ event: e, item }),
    handleDragLeave: (e: DragEvent, item: DB_Session) => handleDragLeave({ event: e, item }),
    handleDragOver,
  }
}
