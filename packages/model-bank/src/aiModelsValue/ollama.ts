import ollama from "../aiModels/ollama"
import {
  createFrequencyPenalty,
  createHistoryMessageCount,
  createModel,
  createOpenaiUrl,
  createPresencePenalty,
  createTemperature,
  createTopP,
} from "./shared"

const docs = __APP_INFO__.pkg.docs
const { VITE_OLLAMA_PROXY_URL } = import.meta.env

export const OllamaModelValue = {
  Model: createModel({
    collapse: ollama.chatModels.map((t) => t.id),
    options: ollama,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: VITE_OLLAMA_PROXY_URL,
    apiHost: `${VITE_OLLAMA_PROXY_URL}/api/chat`,
    variant: "ollama",
    doubt: `${docs}/guides/olama-usage`,
  }),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
