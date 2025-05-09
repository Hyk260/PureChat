import { ModelProvider } from "@/ai/constant";
import { useAccessStore } from "@/ai/utils";
import { Ollama } from "ollama/browser";
import { nanoid } from '@/utils/uuid';
import {
  parseDataUri,
  chatStreamable,
  transformOllamaStream,
  createCallbacksTransformer,
  createSSEProtocolTransformer,
  convertIterableToStream,
} from "./protocol";

const DEFAULT_BASE_URL = "http://127.0.0.1:11434";

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
 * OllamaStream 函数用于处理流式响应并进行转换。
 * @param {Response} res - 一个响应对象，通常是从服务器获取的流式响应。
 * @param {Function} cb - 一个回调函数，用于处理在流中产生的每个事件或数据块。
 * @returns {ReadableStream} 返回一个可读流，表示处理后的数据流。
 */
const OllamaStream = (res, cb) => {
  const streamStack = { id: "chat_" + nanoid() };

  return res
    .pipeThrough(createSSEProtocolTransformer(transformOllamaStream, streamStack))
    .pipeThrough(createCallbacksTransformer(cb));
};

export default class OllamaAI {
  constructor() {
    this.payload = useAccessStore(ModelProvider.Ollama);
    this.client = new Ollama({ host: this.payload.openaiUrl || DEFAULT_BASE_URL });
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
      const stream = convertIterableToStream(response);
      const [prod, debug] = stream.tee();

      // if (process.env.DEBUG_OLLAMA_CHAT_COMPLETION === '1') {
      //   debugStream(debug).catch(console.error);
      // }

      return StreamingResponse(OllamaStream(prod, options?.callback), {
        headers: options?.headers
      });
    } catch (e) {
      const Error = {
        error: { message: e.message, name: e.name, status_code: e.status_code },
        errorType: "请求 Ollama 服务出错，请检查后重试",
        provider: ModelProvider.Ollama,
      };
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
