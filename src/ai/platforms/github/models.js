// ref: https://github.com/marketplace/models
// Ref: https://github.blog/news-insights/product-news/introducing-github-models/
const GitHubAI = {
  chatModels: [
    {
      reasoning: true,
      tokens: 128_000,
      displayName: 'DeepSeek R1',
      id: 'DeepSeek-R1',
      icon: "deepseek",
      maxOutput: 4096,
    },
    {
      vision: true,
      tokens: 128_000,
      description: '在高分辨率图像上表现出色的图像推理能力，适用于视觉理解应用。',
      displayName: 'Llama 3.2 11B Vision',
      id: 'llama-3.2-11b-vision-instruct',
      maxOutput: 4096,
      icon: "meta",
    },
    {
      vision: true,
      tokens: 128_000,
      description: '适用于视觉理解代理应用的高级图像推理能力。',
      displayName: 'Llama 3.2 90B Vision',
      id: 'llama-3.2-90b-vision-instruct',
      maxOutput: 4096,
      icon: "meta",
    },
    {
      functionCall: true,
      tokens: 32_768,
      description: 'Llama 3.3 是 Llama 系列最先进的多语言开源大型语言模型，以极低成本体验媲美 405B 模型的性能。基于 Transformer 结构，并通过监督微调（SFT）和人类反馈强化学习（RLHF）提升有用性和安全性。其指令调优版本专为多语言对话优化，在多项行业基准上表现优于众多开源和封闭聊天模型。知识截止日期为 2023 年 12 月',
      displayName: 'Llama 3.3 70B Instruct',
      id: 'llama-3.3-70b-instruct',
      icon: "meta",
    },
    {
      tokens: 128_000,
      description: 'Llama 3.1指令调优的文本模型，针对多语言对话用例进行了优化，在许多可用的开源和封闭聊天模型中，在常见行业基准上表现优异。',
      displayName: 'Meta Llama 3.1 8B',
      id: 'meta-llama-3.1-8b-instruct',
      maxOutput: 4096,
      icon: "meta",
    },
    {
      tokens: 128_000,
      description: 'Llama 3.1指令调优的文本模型，针对多语言对话用例进行了优化，在许多可用的开源和封闭聊天模型中，在常见行业基准上表现优异。',
      displayName: 'Meta Llama 3.1 70B',
      id: 'meta-llama-3.1-70b-instruct',
      maxOutput: 4096,
      icon: "meta",
    },
    {
      tokens: 128_000,
      description: 'Llama 3.1指令调优的文本模型，针对多语言对话用例进行了优化，在许多可用的开源和封闭聊天模型中，在常见行业基准上表现优异。',
      displayName: 'Meta Llama 3.1 405B',
      id: 'meta-llama-3.1-405b-instruct',
      maxOutput: 4096,
      icon: "meta",
    },
    {
      tokens: 8192,
      description: '一个多功能的80亿参数模型，针对对话和文本生成任务进行了优化。',
      displayName: 'Meta Llama 3 8B',
      id: 'meta-llama-3-8b-instruct',
      maxOutput: 4096,
      icon: "meta",
    },
    {
      tokens: 8192,
      description: '一个强大的700亿参数模型，在推理、编码和广泛的语言应用方面表现出色。',
      displayName: 'Meta Llama 3 70B',
      id: 'meta-llama-3-70b-instruct',
      maxOutput: 4096,
      icon: "meta",
    },
    {
      functionCall: true,
      reasoning: true,
      tokens: 200_000,
      description: 'o3-mini 是我们最新的小型推理模型，在与 o1-mini 相同的成本和延迟目标下提供高智能。',
      displayName: 'OpenAI o3-mini',
      id: 'o3-mini',
      maxOutput: 100_000,
    },
    {
      reasoning: true,
      vision: true,
      tokens: 128_000,
      description: '比 o1-preview 更小、更快，成本低80%，在代码生成和小上下文操作方面表现良好。',
      displayName: 'OpenAI o1-mini',
      id: 'o1-mini',
      maxOutput: 65_536,
    },
    {
      reasoning: true,
      vision: true,
      tokens: 200_000,
      description: 'o1是OpenAI新的推理模型，支持图文输入并输出文本，适用于需要广泛通用知识的复杂任务。该模型具有200K上下文和2023年10月的知识截止日期。',
      displayName: 'OpenAI o1',
      id: 'o1',
      maxOutput: 100_000,
    },
    {
      reasoning: true,
      vision: true,
      tokens: 128_000,
      description: '专注于高级推理和解决复杂问题，包括数学和科学任务。非常适合需要深度上下文理解和自主工作流程的应用。',
      displayName: 'OpenAI o1-preview',
      id: 'o1-preview',
      maxOutput: 32_768,
    },
    {
      description: 'Currently points to gpt-4o-mini-2024-07-18',
      displayName: 'GPT-4o mini',
      functionCall: true,
      id: 'gpt-4o-mini',
      maxOutput: 16_385,
      tokens: 128_000,
      vision: true,
      webSearch: true,
    },
    {
      description: 'Currently points to gpt-4o-2024-05-13',
      displayName: 'GPT-4o',
      functionCall: true,
      id: 'gpt-4o',
      tokens: 128_000,
      vision: true,
    },
    // {
    //   description: 'GPT-4 Turbo with Vision',
    //   displayName: 'GPT-4 Turbo',
    //   functionCall: true,
    //   id: 'gpt-4-turbo',
    //   tokens: 128_000,
    //   vision: true,
    // },
    // {
    //   description: 'Currently points to gpt-4-0125-preview',
    //   displayName: 'GPT-4 Turbo Preview',
    //   functionCall: true,
    //   id: 'gpt-4-turbo-preview',
    //   tokens: 128_000,
    // },
    // {
    //   description: 'Currently points to gpt-4-1106-vision-preview',
    //   displayName: 'GPT-4 Turbo Vision Preview',
    //   id: 'gpt-4-vision-preview',
    //   tokens: 128_000,
    //   vision: true,
    // },
    // {
    //   description: 'Currently points to gpt-4-0613',
    //   displayName: 'GPT-4',
    //   functionCall: true,
    //   id: 'gpt-4',
    //   tokens: 8192,
    // },
    // {
    //   description: 'Currently points to gpt-4-32k-0613',
    //   displayName: 'GPT-4 32K',
    //   functionCall: true,
    //   id: 'gpt-4-32k',
    //   tokens: 32_768,
    // },
    // {
    //   description: 'GPT 3.5 Turbo，适用于各种文本生成和理解任务',
    //   displayName: 'GPT-3.5 Turbo',
    //   functionCall: true,
    //   id: 'gpt-3.5-turbo',
    //   tokens: 16_385,
    // },
  ],
  description: '通过GitHub模型，开发人员可以成为AI工程师，并使用行业领先的AI模型进行构建。',
  checkModel: 'gpt-4o-mini',
  url: 'https://github.com/marketplace/models',
  id: 'github',
  icon: "github",
  name: 'GitHub',
};

export default GitHubAI;
