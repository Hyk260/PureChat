import zhipu from "../aiModels/zhipu"
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
const { VITE_ZHIPU_BASE_URL } = import.meta.env

export const ZhiPuModelValue = {
  Model: createModel({
    collapse: zhipu.chatModels.map((t) => t.id),
    options: zhipu,
  }),
  OpenaiUrl: createOpenaiUrl({
    placeholder: VITE_ZHIPU_BASE_URL,
    apiHost: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
  }),
  Token: createToken({
    provider: "Zhipu",
    doubt: `${docs}/guides/model-provider.html#vite-zhipu-api-key`,
  }),
  CheckPoint: createCheckPoint(""),
  HistoryMessageCount: createHistoryMessageCount(),
  Temperature: createTemperature(),
  TopP: createTopP(),
  FrequencyPenalty: createFrequencyPenalty(),
  PresencePenalty: createPresencePenalty(),
}
