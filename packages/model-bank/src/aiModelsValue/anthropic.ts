import anthropic from "../aiModels/anthropic"
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
const { VITE_ANTHROPIC_BASE_URL } = import.meta.env

export const AnthropicModelValue = {
  Model: createModel({
    collapse: anthropic.chatModels.map((t) => t.id),
    options: anthropic,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: VITE_ANTHROPIC_BASE_URL,
    apiHost: "https://api.anthropic.com/v1/messages",
  }),
  Token: createToken({
    provider: "Anthropic",
    apiKey: "https://console.anthropic.com/settings/keys",
    doubt: `${docs}/guides/model-provider.html#vite-anthropic-api-key`,
  }),
  CheckPoint: createCheckPoint("claude-opus-4-6"),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
