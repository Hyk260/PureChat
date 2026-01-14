import { AiModelType } from "model-bank"
import type { ChatModelCard } from "@pure/types"

/**
 * Process model list: ensure type field exists and generate image generation models for whitelisted models
 * @param models Original model list
 * @param getModelTypeProperty Optional callback function to get model type property
 * @returns Processed model list (including image generation models)
 */
export async function postProcessModelList(
  models: ChatModelCard[],
  getModelTypeProperty?: (modelId: string) => Promise<AiModelType>
): Promise<ChatModelCard[]> {
  // 1. Ensure all models have type field
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
