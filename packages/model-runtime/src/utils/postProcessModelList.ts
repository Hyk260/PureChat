import { AiModelType } from "model-bank"
import type { ChatModelCard } from "@pure/types"

/**
 * 处理模型列表：确保 type 字段存在，并为白名单模型生成图像生成模型
 * @param models 原始模型列表
 * @param getModelTypeProperty 可选的回调函数，用于获取模型类型属性
 * @returns 处理后的模型列表（包含图像生成模型）
 */
export async function postProcessModelList(
  models: ChatModelCard[],
  getModelTypeProperty?: (modelId: string) => Promise<AiModelType>
): Promise<ChatModelCard[]> {
  const finalModels = await Promise.all(
    models.map(async (model) => {
      let modelType: AiModelType | undefined = model.type

      if (!modelType && getModelTypeProperty) {
        modelType = await getModelTypeProperty(model.id)
      }

      return {
        ...model,
        type: modelType || "chat",
      }
    })
  )

  return [...finalModels]
}
