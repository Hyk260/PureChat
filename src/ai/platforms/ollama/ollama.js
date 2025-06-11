import { ModelProvider } from "@/ai/constant";
import { useAccessStore } from "@/ai/utils";
import { Ollama } from "ollama/browser";
import { nanoid } from '@/utils/uuid';
import {
  parseDataUri,
  transformOllamaStream,
  createCallbacksTransformer,
  createSSEProtocolTransformer,
  convertIterableToStream,
} from "./protocol";

function getIcon(modelName) {
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
 * @param {ReadableStream} stream - 可读流，包含要发送到客户端的数据。
 * @param {Object} [options] - 可选的配置对象。
 * @param {Object} [options.headers] - 自定义的HTTP头部，合并到响应中。
 * @returns {Response} - 返回一个包含指定流和头部的Response对象。
 */
const StreamingResponse = (stream, options) => {
  return new Response(stream, {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "text/event-stream",
      ...options?.headers,
    },
  });
};

/**
 * 转换Ollama流数据
 * @param {Response} response - 响应对象
 * @param {Function} callback - 回调函数
 * @returns {ReadableStream} 处理后的可读流
 */
const OllamaStream = (response, callback) => {
  const streamStack = { id: `chat_${nanoid()}` };

  return response
    .pipeThrough(createSSEProtocolTransformer(transformOllamaStream, streamStack))
    .pipeThrough(createCallbacksTransformer(callback));
};

export default class OllamaAI {
  constructor() {
    this.payload = useAccessStore(ModelProvider.Ollama);
    this.client = this.createOllamaClient();
  }

  /**
  * 创建Ollama客户端实例
  * @returns {Ollama} Ollama客户端实例
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
  buildOllamaMessages(messages) {
    return messages.map((t) => this.convertContentToOllamaMessage(t));
  }
  convertContentToOllamaMessage(message) {
    if (typeof message.content === "string") {
      return { content: message.content, role: message.role };
    }

    const ollamaMessage = {
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
  async chat(messages, payload, options) {
    try {
      const response = await this.client.chat({
        messages: this.buildOllamaMessages(messages),
        model: payload.model,
        options: {
          frequency_penalty: payload.frequency_penalty,
          presence_penalty: payload.presence_penalty,
          temperature: payload.temperature,
          top_p: payload.top_p,
          // images: [],
        },
        stream: true,
        // tools: payload.tools,
      });

      const [prodStream, debugStream] = convertIterableToStream(response).tee();

      // if (DEBUG_OLLAMA_CHAT_COMPLETION === '1') {
      //   debugStream(debug).catch(console.error);
      // }

      return StreamingResponse(
        OllamaStream(prodStream, options?.callback),
        { headers: options?.headers }
      );
    } catch (e) {
      const Error = {
        error: {
          message: e.message,
          name: e.name,
          status_code: e.status_code
        },
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
