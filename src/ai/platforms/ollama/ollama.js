import { ModelProvider } from "@/ai/constant";
import { useAccessStore } from "@/ai/utils";
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

function getIcon(modelName) {
  if (modelName.startsWith("llama")) {
    return "meta";
  }else if (modelName.startsWith("qwen")) {
    return "tongyi";
  }
  return "";
}

export class OllamaAI {
  client;
  constructor() {
    this.provider = ModelProvider.Ollama
    this.payload = useAccessStore(this.provider);
    this.client = new Ollama({ host: this.payload.openaiUrl || DEFAULT_BASE_URL });
  }
  async chat(messages, payload, options) {
    try {
      const response = await this.client.chat({
        messages,
        model: payload.model,
        options: {
          frequency_penalty: payload.frequency_penalty,
          presence_penalty: payload.presence_penalty,
          temperature: payload.temperature, // 随机性
          top_p: payload.top_p,
        },
        stream: true,
      });

      return StreamingResponse(OllamaStream(response, options?.callback), {
        headers: options?.headers,
      });
    } catch (e) {
      const Error = {
        error: { message: e.message, name: e.name, status_code: e.status_code },
        errorType: "请求 Ollama 服务出错，请检查后重试",
        provider: ModelProvider.Ollama,
      }
      console.error("Ollama Error", Error);
      throw Error;
    }
  }

  async models() {
    const list = await this.client.list();
    return list.models.map((model) => ({
      id: model.name,
      icon: getIcon(model.name),
    }));
  }
}
export default OllamaAI