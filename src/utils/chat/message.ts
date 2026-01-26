import { copyImageToClipboard } from "@pure/utils"

import type { DB_Message, ImagePayloadType } from "@pure/database/schemas"

export const isSelf = (item: DB_Message) => {
  return item.from === window.localStg.get("timProxy")?.userProfile?.userID
}

/**
 * 复制消息内容到剪贴板
 */
export const handleCopyMsg = async (data: DB_Message) => {
  try {
    const { payload, type } = data
    if (type === "TIMTextElem" && payload?.text) {
      window.copyToClipboard(payload.text)
      return
    }
    if (type === "TIMImageElem") {
      const imagePayload = data.payload as ImagePayloadType
      const url = imagePayload?.imageInfoArray?.[0]?.url || ""
      await copyImageToClipboard(url)
      window.$message?.success("图片复制成功")
    }
  } catch (error) {
    console.error("复制失败:", error)
    window.$message?.error("复制失败")
  }
}
