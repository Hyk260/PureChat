import type { DB_Session } from "@pure/database/schemas"

type DropAction = "add" | "remove"

interface UseHandlerDropOptions {
  overClassName?: string
  getDropZoneElementId?: (item: DB_Session) => string
  onFileDrop?: (file: File, item: DB_Session) => void
}

interface DragHandlerProps {
  event: DragEvent
  item: DB_Session
}

/**
 * 处理拖拽相关操作的 Hook
 * @returns 返回拖拽相关的处理函数
 */
export const useHandlerDrop = ({
  overClassName = "over-style",
  getDropZoneElementId = (item) => `message_${item.conversationID}`,
  onFileDrop,
}: UseHandlerDropOptions = {}) => {
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
    const elements = document.querySelectorAll(`.${overClassName}`)
    elements.forEach((element) => {
      element.classList.remove(overClassName)
    })
  }

  /**
   * 设置元素的拖拽样式
   * @param item Session 数据
   * @param action 添加或移除样式
   */
  function setOverStyle(item: DB_Session, action: DropAction) {
    try {
      const element = document.getElementById(getDropZoneElementId(item))
      if (element) {
        if (action === "add") {
          clearAllDropZoneStyles()
          element.classList.add(overClassName)
        } else {
          element.classList.remove(overClassName)
        }
      }
    } catch (error) {
      console.error("设置拖拽样式失败:", error)
    }
  }

  /**
   * 处理拖拽释放
   */
  const handleDrop = ({ event, item }: DragHandlerProps) => {
    if (!isValidDragData(event)) return

    event.preventDefault()
    event.stopPropagation()
    setOverStyle(item, "remove")

    const files = event.dataTransfer?.files
    if (files?.[0]) {
      onFileDrop?.(files[0], item)
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
    handleDrop: (e: DragEvent, item: DB_Session) => handleDrop({ event: e, item }),
    handleDragEnter: (e: DragEvent, item: DB_Session) => handleDragEnter({ event: e, item }),
    handleDragLeave: (e: DragEvent, item: DB_Session) => handleDragLeave({ event: e, item }),
    handleDragOver,
  }
}
