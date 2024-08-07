import { ModelProvider } from "@/ai/constant";
import { useAccessStore, usePromptStore } from "@/ai/utils";
import { Ollama } from 'ollama/browser';
import { customAlphabet } from 'nanoid/non-secure';
import { readableFromAsyncIterable } from 'ai';

import {
  chatStreamable,
  createCallbacksTransformer,
  createSSEProtocolTransformer,
} from './protocol';

const DEFAULT_BASE_URL = 'http://127.0.0.1:11434';

export const createNanoId = (size = 8) => customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', size);

export const nanoid = createNanoId();

export const StreamingResponse = (
  stream,
  options = { headers },
) => {
  return new Response(stream, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      ...options?.headers,
    },
  });
};

const transformOllamaStream = (chunk, stack) => {
  // maybe need another structure to add support for multiple choices
  if (chunk.done) {
    return { data: '[DONE]', id: stack.id, type: 'stop' };
  }
  return { data: chunk, id: stack.id, type: 'text' };
};

export const OllamaStream = (
  res,
  cb,
) => {
  const streamStack = { id: 'chat_' + nanoid() };

  return readableFromAsyncIterable(chatStreamable(res))
    .pipeThrough(createSSEProtocolTransformer(transformOllamaStream, streamStack))
    .pipeThrough(createCallbacksTransformer(cb));
};

export class OllamaAI {
  client;
  constructor() {
    this.provider = ModelProvider.Ollama
    this.payload = useAccessStore(this.provider);
    this.client = new Ollama({ host: DEFAULT_BASE_URL });
  }
  userPromptMessages(messages, payload) {
    let message = [];
    const prompts = usePromptStore(this.provider).prompt?.filter((t) => t.content) || []
    const countMessage = messages.slice(-Number(payload.historyMessageCount));
    if (prompts.at(0)) {
      message = [...prompts, ...countMessage]; // prompt
    } else {
      message = countMessage; // 上下文
    }
    return message
  }

  async chat(messages, payload, options) {
    try {
      const response = await this.client.chat({
        messages: this.userPromptMessages(messages, payload),
        model: payload.model,
        options: {
          frequency_penalty: payload.frequency_penalty,
          presence_penalty: payload.presence_penalty,
          temperature: payload.temperature,
          top_p: payload.top_p,
        },
        stream: true,
      });

      return StreamingResponse(OllamaStream(response, options?.callback), {
        headers: options?.headers,
      });
    } catch (error) {
      console.log(error)
    }
  }
}