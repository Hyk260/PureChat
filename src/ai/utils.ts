import { ModelID } from "@shared/provider"
import { isEmpty } from "lodash-es"

import { AssistantAvatar, modelConfig, modelValue } from "@/ai/constant"
import { LLMParams, ModelProvider, ModelProviderKey } from "@/ai/types"
import { useRobotStore } from "@/stores/modules/robot"
import { localStg } from "@/utils/storage"

import {
  isOpenAIChatCompletionOnlyModel,
  isOpenAIOpenWeightModel,
  isOpenAIReasoningModel,
  isQwenMTModel,
} from "./reasoning"

import type { Model } from "@/types"
import type { ModelIDValue } from "@shared/provider"

/**
 * 获取 AI 模型的配置信息
 */
export const useAccessStore = (model: ModelProviderKey = ModelProvider.OpenAI): LLMParams => {
  const access = useRobotStore().accessStore?.[model] || ""

  return isEmpty(access) ? modelConfig[model] : access
}

/**
 * 根据提供的模型ID获取模型类型。
 * @param {string} modelId - '@RBT#001' 模型ID，用于识别不同的模型类型。
 * @returns {ModelProviderKey | string} - 'openai' 返回对应的模型类型，如果模型ID无效则返回''。
 */
export function getModelType(modelId: string): ModelProviderKey {
  if (!/@RBT#/.test(modelId)) {
    throw new Error("Invalid modelId")
  }
  const modelMapping = {
    [ModelID.OpenAI]: ModelProvider.OpenAI,
    [ModelID.ZhiPu]: ModelProvider.ZhiPu,
    [ModelID.ZeroOne]: ModelProvider.ZeroOne,
    [ModelID.Qwen]: ModelProvider.Qwen,
    [ModelID.Ollama]: ModelProvider.Ollama,
    [ModelID.GitHub]: ModelProvider.GitHub,
    [ModelID.DeepSeek]: ModelProvider.DeepSeek,
    [ModelID.Mistral]: ModelProvider.Mistral,
  }
  return modelMapping[modelId.replace("C2C", "") as ModelIDValue]
}

export function getModelId(model: ModelProviderKey) {
  if (!model) return ""
  const modelMapping = {
    [ModelProvider.OpenAI]: ModelID.OpenAI,
    [ModelProvider.ZhiPu]: ModelID.ZhiPu,
    [ModelProvider.ZeroOne]: ModelID.ZeroOne,
    [ModelProvider.Qwen]: ModelID.Qwen,
    [ModelProvider.Ollama]: ModelID.Ollama,
    [ModelProvider.GitHub]: ModelID.GitHub,
    [ModelProvider.DeepSeek]: ModelID.DeepSeek,
    [ModelProvider.Mistral]: ModelID.Mistral,
  }
  return modelMapping[model] || ""
}

export function getModelSvg(id: string): string {
  const modelId = getModelType(id)
  const data = {
    [ModelProvider.OpenAI]: "openai",
    [ModelProvider.ZhiPu]: "chatglm",
    [ModelProvider.ZeroOne]: "yi",
    [ModelProvider.Qwen]: "qwen",
    [ModelProvider.Ollama]: "ollama",
    [ModelProvider.GitHub]: "openai",
    [ModelProvider.DeepSeek]: "deepseek",
    [ModelProvider.Mistral]: "mistral",
    llava: "llava",
  }
  return data[modelId] || ""
}

export function prettyObject(msg: any) {
  const obj = msg
  if (typeof msg !== "string") {
    msg = JSON.stringify(msg, null, "  ")
  }
  if (msg === "{}") {
    return obj.toString()
  }
  if (msg.startsWith("```json")) {
    return msg
  }
  return ["```json", msg, "```"].join("\n")
}

/**
 * 获取用户头像 URL
 */
export const getAvatarUrl = (id: string, type: "local" | "cloud" = "local"): string => {
  // icon.png
  const suffix = AssistantAvatar[getModelType(id) as ModelProvider] || ""
  if (type === "local") {
    return new URL(`../assets/images/model-provider/${suffix}`, import.meta.url).href
  } else {
    return `${import.meta.env.VITE_CLOUD_BASE_URL}${suffix}`
  }
}

/**
 * 获取 AI 用户头像 URL
 * @param {string} id - 会话 ID C2C@RBT#001
 * @returns {string} 头像 URL 或空字符串
 * @deprecated 请使用 @/ai/getAiAvatarUrl 中的新版本
 */
export function getAiAvatarUrl(id: string): string {
  if (id.includes("@RBT#")) {
    return getAvatarUrl(id)
  } else {
    return ""
  }
}

const getStatus = (errorType: string) => {
  if (errorType.toString().includes("Invalid")) return 401
  else return 400
}

export const createErrorResponse = (errorType: string, body: any) => {
  const statusCode = getStatus(errorType)

  const data = { body, errorType }

  return new Response(prettyObject(data), { status: statusCode })
}

export function isDalle3(model: string) {
  return "dall-e-3" === model
}

export function base64Image2Blob(base64Data: string, contentType: string): Blob {
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: contentType })
}

export async function uploadImage(file: File | Blob) {
  const body = new FormData()
  body.append("file", file)
  const res = await fetch("https://api.openai.com", {
    method: "post",
    body,
    mode: "cors",
    credentials: "include",
  })
  const res_1 = await res.json()
  console.log("res", res_1)
  if (res_1?.code == 0 && res_1?.data) {
    return res_1?.data
  }
  throw Error(`upload Error: ${res_1?.msg}`)
}

