import { ClientOptions } from 'openai';
import { ModelProvider } from "@/ai/types/type";
import { useAccessStore } from "@/ai/utils";
import { ChatResponse, Ollama, Tool } from "ollama/browser";
import { nanoid } from '@/utils/uuid';
import { ChatStreamCallbacks, OpenAIChatMessage, ChatStreamPayload, ChatMethodOptions } from "@/ai/types/chat";
import { OllamaMessage } from './type';
import {
  parseDataUri,
  transformOllamaStream,
  createCallbacksTransformer,
  createSSEProtocolTransformer,
  convertIterableToStream,
} from "./protocol";

function getIcon(modelName: string) {
  if (modelName.startsWith("llama")) {
    return "meta";
  } else if (modelName.startsWith("qwen")) {
    return "qwen";
  } else if (modelName.startsWith("llava")) {
    return "llava";
  }
  return "";
}

/**
 * 创建一个用于服务器推送事件的响应对象。
 */
const StreamingResponse = (
  stream: ReadableStream,
  options?: { headers?: Record<string, string> },
) => {
  return new Response(stream, {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "text/event-stream",
      // 'X-Accel-Buffering': 'no',
      ...options?.headers,
    },
  });
};

/**
 * 转换Ollama流数据
 */
export const OllamaStream = (
  response: ReadableStream<ChatResponse>,
  callback?: ChatStreamCallbacks,
): ReadableStream<string> => {
  const streamStack = { id: `chat_${nanoid()}` };

  return response
    .pipeThrough(createSSEProtocolTransformer(transformOllamaStream, streamStack))
    .pipeThrough(createCallbacksTransformer(callback));
};

export default class OllamaAI {
  private client: Ollama;
  private payload: any;

  constructor() {
    this.payload = useAccessStore(ModelProvider.Ollama);
    this.client = this.createOllamaClient();
  }

  /**
   * 创建Ollama客户端实例
   */
  createOllamaClient() {
    return new Ollama({
      host: this.payload.openaiUrl || import.meta.env.VITE_OLLAMA_PROXY_URL,
      fetch: (input, init = {}) => {
        const headers = new Headers(init.headers);
        const authToken = this.payload.apiKey || "TestToken";

        if (authToken) headers.set('Authorization', `Bearer ${authToken}`);

        return fetch(input, { ...init, headers });
      }
    });
  }

  private buildOllamaMessages(messages: OpenAIChatMessage[]) {
    return messages.map((t) => this.convertContentToOllamaMessage(t));
  }

  private convertContentToOllamaMessage = (message: OpenAIChatMessage): OllamaMessage => {
    if (typeof message.content === "string") {
      return { content: message.content, role: message.role };
    }

    const ollamaMessage: OllamaMessage = {
      content: "",
      role: message.role,
    };

    for (const content of message.content) {
      switch (content.type) {
        case "text": {
          ollamaMessage.content = content.text;
          break;
        }
        case "image_url": {
          const { base64 } = parseDataUri(content.image_url.url);
          if (base64) {
            ollamaMessage.images ??= [];
            ollamaMessage.images.push(base64);
          }
          break;
        }
      }
    }

    return ollamaMessage;
  }

  async chat(payload: ChatStreamPayload, options?: ChatMethodOptions) {
    try {
      const response = await this.client.chat({
        messages: this.buildOllamaMessages(payload.messages),
        model: payload.model,
        options: {
          frequency_penalty: payload.frequency_penalty || 0,
          presence_penalty: payload.presence_penalty || 0,
          temperature: payload.temperature || 1,
          top_p: payload.top_p || 1,
          // images: [],
        },
        stream: true,
        tools: payload?.tools as Tool[],
      });

      const [prodStream, debugStream] = convertIterableToStream(response).tee();

      // if (DEBUG_OLLAMA_CHAT_COMPLETION === '1') {
      //   debugStream(debugStream).catch(console.error);
      // }

      return StreamingResponse(OllamaStream(prodStream, options?.callback), {
        headers: options?.headers || {}
      });
    } catch (error) {
      const e = error as {
        error: any;
        message: string;
        name: string;
        status_code: number;
      };

      if (e.message === 'Failed to fetch') {
        const Error = {
          message: '请检查您的olama服务是否可用',
          errorType: "请求 Ollama 服务出错，请检查后重试",
          provider: ModelProvider.Ollama,
        };
        throw Error;
      }
      const Error = {
        message: e,
        errorType: "请求 Ollama 服务出错，请检查后重试",
        provider: ModelProvider.Ollama,
      };
      throw Error;
    }
  }

  async models() {
    const { models } = await this.client.list();
    return models.map((model) => ({
      id: model.name,
      icon: getIcon(model.name),
    }));
  }
}
