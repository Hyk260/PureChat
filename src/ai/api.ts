// import { API_PROVIDER_MAP } from "@/ai/constant"
// import { OpenAIAPIClient } from "@/ai/platforms/openai/index"
// import { LLMParams, ModelProvider, Provider } from "@/ai/types"
// import { useAccessStore } from "@/ai/utils"

// export class ClientApi {
//   public llm: OpenAIAPIClient
//   _config: LLMParams

//   constructor(provider: Provider = ModelProvider.OpenAI) {
//     try {
//       this._config = useAccessStore(provider)
//       this.llm = this.createProvider(provider)
//     } catch (error) {
//       throw new Error(`初始化 ClientApi 失败: ${error instanceof Error ? error.message : "未知错误"}`)
//     }
//   }

//   /**
//    * 根据提供者创建相应的AI提供者实例
//    */
//   createProvider(provider: Provider) {
//     const ProviderClass = API_PROVIDER_MAP[provider]

//     if (!ProviderClass) {
//       console.warn(`未找到提供者 ${provider}，使用默认的OpenAI提供者`)
//       return new OpenAIAPIClient(provider)
//     }

//     try {
//       return new ProviderClass(provider)
//     } catch (error) {
//       throw new Error(`创建AI提供者实例失败: ${error.message}`)
//     }
//   }

//   config() {
//     return this._config
//   }
// }
