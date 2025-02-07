import { REQUEST_TIMEOUT_MS, ModelProvider } from "@/ai/constant";
import {
  useAccessStore,
  usePromptStore,
  useToolStore,
  createErrorResponse,
  isDalle3 as _isDalle3,
  extractImageMessage,
  generateDalle3RequestPayload,
} from "@/ai/utils";
import OllamaAI from "../ollama/ollama";
import { handleStreamingChat } from '@/ai/utils';
import { transformData } from "@/utils/chat/index";
import { useRobotStore } from "@/stores/modules/robot";

export const OpenaiPath = {
  ChatPath: "v1/chat/completions", // chatgpt 聊天接口
  UsagePath: "v1/dashboard/billing/usage", // 用量查询，数据单位为 token
  SubsPath: "v1/dashboard/billing/subscription", // 总量查询，数据单位为 token
  ListModelPath: "v1/models", // 查询可用模型
  EmbeddingPath: "v1/embeddings", // 文本向量化
};

export class ChatGPTApi {
  constructor(provider) {
    this.provider = provider;
  }
  getPath(path) {
    let baseUrl = this.accessStore().openaiUrl
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1);
    }
    return [baseUrl, path].join("/");
  }
  getPluginTools() {
    const pluginList = useToolStore();
    if (!pluginList.length) return [];
    if (useRobotStore().model?.functionCall) {
      return pluginList.map((t) => t.tools[0]);
    }
    return [];
  }
  userPromptMessages(messages, modelConfig) {
    let message = [];
    const prompts = usePromptStore(this.provider).prompt?.filter((t) => t.content) || [];
    const countMessage = messages.slice(-Number(modelConfig.historyMessageCount));
    if (prompts.at(0)) {
      message = [...prompts, ...countMessage]; // prompt
    } else {
      message = countMessage; // 上下文
    }
    return message;
  }
  accessStore(model = this.provider) {
    return useAccessStore(model);
  }
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      "x-requested-with": "XMLHttpRequest",
      Authorization: `Bearer ${this.accessStore().token?.trim()}`,
    };
    return headers;
  }
  async extractMessage(res) {
    // dalle3模型返回url，使用url创建图片消息
    if (res.data) {
      return await extractImageMessage(res);
    }
    return res.choices?.at(0)?.message?.content ?? res;
  }
  async fetchOnClient(messages) {
    const payload = this.accessStore();
    return await new OllamaAI().chat(messages, payload, {
      callback: {},
      // signal: ""
    });
  }
  async enableFetchOnClient(messages, modelConfig) {
    let fetcher = null; //  typeof fetch
    const message = this.userPromptMessages(messages, modelConfig);
    fetcher = async () => {
      try {
        return await this.fetchOnClient(message);
      } catch (e) {
        const { errorType = 400, error: errorContent, ...res } = e;
        const error = errorContent || e;
        // track the error at server side
        console.error(`Route: [${this.provider}] ${errorType}:`, error);
        return createErrorResponse(errorType, { error, ...res, provider: this.provider });
      }
    };
    return fetcher;
  }
  generateRequestPayload(messages, modelConfig, options) {
    if (_isDalle3(modelConfig.model)) return generateDalle3RequestPayload(modelConfig);
    const payload = {
      messages: this.userPromptMessages(messages, modelConfig),
      stream: options.stream, // 流式传输
      model: modelConfig.model, // 模型
      // max_tokens: modelConfig.max_tokens, // 单次回复限制
      temperature: modelConfig.temperature, // 随机性
      presence_penalty: modelConfig.presence_penalty, //话题新鲜度
      frequency_penalty: modelConfig.frequency_penalty, // 频率惩罚度
      top_p: modelConfig.top_p, // 核采样
      // tools: [] // 工具
    };
    // const tools = this.getPluginTools();
    // if (tools.at(0)) {
    //   payload.tools = tools;
    //   payload.stream = false;
    // }
    return payload
  }
  // 生成聊天消息
  async chat(options) {
    const messages = await transformData(options.messages);
    const modelConfig = {
      ...this.accessStore(),
      model: options.config.model,
    };
    const requestPayload = this.generateRequestPayload(messages, modelConfig, options.config);

    console.log("[Request] openai payload: ", requestPayload);

    const isDalle3 = _isDalle3(options.config.model);
    const shouldStream = !isDalle3 && !!options.config.stream;
    const controller = new AbortController();
    options.onController?.(controller);

    try {
      const chatPath = this.getPath(OpenaiPath.ChatPath);
      const chatPayload = {
        method: "POST",
        body: JSON.stringify(requestPayload),
        // fetch: () => {},
        signal: controller.signal,
        headers: this.getHeaders(),
      };

      // ollama本地模型使用自定义 fetch 请求
      if ([ModelProvider.Ollama].includes(this.provider)) {
        chatPayload.fetch = await this.enableFetchOnClient(messages, modelConfig);
      }

      // 流式输出
      if (shouldStream) {
        await handleStreamingChat(
          chatPath,
          chatPayload,
          options,
          controller,
          this.provider
        );
      } else {
        const requestTimeoutId = setTimeout(
          () => controller?.abort(),
          REQUEST_TIMEOUT_MS,
        );

        const res = await fetch(chatPath, chatPayload);
        clearTimeout(requestTimeoutId);

        const resJson = await res.json();
        const message = await this.extractMessage(resJson);
        options.onFinish(message);
      }
    } catch (e) {
      console.log("[Request] failed to make a chat reqeust", e);
      options.onError?.(e);
    }
  }
  // 列出模型
  async models() {
    const url = this.getPath(OpenaiPath.ListModelPath);
    const res = await fetch(url, { method: "GET", headers: { ...this.getHeaders() } });
    const resJson = await res.json();
    const chatModels = resJson.data.filter(
      (m) => m.id.startsWith("gpt-") || m.id.startsWith("dall-")
    );
    const formattedModels = chatModels.map((m) => ({
      id: m.id,
      icon: "",
    }));
    return formattedModels;
  }
}
