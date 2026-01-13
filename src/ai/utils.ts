import { isEmpty } from "lodash-es"
import { modelConfig, modelValue } from "@/ai/constant"
import { LLMParams, ModelProvider, Provider, ModelID, type ModelIDValue, type Model } from "model-bank"
import { useRobotStore } from "@/stores/modules/robot"
import { localStg } from "@/utils/storage"
import {
  isOpenAIChatCompletionOnlyModel,
  isOpenAIOpenWeightModel,
  isOpenAIReasoningModel,
  isQwenMTModel,
} from "./reasoning"

/**
 * 获取 AI 模型的配置信息
 */
export const useAccessStore = (model: Provider = ModelProvider.OpenAI): LLMParams => {
  const access = useRobotStore().accessStore?.[model] || ""

  return isEmpty(access) ? modelConfig[model] : access
}

/**
 * 根据提供的模型ID获取模型类型。
 * @param {string} modelId - '@RBT#001' 模型ID，用于识别不同的模型类型。
 * @returns {Provider | string} - 'openai' 返回对应的模型类型，如果模型ID无效则返回''。
 */
export function getModelType(modelId: string): Provider {
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

export function getModelId(model: Provider) {
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
  return modelMapping[model] || null
}

export function getModelIcon(id: string): string {
  let modelId = ""
  try {
    modelId = getModelType(id)
  } catch {
    modelId = ""
  }
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

const getStatus = (errorType: string) => {
  if (errorType.toString().includes("Invalid")) return 401
  else return 400
}

export const createErrorResponse = (errorType: any, body: any) => {
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
  if (res_1?.code === 0 && res_1?.data) {
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
