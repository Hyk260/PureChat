import emitter from "@/utils/mitt-bus"

export const useHandlerDrop = () => {
  let lastEnterElem = null

  function setOverStyle(item, action) {
    try {
      const dom = document.getElementById(`message_${item.conversationID}`)
      if (dom) {
        dom.classList[action]("over-style") // add/remove
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 释放（放置）在目标对象上时触发
  const handleDrop = (e, item, cd) => {
    if (!e.dataTransfer?.items || e.dataTransfer.items.length === 0) return
    e.preventDefault()
    setOverStyle(item, "remove")
    cd(item)
    emitter.emit("handleFileDrop", e.dataTransfer.files[0])
  }

  // 拖动对象进入目标对象时触发
  const handleDragEnter = (e, item) => {
    if (!e.dataTransfer?.items || e.dataTransfer.items.length === 0) return
    e.preventDefault()
    lastEnterElem = e.currentTarget
    setOverStyle(item, "add")
  }

  // 拖动对象离开目标对象时触发
  const handleDragLeave = (e, item) => {
    if (!e.dataTransfer?.items || e.dataTransfer.items.length === 0) return
    e.preventDefault()
    if (lastEnterElem === e.currentTarget) return
    setOverStyle(item, "remove")
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return {
    handleDrop: (e, item, cd) => handleDrop(e, item, cd),
    handleDragEnter: (e, item) => handleDragEnter(e, item),
    handleDragLeave: (e, item) => handleDragLeave(e, item),
    handleDragOver: (e) => handleDragOver(e),
  }
}
