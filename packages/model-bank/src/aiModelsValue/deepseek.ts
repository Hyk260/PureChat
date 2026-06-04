import deepseek from "../aiModels/deepseek"
import {
  createCheckPoint,
  createFrequencyPenalty,
  createHistoryMessageCount,
  createModel,
  createOpenaiUrl,
  createPresencePenalty,
  createTemperature,
  createToken,
  createTopP,
} from "./shared"

const docs = __APP_INFO__.pkg.docs
const { VITE_DEEPSEEK_BASE_URL } = import.meta.env

export const DeepseekModelValue = {
  Model: createModel({
    collapse: deepseek.chatModels.map((t) => t.id),
    options: deepseek,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: VITE_DEEPSEEK_BASE_URL,
    apiHost: `${VITE_DEEPSEEK_BASE_URL}/chat/completions`,
  }),
  Token: createToken({
    provider: "Deepseek",
    apiKey: "https://platform.deepseek.com/api_keys",
    doubt: `${docs}/guides/model-provider.html#vite-deepseek-api-key`,
  }),
  CheckPoint: createCheckPoint("deepseek-chat"),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
