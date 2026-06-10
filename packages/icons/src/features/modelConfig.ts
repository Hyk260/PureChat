import OpenAI from "../Icon/OpenAI"
import DeepSeek from "../Icon/DeepSeek"
import Qwen from "../Icon/Qwen"
import Mistral from "../Icon/Mistral"
import Yi from "../Icon/Yi"
import Meta from "../Icon/Meta"
import ChatGLM from "../Icon/ChatGLM"
import Minimax from "../Icon/Minimax"
import Anthropic from "../Icon/Anthropic"
import Claude from "../Icon/Claude"
import Gemini from "../Icon/Gemini"

import type { Component } from "vue"

type ProviderIconType = Component & {
  Avatar?: Component
  Combine?: Component
  Text?: Component
}

export interface ModelMapping {
  Icon: ProviderIconType
  keywords: string[]
  props?: Record<string, unknown>
}

export const modelMappings: ModelMapping[] = [
  // OpenAI
  { Icon: OpenAI, keywords: ["gpt-3"], props: { type: "gpt3" } },
  { Icon: OpenAI, keywords: ["gpt-4"], props: { type: "gpt4" } },
  { Icon: OpenAI, keywords: ["gpt-5"], props: { type: "gpt5" } },
  { Icon: OpenAI, keywords: ["gpt-oss"], props: { type: "oss" } },
  {
    Icon: OpenAI,
    keywords: ["o1-", "^o1", "/o1", "o3-", "^o3", "/o3", "o4-", "^o4", "/o4"],
    props: { type: "o1" },
  },
  {
    Icon: OpenAI,
    keywords: [
      "text-embedding-",
      // "tts-",
      "whisper-",
      "codex",
      "davinci",
      "babbage",
      "omni-moderation",
      "text-moderation",
      "text-adb",
      "text-ada",
      "computer-use",
    ],
    props: { type: "platform" },
  },
  {
    Icon: OpenAI,
    keywords: ["^gpt-", "/gpt-", "openai"],
  },
  // Dalle
  // { Icon: Dalle, keywords: ["dalle", "dall-e"] },
  // Qwen
  { Icon: Qwen, keywords: ["qwen", "qwen3", "qwq", "qvq", "wanx", "wan\\d/", "wan\\d\\.\\d-", "tongyi"] },
  // DeepSeek
  { Icon: DeepSeek, keywords: ["deepseek"] },
  // Yi
  { Icon: Yi, keywords: ["^yi-", "/yi-", "-yi-"] },
  // Meta
  { Icon: Meta, keywords: ["llama", "/l3"] },
  // ChatGLM
  { Icon: ChatGLM, keywords: ["^glm-", "/glm-", "chatglm", "-glm-"] },
  // Mistral
  {
    Icon: Mistral,
    keywords: [
      "mistral",
      "mixtral",
      "codestral",
      "mathstral",
      "/mn-",
      "pixtral",
      "ministral",
      "magistral",
      "devstral",
      "voxtral",
    ],
  },
  // Minimax
  { Icon: Minimax, keywords: ["minimax", "abab", "^image-"] },
  // Anthropic
  { Icon: Anthropic, keywords: ["anthropic"] },
  // Claude
  { Icon: Claude, keywords: ["claude"] },
  // Gemini
  { Icon: Gemini, keywords: ["gemini"] },
]
