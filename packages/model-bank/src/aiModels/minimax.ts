import { ModelProviderCard } from "@pure/types"

const Minimax: ModelProviderCard = {
  chatModels: [
    {
      tokens: 204_800,
      description: "专为高效编码与Agent工作流而生",
      displayName: "MiniMax M2",
      enabled: true,
      id: "MiniMax-M2",
    },
    {
      tokens: 1_000_192,
      description: "全新自研推理模型。全球领先：80K 思维链 x 1M 输入，效果比肩海外顶尖模型",
      displayName: "MiniMax M1",
      id: "MiniMax-M1",
    },
    {
      tokens: 1_000_192,
      description:
        "在 MiniMax-01系列模型中，我们做了大胆创新：首次大规模实现线性注意力机制，传统 Transformer架构不再是唯一的选择。这个模型的参数量高达4560亿，其中单次激活459亿。模型综合性能比肩海外顶尖模型，同时能够高效处理全球最长400万token的上下文，是GPT-4o的32倍，Claude-3.5-Sonnet的20倍。",
      displayName: "MiniMax Text 01",
      id: "MiniMax-Text-01",
      type: "chat",
    },
  ],
  checkModel: "MiniMax-M2",
  description:
    "MiniMax 是 2021 年成立的通用人工智能科技公司，致力于与用户共创智能。MiniMax 自主研发了不同模态的通用大模型，其中包括万亿参数的 MoE 文本大模型、语音大模型以及图像大模型。并推出了海螺 AI 等应用。",
  id: "minimax",
  modelsUrl: "https://platform.minimaxi.com/document/Models",
  name: "Minimax",
  url: "https://www.minimaxi.com",
}

export default Minimax
