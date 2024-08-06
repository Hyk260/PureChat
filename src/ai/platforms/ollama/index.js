import { ChatGPTApi } from "@/ai/platforms/openai/index";
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
  return { data: chunk.message.content, id: stack.id, type: 'text' };
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

export class OllamaApi extends ChatGPTApi {
  constructor(provider) {
    super();
    this.provider = provider;
  }
  path() {
    let openaiUrl = useAccessStore(this.provider).openaiUrl;
    return openaiUrl + "api/chat";
  }
  generateRequestPayload(messages, modelConfig, options) {
    return {
      messages: this.userPromptMessages(messages, modelConfig),
      model: modelConfig.model,
      options: {
        frequency_penalty: 0,
        presence_penalty: 0,
        temperature: modelConfig.temperature,
        top_p: modelConfig.top_p,
      },
      stream: true,
    };
  }
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      "x-requested-with": "XMLHttpRequest",
    };
    return headers;
  }
}

export class OllamaAI {
  client;
  baseURL;
  constructor({ baseURL }) {
    this.client = new Ollama({ host: DEFAULT_BASE_URL || baseURL });

    if (baseURL) this.baseURL = baseURL;
  }

  async chat(payload, options) {

    try {
      // const abort = () => {
      //   this.client.abort();
      //   options?.signal?.removeEventListener('abort', abort);
      // };

      // options?.signal?.addEventListener('abort', abort);

      const response = await this.client.chat({
        messages: [{ role: 'user', content: '你好' }],
        model: 'qwen2:7b',
        // payload.model,
        // options: {
        //   frequency_penalty: payload.frequency_penalty,
        //   presence_penalty: payload.presence_penalty,
        //   temperature: payload.temperature,
        //   top_p: payload.top_p,
        // },
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