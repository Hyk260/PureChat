import mistral from "../aiModels/mistral"
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
const { VITE_MISTRAL_BASE_URL } = import.meta.env

export const MistralModelValue = {
  Model: createModel({
    collapse: mistral.chatModels.map((t) => t.id),
    options: mistral,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: VITE_MISTRAL_BASE_URL,
    apiHost: "https://api.mistral.ai/v1/chat/completions",
  }),
  Token: createToken({
    provider: "Mistral",
    doubt: `${docs}/guides/model-provider.html#vite-mistral-api-key`,
  }),
  CheckPoint: createCheckPoint(""),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
