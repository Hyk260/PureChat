import github from "../aiModels/github"
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

const { VITE_GITHUB_PROXY_URL } = import.meta.env

export const GitHubModelValue = {
  Model: createModel({
    collapse: github.chatModels.map((t) => t.id),
    options: github,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: VITE_GITHUB_PROXY_URL,
    apiHost: "https://models.inference.ai.azure.com/chat/completions",
    variant: "github",
  }),
  Token: createToken({ variant: "pat" }),
  CheckPoint: createCheckPoint(""),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
