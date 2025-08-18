// ref https://open.bigmodel.cn/dev/howuse/model
// api https://open.bigmodel.cn/dev/api#language
const ZhiPu = {
  chatModels: [
    {
      description: "CodeGeeX-4 是强大的AI编程助手，支持多种编程语言的智能问答与代码补全，提升开发效率。",
      displayName: "CodeGeeX-4",
      id: "codegeex-4",
      tokens: 128_000,
    },
    {
      description: "发布于20240116的最智能版本模型，目前已被 GLM-4-0520 版本超越",
      displayName: "GLM-4",
      functionCall: true,
      id: "glm-4",
      tokens: 128_000,
    },
    {
      description: "性价比最高的版本，综合性能接近GLM-4，速度快，价格实惠",
      displayName: "GLM-4-Air",
      functionCall: true,
      id: "glm-4-air",
      tokens: 128_000,
    },
    {
      description: "GLM-4-Air 的高性能版本，效果不变，推理速度达到其2.6倍",
      displayName: "GLM-4-Airx",
      functionCall: true,
      id: "glm-4-airx",
      tokens: 128_000,
    },
    {
      description: "适用简单任务，速度最快，价格最实惠的版本",
      displayName: "GLM-4-Flash",
      id: "glm-4-flash",
      tokens: 128_000,
    },
    {
      description: "实现了视觉语言特征的深度融合，支持视觉问答、图像字幕、视觉定位、复杂目标检测等各类图像理解任务",
      displayName: "GLM-4V",
      id: "glm-4v",
      tokens: 2000,
      vision: true,
    },
    {
      description: "适用于对知识量、推理能力、创造力要求较高的场景，比如广告文案、小说写作、知识类写作、代码生成等",
      displayName: "GLM-3-Turbo",
      functionCall: true,
      id: "glm-3-turbo",
      tokens: 128_000,
    },
  ],
  checkModel: "glm-4-flash",
  description: "智谱 AI 提供多模态与语言模型的开放平台，支持广泛的AI应用场景，包括文本处理、图像理解与编程辅助等。",
  modelsUrl: "https://open.bigmodel.cn/dev/howuse/model",
  url: "https://zhipuai.cn",
  id: "zhipu",
  icon: "zhipu",
  name: "ZhiPu",
};

export default ZhiPu;
