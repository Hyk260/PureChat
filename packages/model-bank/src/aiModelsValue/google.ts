import google from "../aiModels/google"
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

export const GoogleModelValue = {
  Model: createModel({
    collapse: google.chatModels.map((t) => t.id),
    options: google,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: "https://generativelanguage.googleapis.com",
    apiHost: "https://generativelanguage.googleapis.com/v1beta/openai",
  }),
  Token: createToken({
    provider: "Google",
    apiKey: "https://aistudio.google.com/apikey",
    doubt: `${docs}/guides/model-provider.html#vite-google-api-key`,
  }),
  CheckPoint: createCheckPoint("gemini-3.1-pro-preview"),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
