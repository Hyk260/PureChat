import OpenAI from "@/components/Icon/OpenAI"
import DeepSeek from "@/components/Icon/DeepSeek"
import Qwen from "@/components/Icon/Qwen"
import Mistral from "@/components/Icon/Mistral"
import Yi from "@/components/Icon/Yi"
import Meta from "@/components/Icon/Meta"
import ChatGLM from "@/components/Icon/ChatGLM"

import type { Component } from "vue"

type ProviderIconType = Component & {
  Avatar?: Component
  Combine?: Component
  Text?: Component
}

export interface ModelMapping {
  Icon: ProviderIconType
  keywords: string[]
  props?: any
}

export const modelMappings: ModelMapping[] = [
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
  { Icon: Qwen, keywords: ["qwen", "qwen3", "qwq", "qvq", "wanx", "wan\\d/", "wan\\d\\.\\d-", "tongyi"] },
  { Icon: DeepSeek, keywords: ["deepseek"] },
  { Icon: Yi, keywords: ["^yi-", "/yi-", "-yi-"] },
  { Icon: Meta, keywords: ["llama", "/l3"] },
  { Icon: ChatGLM, keywords: ["^glm-", "/glm-", "chatglm"] },
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
]
