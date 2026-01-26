import { isEmpty } from "lodash-es"
import { modelConfig } from "@/ai/constant"
import { LLMParams, ModelProvider, Provider } from "model-bank"
import { useRobotStore } from "@/stores/modules/robot"

/**
 * 获取 AI 模型的配置信息
 */
export const useAccessStore = (model: Provider = ModelProvider.OpenAI): LLMParams => {
  const access = useRobotStore().accessStore?.[model] || ""

  return isEmpty(access) ? modelConfig[model] : access
}