export async function extractImageMessage(res: any): Promise<any> {
  if (res.data) {
    let url = res.data?.at(0)?.url ?? ""
    const b64_json = res.data?.at(0)?.b64_json ?? ""
    if (!url && b64_json) {
      url = await uploadImage(base64Image2Blob(b64_json, "image/png"))
    }
    return [
      {
        type: "image_url",
        image_url: {
          url,
        },
      },
    ]
  }
}

export function generateDalle3RequestPayload(config: any) {
  return {
    model: config.model,
    prompt: "画一只猫",
    response_format: "b64_json",
    n: 1,
    size: "1024x1024",
    quality: "standard",
    style: "vivid",
  }
}

export function getAllModels(model = "") {
  const list = []
  for (const [key, value] of Object.entries(modelValue)) {
    list.push(...value.Model.options.chatModels)
  }
  if (model) {
    return list.filter((t) => t.id === model)?.[0] || {}
  }
  return list
}

export function getInfo() {
  return localStg.get("timProxy")?.userProfile?.profileCustomField
}

export function prefix(key: string) {
  const prefix = "Tag_Profile_Custom_"
  return `${prefix}${key}`
}

export function getValueByKey(array: any[], key: string) {
  if (!array?.length || !key) return null
  const item = array.find((t) => t.key === key)
  return item?.value ? item.value : null
}

// 全员群
export function isFullStaffGroup(data: any) {
  const { groupProfile } = data || {}
  return getValueByKey(groupProfile?.groupCustomField, "custom_info") === "all_staff"
}

export function formatSizeStrict(input: string) {
  const number = parseInt(input.toString().replace("_", ""), 10)

  if (isNaN(number)) {
    throw new Error("Invalid input: The input is not a valid number.")
  }

  if (number % 1000 === 0) {
    return number / 1000 + "K"
  }

  return Math.floor(number / 1000) + "k"
}

export const transformOpenAIStream = (chunk, stack) => {
  // return { data: errorData, id: 'first_chunk_error', type: 'error' };
  try {
    const item = chunk.choices[0]
    if (!item) {
      return { data: chunk, id: chunk.id, type: "data" }
    }

    if (typeof item.delta?.tool_calls === "object" && item.delta.tool_calls?.length > 0) {
      return {
        data: item.delta.tool_calls.map((value, index) => {
          if (stack && !stack.tool) {
            stack.tool = { id: value.id, index: value.index, name: value.function.name }
          }

          return {
            function: {
              arguments: value.function?.arguments ?? "{}",
              name: value.function?.name ?? null,
            },
            id: value.id || stack?.tool?.id,
            index: typeof value.index !== "undefined" ? value.index : index,
            type: value.type || "function",
          }
        }),
        id: chunk.id,
        type: "tool_calls",
      }
    }

    // 给定结束原因
    if (item.finish_reason) {
      if (typeof item.delta?.content === "string" && item.delta.content) {
        return { data: item.delta.content, id: chunk.id, type: "text" }
      }

      return { data: item.finish_reason, id: chunk.id, type: "stop" }
    }

    if (typeof item.delta?.content === "string") {
      return { data: item.delta.content, id: chunk.id, type: "text" }
    }

    if (item.delta?.content === null) {
      return { data: item.delta, id: chunk.id, type: "data" }
    }

    // 其余情况下，返回 delta 和 index
    return {
      data: { delta: item.delta, id: chunk.id, index: item.index },
      id: chunk.id,
      type: "data",
    }
  } catch (e) {
    const errorName = "StreamChunkError"
    console.error(`[${errorName}]`, e)
    console.error(`[${errorName}] raw chunk:`, chunk)

    const err = e

    const errorData = {
      body: {
        message: "chat response streaming chunk parse error, please contact your API Provider to fix it.",
        context: { error: { message: err.message, name: err.name }, chunk },
      },
      type: errorName,
    }

    return { data: errorData, id: chunk.id, type: "error" }
  }
}

/**
 * 确保消息交替排列的强化处理方法
 * 1. 保留所有系统消息
 * 2. 系统消息后第一条必须是用户消息
 * 3. 后续消息必须严格交替排列
 * 4. 自动过滤无效的连续消息
 */
export const adjustForDeepseek = (messages) => {
  const processed = []
  let lastRole = "system"
  let hasSystem = false
  for (const msg of messages) {
    // 处理系统消息
    if (msg.role === "system") {
      processed.push(msg)
      hasSystem = true
      lastRole = "system"
      continue
    }
    // 系统消息后首条必须为用户消息
    if (hasSystem && processed.length === 1) {
      if (msg.role !== "user") continue
      processed.push(msg)
      lastRole = "user"
      continue
    }
    // 常规消息交替检查
    if (msg.role !== lastRole) {
      processed.push(msg)
      lastRole = msg.role
    } else {
      console.warn(`Skipping consecutive ${msg.role} message:`, msg.content)
    }
  }
  // 兜底处理：当存在系统消息但无用户消息时
  if (hasSystem && !processed.some((m) => m.role === "user")) {
    processed.push({
      role: "user",
      content: "请继续",
    })
  }

  return processed.slice(0, 8)
}

export function isNotSupportTemperatureAndTopP(model: Model): boolean {
  if (!model) {
    return true
  }

  if (
    (isOpenAIReasoningModel(model) && !isOpenAIOpenWeightModel(model)) ||
    isOpenAIChatCompletionOnlyModel(model) ||
    isQwenMTModel(model)
  ) {
    return true
  }

  return false
}
