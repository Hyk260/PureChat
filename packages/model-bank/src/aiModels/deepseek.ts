import type { ModelProviderCard } from "@pure/types"

// ref: https://platform.deepseek.com/api-docs/pricing
const DeepSeek: ModelProviderCard = {
  chatModels: [
    {
      tokens: 65_536,
      description:
        "最新模型 DeepSeek-V3 多项评测成绩超越 Qwen2.5-72B 和 Llama-3.1-405B 等开源模型，性能对齐领军闭源模型 GPT-4o 与 Claude-3.5-Sonnet。",
      displayName: "DeepSeek V3",
      enabled: true,
      webSearch: true,
      functionCall: true,
      id: "deepseek-chat",
    },
    {
      tokens: 65_536,
      description: "DeepSeek 推出的推理模型。在输出最终回答之前，模型会先输出一段思维链内容，以提升最终答案的准确性。",
      displayName: "DeepSeek R1",
      enabled: true,
      reasoning: true,
      functionCall: true,
      id: "deepseek-reasoner",
    },
    {
      tokens: 1_048_576,
      displayName: "DeepSeek V4 Flash",
      enabled: true,
      description:
        "DeepSeek V4 Flash 是 V4 系列中具备高性价比的模型，提供 100 万上下文窗口与混合思考模式。默认开启思考模式，可通过 `thinking` 参数切换；非思考模式适用于低延迟场景。",
      id: "deepseek-v4-flash",
      functionCall: true,
      reasoning: true,
    },
    {
      tokens: 1_000_000,
      description:
        "DeepSeek V4 Pro 是 V4 系列旗舰，针对高强度推理、Agent 工作流和长程规划进行优化。默认开启思考模式，可通过 `thinking` 参数切换。",
      displayName: "DeepSeek V4 Pro",
      id: "deepseek-v4-pro",
      functionCall: true,
      reasoning: true,
      enabled: true,
    },
  ],
  checkModel: "deepseek-chat",
  description:
    "DeepSeek 是一家专注于人工智能技术研究和应用的公司，其最新模型 DeepSeek-V3 多项评测成绩超越 Qwen2.5-72B 和 Llama-3.1-405B 等开源模型，性能对齐领军闭源模型 GPT-4o 与 Claude-3.5-Sonnet。",
  id: "deepseek",
  modelsUrl: "https://platform.deepseek.com/api-docs/zh-cn/quick_start/pricing",
  name: "DeepSeek",
  url: "https://deepseek.com",
}

export default DeepSeek
