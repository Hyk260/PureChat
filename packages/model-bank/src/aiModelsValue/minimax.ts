import minimax from "../aiModels/minimax"
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
const { VITE_MINIMAX_BASE_URL } = import.meta.env

export const MinimaxModelValue = {
  Model: createModel({
    collapse: minimax.chatModels.map((t) => t.id),
    options: minimax,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: VITE_MINIMAX_BASE_URL,
    apiHost: `${VITE_MINIMAX_BASE_URL}/chat/completions`,
  }),
  Token: createToken({
    provider: "Minimax",
    apiKey: "https://platform.minimaxi.com/user-center/basic-information/interface-key",
    doubt: `${docs}/guides/model-provider.html#vite-minimax-api-key`,
  }),
  CheckPoint: createCheckPoint("MiniMax-M2"),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
