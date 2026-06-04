import zeroone from "../aiModels/zeroone"
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
const { VITE_ZEROONE_BASE_URL } = import.meta.env

export const ZeroOneModelValue = {
  Model: createModel({
    collapse: zeroone.chatModels.map((t) => t.id),
    options: zeroone,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: VITE_ZEROONE_BASE_URL || "",
    apiHost: "https://api.lingyiwanwu.com/v1/chat/completions",
  }),
  Token: createToken({
    provider: "Zeroone",
    doubt: `${docs}/guides/model-provider.html#vite-zeroone-api-key`,
  }),
  CheckPoint: createCheckPoint(""),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
