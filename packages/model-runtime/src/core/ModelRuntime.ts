import { ClientOptions } from "openai"
import { providerRuntimeMap } from "../runtimeMap"

import { OpenAI } from "../providers/openai"
import { RuntimeAI } from "./BaseAI"

import type { ChatMethodOptions, ChatStreamPayload } from "@pure/types"

export interface AgentChatOptions {
  provider: string
}

export class ModelRuntime {
  private _runtime: RuntimeAI

  constructor(runtime: RuntimeAI) {
    this._runtime = runtime
  }

  async chat(payload: ChatStreamPayload, options?: ChatMethodOptions) {
    return this._runtime.chat!(payload, options)
  }

  async models() {
    return this._runtime.models?.()
  }

  static initializeWithProvider(provider: string, params: Partial<ClientOptions>) {
    const providerAI = providerRuntimeMap[provider] ?? OpenAI

    const runtimeModel: RuntimeAI = new providerAI(params)

    return new ModelRuntime(runtimeModel)
  }
}
