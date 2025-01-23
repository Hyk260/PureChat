// ref https://platform.openai.com/docs/models
const OpenAI = {
  chatModels: [
    {
      description:
        'o1-mini是一款针对编程、数学和科学应用场景而设计的快速、经济高效的推理模型。该模型具有128K上下文和2023年10月的知识截止日期。',
      displayName: 'OpenAI o1-mini',
      enabled: true,
      id: 'o1-mini',
      tokens: 128_000,
    },
    {
      description:
        'o1是OpenAI新的推理模型，适用于需要广泛通用知识的复杂任务。该模型具有128K上下文和2023年10月的知识截止日期。',
      displayName: 'OpenAI o1-preview',
      enabled: true,
      id: 'o1-preview',
      tokens: 128_000,
    },
    {
      description: 'Currently points to gpt-4o-mini-2024-07-18',
      displayName: 'GPT-4o mini',
      enabled: true,
      functionCall: true,
      id: 'gpt-4o-mini',
      maxOutput: 16_385,
      tokens: 128_000,
      vision: true,
    },
    {
      description: 'Currently points to gpt-4o-2024-05-13',
      displayName: 'GPT-4o',
      enabled: true,
      functionCall: true,
      id: 'gpt-4o',
      tokens: 128_000,
      vision: true,
    },
    {
      description: 'GPT-4 Turbo with Vision',
      displayName: 'GPT-4 Turbo',
      enabled: true,
      functionCall: true,
      id: 'gpt-4-turbo',
      tokens: 128_000,
      vision: true,
    },
    {
      description: 'Currently points to gpt-4-0125-preview',
      displayName: 'GPT-4 Turbo Preview',
      functionCall: true,
      id: 'gpt-4-turbo-preview',
      tokens: 128_000,
    },
    {
      description: 'Currently points to gpt-4-1106-vision-preview',
      displayName: 'GPT-4 Turbo Vision Preview',
      id: 'gpt-4-vision-preview',
      tokens: 128_000,
      vision: true,
    },
    {
      description: 'Currently points to gpt-4-0613',
      displayName: 'GPT-4',
      functionCall: true,
      id: 'gpt-4',
      tokens: 8192,
    },
    {
      description: 'Currently points to gpt-4-32k-0613',
      displayName: 'GPT-4 32K',
      functionCall: true,
      id: 'gpt-4-32k',
      tokens: 32_768,
    },
    {
      description: 'GPT 3.5 Turbo，适用于各种文本生成和理解任务',
      displayName: 'GPT-3.5 Turbo',
      functionCall: true,
      id: 'gpt-3.5-turbo',
      tokens: 16_385,
    },
  ],
  checkModel: 'gpt-4o-mini',
  description: 'OpenAI 是全球领先的人工智能研究机构，其开发的模型如GPT系列推动了自然语言处理的前沿。OpenAI 致力于通过创新和高效的AI解决方案改变多个行业。他们的产品具有显著的性能和经济性，广泛用于研究、商业和创新应用。',
  modelsUrl: 'https://platform.openai.com/docs/models',
  url: 'https://openai.com',
  id: 'openai',
  name: 'OpenAI',
};

export default OpenAI;
