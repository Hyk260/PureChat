import type { RuntimeAI } from "../BaseAI"

export type ApiType = "deepseek" | "minimax" | "openai" | "xiaomimimo" | "zhipu"

export type RuntimeClass = new (options?: any) => RuntimeAI
