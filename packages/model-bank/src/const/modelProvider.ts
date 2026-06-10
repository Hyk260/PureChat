export enum ModelProvider {
  OpenAI = "openai",
  ZhiPu = "zhipu",
  ZeroOne = "zeroone",
  Qwen = "qwen",
  Ollama = "ollama",
  GitHub = "github",
  DeepSeek = "deepseek",
  Mistral = "mistral",
  Minimax = "minimax",
  Anthropic = "anthropic",
  Google = "google",
  // V0 = "v0",
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
  Minimax = "@RBT#009",
  Anthropic = "@RBT#010",
  Google = "@RBT#011",
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
  ModelID.Minimax,
  // ModelID.Anthropic,
  // ModelID.Google,
]

export const C2CModelIDList = ModelIDList.map((id) => "C2C" + id)

type ModelProviderKey = keyof typeof ModelProvider

export const providerToModelId: Record<Provider, ModelIDValue> = Object.fromEntries(
  (Object.keys(ModelProvider) as ModelProviderKey[]).map((key) => [ModelProvider[key], ModelID[key]])
) as Record<Provider, ModelIDValue>

export const modelIdToProvider: Record<ModelIDValue, Provider> = Object.fromEntries(
  (Object.keys(ModelID) as ModelProviderKey[]).map((key) => [ModelID[key], ModelProvider[key]])
) as Record<ModelIDValue, Provider>
