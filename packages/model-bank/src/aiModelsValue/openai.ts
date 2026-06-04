import openai from "../aiModels/openai"
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
const { VITE_OPENAI_PROXY_URL } = import.meta.env

export const OpenAIModelValue = {
  Model: createModel({
    collapse: openai.chatModels.map((t) => t.id),
    options: openai,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: VITE_OPENAI_PROXY_URL,
    apiHost: "https://api.openai.com/v1/chat/completions",
  }),
  Token: createToken({
    provider: "Openai",
    apiKey: "https://platform.openai.com/api-keys",
    doubt: `${docs}/guides/model-provider.html#vite-openai-api-key`,
  }),
  CheckPoint: createCheckPoint("gpt-4o-mini"),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
