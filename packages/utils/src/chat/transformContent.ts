import { customDataWebSearch, DB_Message } from "@pure/database/schemas"
import { convertBlobUrlToDataUrl, safeParseJSON } from "@pure/utils"

import type { FewShots } from "@pure/types"
import type { ImagePayloadType, CustomPayloadType } from "@pure/database/schemas"

const EXCLUDED_FLAGS: (keyof DB_Message)[] = ["isTimeDivider", "isDeleted", "isRevoked"]

const isExcludedMessage = (msg: DB_Message): boolean => EXCLUDED_FLAGS.some((flag) => Boolean(msg[flag]))

/** flow -> role 映射 */
const getRoleFlow = (flow: DB_Message["flow"]): "assistant" | "user" => (flow === "in" ? "assistant" : "user")

const asArray = <T>(value: T | T[] | null | undefined): T[] =>
  value == null ? [] : Array.isArray(value) ? value : [value]

// 处理文本类型的消息
function transformTextElement(data: DB_Message) {
  const baseContent = data.payload?.text || ""

  // out + cloudCustomData：优先用 webSearch.messageAbstract
  if (data.flow === "out" && data.cloudCustomData) {
    const parsed = safeParseJSON<customDataWebSearch>(data.cloudCustomData)
    const abstract = parsed?.webSearch?.messageAbstract
    return { role: getRoleFlow(data.flow), content: abstract ?? baseContent }
  }

  return {
    role: getRoleFlow(data.flow),
    content: baseContent,
  }
}

function transformCustomElement(item: DB_Message) {
  const payload = item?.payload as CustomPayloadType
  if (payload?.description !== "tool_call") {
    return {}
  }

  const input = safeParseJSON<{ data: { message: { choices: Array<{ message?: { tool_calls?: any } }> } } }>(
    payload.data
  )
  const toolCall = input?.data?.message?.choices?.[0]?.message?.tool_calls

  if (!toolCall) {
    return {}
  }

  const firstToolCall = toolCall[0]
  if (!firstToolCall) {
    return {}
  }

  return [
    {
      content: "",
      role: "assistant",
      tool_calls: toolCall,
    },
    {
      role: "tool",
      name: firstToolCall.function?.name,
      content: payload.extension,
      tool_call_id: firstToolCall.id,
    },
  ]
}

export const transformFileElement = async (data) => {
  const { payload: file } = data
  try {
    return {
      role: data.flow === "in" ? "assistant" : "user",
      content: "file: ",
    }
  } catch (error) {
    console.error("transformFileElement error", error)
    return {
      role: "user",
      content: "file: Unknown",
    }
  }
}

// 处理图像类型的消息
async function transformImageElement(data: DB_Message) {
  const imagePayload = data.payload as ImagePayloadType
  const imageUrl = imagePayload.imageInfoArray?.[0]?.url
  if (!imageUrl) return null
  const dataUrl = await convertBlobUrlToDataUrl(imageUrl)

  return {
    role: getRoleFlow(data.flow),
    content: [
      { text: "", type: "text" },
      { image_url: { detail: "auto", url: dataUrl }, type: "image_url" },
    ],
  }
}
/**
 * transformer 映射：统一返回 TransformResult / Promise<TransformResult>
 */
const transformers = {
  TIMTextElem: transformTextElement,
  TIMCustomElem: transformCustomElement,
  TIMImageElem: transformImageElement,
  TIMFileElem: transformFileElement,
} as const

type SupportedType = keyof typeof transformers

/**
 * 类型守卫：判断 DB_Message.type 是否在 transformers
 */
const isSupportedType = (type: string): type is SupportedType => type in transformers

export async function transformContent(messages: DB_Message[]): Promise<FewShots> {
  if (!Array.isArray(messages) || messages.length === 0) return []

  const results = await Promise.all(
    messages
      .filter((m) => !isExcludedMessage(m))
      .map((m) => (isSupportedType(m.type) ? transformers[m.type](m as any) : null))
  )

  // 统一扁平化，避免返回 {} 再用 isEmpty 过滤（更显式、更可读）
  return results.flatMap((r) => asArray(r)) as FewShots
}
