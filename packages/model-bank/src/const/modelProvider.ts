export enum ModelProvider {
  OpenAI = "openai",
  ZhiPu = "zhipu",
  ZeroOne = "zeroone",
  Qwen = "qwen",
  Ollama = "ollama",
  GitHub = "github",
  DeepSeek = "deepseek",
  Mistral = "mistral",
  V0 = "v0",
}

export type Provider = Lowercase<keyof typeof ModelProvider>

export enum ModelID {
  OpenAI = "@RBT#001",
  ZhiPu = "@RBT#002",
  ZeroOne = "@RBT#003",
  Qwen = "@RBT#004",
  Ollama = "@RBT#005",
  GitHub = "@RBT#006",
  DeepSeek = "@RBT#007",
  Mistral = "@RBT#008",
}

export type ModelIDValue = (typeof ModelID)[keyof typeof ModelID]

export const ModelIDList = [
  ModelID.OpenAI,
  ModelID.ZhiPu,
  ModelID.ZeroOne,
  ModelID.Qwen,
  ModelID.Ollama,
  ModelID.GitHub,
  ModelID.DeepSeek,
  ModelID.Mistral,
]

export const C2CModelIDList = ModelIDList.map((id) => "C2C" + id)
