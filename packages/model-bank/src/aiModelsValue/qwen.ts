import qwen from "../aiModels/qwen"
import {
  createCheckPoint,
  createHistoryMessageCount,
  createModel,
  createOpenaiUrl,
  createTemperature,
  createToken,
  createTopP,
  createFrequencyPenalty,
  createPresencePenalty,
} from "./shared"

const docs = __APP_INFO__.pkg.docs
const { VITE_QWEN_BASE_URL } = import.meta.env

export const QwenModelValue = {
  Model: createModel({
    collapse: qwen.chatModels.map((t) => t.id),
    options: qwen,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: VITE_QWEN_BASE_URL,
    apiHost: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
  }),
  Token: createToken({
    provider: "Qwen",
    doubt: `${docs}/guides/model-provider.html#vite-qwen-api-key`,
  }),
  CheckPoint: createCheckPoint(""),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
