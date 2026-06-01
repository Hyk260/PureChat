import { OpenAI } from "../../providers/openai"
// import { GoogleAI } from '../../providers/google';
// import { QwenAI } from '../../providers/qwen';

import type { ApiType, RuntimeClass } from "./apiTypes"

export const baseRuntimeMap = {
  openai: OpenAI,
  // google: GoogleAI,
  // qwen: LobeQwenAI,
} satisfies Record<ApiType, RuntimeClass>
