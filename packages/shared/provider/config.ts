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

/**
 * 支持的机器人ID集合（用于区分不同AI服务商）
 */
export const ModelIDList = [
  ModelID.OpenAI,
  ModelID.ZhiPu,
  ModelID.ZeroOne,
  ModelID.Qwen,
  ModelID.Ollama,
  ModelID.GitHub,
  ModelID.DeepSeek,
  ModelID.Mistral,
];

export const C2CModelIDList = ModelIDList.map((id) => "C2C" + id);

/**
 * 支持的机器人ID值集合（用于类型检查）
 */
export type ModelIDValue = (typeof ModelID)[keyof typeof ModelID];
