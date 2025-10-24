import { isEmpty } from "lodash-es"

import { customDataWebSearch, DB_Message } from "@/database/schemas/message"
import { convertBlobUrlToDataUrl } from "@/utils/chat"

import type { LLMMessage } from "@/ai/types"
import type { DraftData, ImagePayloadType } from "@/types"

export function checkTextNotEmpty(nodes: DraftData) {
  return nodes.some((obj) => {
    return obj.children.some((child) => {
      return child.text !== ""
    })
  })
}

// 处理文本类型的消息
export function transformTextElement(data: DB_Message) {
  let content: string = data.payload?.text || ""

  if (!isEmpty(data.cloudCustomData) && data.flow === "out") {
    try {
      const customData = JSON.parse(data.cloudCustomData) as customDataWebSearch
      if (customData?.webSearch) {
        content = customData.webSearch?.messageAbstract
      }
    } catch (error) {
      console.warn("transformTextElement error", error)
    }
  }

  return {
    role: data.flow === "in" ? "assistant" : "user",
    content,
  }
}

export function transformCustomElement(item: DB_Message) {
  if (item?.payload?.description !== "tool_call") {
    return {}
  }

  try {
    const input = JSON.parse(item.payload.data)

    const toolCall = input.data.message.choices[0]?.message?.tool_calls
    if (!toolCall) {
      throw new Error("Tool call data is missing in the input payload")
    }

    // 构建返回格式化数据
    const data = [
      {
        content: "",
        role: "assistant",
        tool_calls: toolCall,
      },
      {
        role: "tool",
        name: toolCall[0].function?.name,
        content: item.payload.extension,
        tool_call_id: toolCall[0].id,
      },
    ]

    return data
  } catch (error) {
    console.warn("transformCustomElement error", error)
    return {}
  }
}

// 处理图像类型的消息
export async function transformImageElement(data: DB_Message) {
  const imagePayload = data.payload as ImagePayloadType
  const imageUrl = await convertBlobUrlToDataUrl(imagePayload.imageInfoArray?.[0]?.url || "unknown")
  return {
    role: data.flow === "in" ? "assistant" : "user",
    content: [
      {
        text: "",
        type: "text",
      },
      {
        image_url: {
          detail: "auto",
          url: imageUrl,
        },
        type: "image_url",
      },
    ],
  }
}

export async function transformData(data: DB_Message[]): Promise<LLMMessage[]> {
  if (!data || !Array.isArray(data)) {
    console.warn("data is undefined, null, or not an array")
    return []
  }

  try {
    const relevantData = data.filter((item) => {
      return !item.isTimeDivider && !item.isDeleted && !item.isRevoked
    })

    const transformMap = {
      TIMTextElem: transformTextElement,
      TIMCustomElem: transformCustomElement,
      TIMImageElem: transformImageElement,
      // TIMFileElem: transformFileElement,
    }

    const transformedData = (await Promise.all(
      relevantData.map((item) => {
        const transformFn = transformMap[item.type]
        return transformFn ? transformFn(item) : null
      })
    )) as any[]

    return transformedData.filter((t) => !isEmpty(t)).flat()
  } catch (error) {
    console.error("Error transforming data:", error)
    return []
  }
}

export const chatName = (item) => {
  if (!item) return ""
  switch (item.type) {
    case "C2C":
      return item?.userProfile?.nick || item?.userProfile?.userID || "C2C"
    case "GROUP":
      return item?.groupProfile?.name || "GROUP"
    case "@TIM#SYSTEM":
      return "系统通知"
    default:
      return ""
  }
}
