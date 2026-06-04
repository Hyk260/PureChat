import { initializeWithClientStore } from "@/service/chatService/clientModelRuntime"

import { ChatModelCard } from "@pure/types"

export class ModelsService {
  private _abortController: AbortController | null = null

  getModels = async (provider: string): Promise<ChatModelCard[] | undefined> => {
    try {
      const agentRuntime = initializeWithClientStore({
        provider,
      })
      return agentRuntime.models()
    } catch (error: any) {
      console.error("getModels failed", error)
      return []
    }
  }

  abortPull = () => {
    if (this._abortController) {
      this._abortController.abort()
      this._abortController = null
    }
  }
}

export const modelsService = new ModelsService()
