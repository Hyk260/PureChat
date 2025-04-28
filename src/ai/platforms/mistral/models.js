const Mistral = {
  chatModels: [
    {
      tokens: 128_000,
      description:
        'Mistral Nemo是一个与Nvidia合作开发的12B模型，提供出色的推理和编码性能，易于集成和替换。',
      displayName: 'Mistral Nemo',
      enabled: true,
      functionCall: true,
      id: 'open-mistral-nemo',
    },
    {
      tokens: 128_000,
      description:
        'Mistral Small是成本效益高、快速且可靠的选项，适用于翻译、摘要和情感分析等用例。',
      displayName: 'Mistral Small',
      enabled: true,
      functionCall: true,
      id: 'mistral-small-latest',
    },
    {
      tokens: 128_000,
      description:
        'Mistral Large是旗舰大模型，擅长多语言任务、复杂推理和代码生成，是高端应用的理想选择。',
      displayName: 'Mistral Large',
      enabled: true,
      functionCall: true,
      id: 'mistral-large-latest',
    },
    {
      tokens: 32_768,
      description: 'Codestral是专注于代码生成的尖端生成模型，优化了中间填充和代码补全任务。',
      displayName: 'Codestral',
      id: 'codestral-latest',
    },
    {
      tokens: 128_000,
      description:
        'Pixtral Large 是一款拥有 1240 亿参数的开源多模态模型，基于 Mistral Large 2 构建。这是我们多模态家族中的第二款模型，展现了前沿水平的图像理解能力。',
      displayName: 'Pixtral Large',
      enabled: true,
      functionCall: true,
      id: 'pixtral-large-latest',
      vision: true,
    },
    {
      tokens: 128_000,
      description:
        'Pixtral 模型在图表和图理解、文档问答、多模态推理和指令遵循等任务上表现出强大的能力，能够以自然分辨率和宽高比摄入图像，还能够在长达 128K 令牌的长上下文窗口中处理任意数量的图像。',
      displayName: 'Pixtral 12B',
      enabled: true,
      id: 'pixtral-12b-2409',
      vision: true,
    },
    {
      tokens: 128_000,
      description: 'Ministral 3B 是Mistral的世界顶级边缘模型。',
      displayName: 'Ministral 3B',
      id: 'ministral-3b-latest',
    },
    {
      tokens: 128_000,
      description: 'Ministral 8B 是Mistral的性价比极高的边缘模型。',
      displayName: 'Ministral 8B',
      id: 'ministral-8b-latest',
    },
    {
      tokens: 32_768,
      description:
        'Mistral 7B是一款紧凑但高性能的模型，擅长批量处理和简单任务，如分类和文本生成，具有良好的推理能力。',
      displayName: 'Mistral 7B',
      id: 'open-mistral-7b',
    },
    {
      tokens: 32_768,
      description:
        'Mixtral 8x7B是一个稀疏专家模型，利用多个参数提高推理速度，适合处理多语言和代码生成任务。',
      displayName: 'Mixtral 8x7B',
      id: 'open-mixtral-8x7b',
    },
    {
      tokens: 65_536,
      description:
        'Mixtral 8x22B是一个更大的专家模型，专注于复杂任务，提供出色的推理能力和更高的吞吐量。',
      displayName: 'Mixtral 8x22B',
      functionCall: true,
      id: 'open-mixtral-8x22b',
    },
    {
      tokens: 256_000,
      description:
        'Codestral Mamba是专注于代码生成的Mamba 2语言模型，为先进的代码和推理任务提供强力支持。',
      displayName: 'Codestral Mamba',
      id: 'open-codestral-mamba',
    },
  ],
  checkModel: 'open-mistral-nemo',
  description: 'Mistral 提供先进的通用、专业和研究型模型，广泛应用于复杂推理、多语言任务、代码生成等领域，通过功能调用接口，用户可以集成自定义功能，实现特定应用。',
  modelsUrl: 'https://docs.mistral.ai/getting-started/models',
  url: 'https://mistral.ai',
  id: "mistral",
  icon: "mistral",
  name: "Mistral",
};

export default Mistral;
