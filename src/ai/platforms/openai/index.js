import { EventStreamContentType, fetchEventSource } from "@microsoft/fetch-event-source";
import { REQUEST_TIMEOUT_MS, ModelProvider } from "@/ai/constant";
import {
  getModelId,
  useAccessStore,
  adjustForDeepseek,
  createErrorResponse,
  isDalle3 as _isDalle3,
  extractImageMessage,
  generateDalle3RequestPayload,
} from "@/ai/utils";
import OllamaAI from "../ollama/ollama";
import { useChatStore } from "@/stores/index";
import { transformData } from "@/utils/chat/index";
import { useRobotStore, useToolsStore } from "@/stores/index";

export * from "./config";
export * from "./modelValue";

export const OpenaiPath = {
  ChatPath: "v1/chat/completions", // chatgpt 聊天接口
  UsagePath: "v1/dashboard/billing/usage", // 用量查询，数据单位为 token
  SubsPath: "v1/dashboard/billing/subscription", // 总量查询，数据单位为 token
  ListModelPath: "v1/models", // 查询可用模型
  EmbeddingPath: "v1/embeddings", // 文本向量化
};

export class OpenAiApi {
  constructor(provider) {
    this.provider = provider;
  }
  getPath(path) {
    let baseUrl = this.accessStore().openaiUrl;
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1);
    }
    return [baseUrl, path].join("/");
  }

  /**
   * 获取插件工具列表
   * @returns {Array} 工具列表
   */
  getPluginTools() {
    const pluginList = useToolsStore().tools;
    if (!pluginList.length) return [];

    if (useRobotStore().model?.functionCall) {
      return pluginList.map((t) => t.tools[0]);
    }

    return [];
  }

  /**
   * 获取提示词存储
   * @returns {Object}
   */
  getPromptStore() {
    try {
      const _prompt = useRobotStore().currentProviderPrompt?.prompt;
      const validPrompts = _prompt?.filter((t) => t.content) || [];
      return validPrompts;
    } catch (error) {
      console.error("获取提示词失败:", error)
      return {
        content: "提示词",
        role: "system",
      };
    }
  }

  /**
   * 处理提示词消息
   * @param {Array} messages - 消息列表
   * @param {Object} modelConfig - 模型配置
   * @returns {Array} 处理后的消息列表
   */
  processPromptMessages(messages, modelConfig) {
    let combinedMessages = [];
    const validPrompts = this.getPromptStore();
    const historyCount = Math.max(Number(modelConfig.historyMessageCount) || 0, 0);

    if (validPrompts.length > 0) {
      combinedMessages = [...validPrompts, ...messages.slice(-historyCount)]; // prompt
    } else {
      combinedMessages = messages.slice(-historyCount); // 上下文
    }
    if (modelConfig.model === "deepseek-reasoner") {
      return adjustForDeepseek(combinedMessages);
    }
    return combinedMessages;
  }
  accessStore(model = this.provider) {
    return useAccessStore(model);
  }

  /**
   * 获取请求头
   * @returns {Object} HTTP请求头对象
   */
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      "x-requested-with": "XMLHttpRequest",
      Authorization: `Bearer ${this.accessStore().token?.trim()}`,
    };
    return headers;
  }

  /**
   * 提取响应消息
   * @param {Object} response - API响应
   * @returns {Promise<string|Array>} 提取的消息内容
   */
  async extractMessage(response) {
    // DALL-E 3模型返回图片URL
    if (response.data) {
      return await extractImageMessage(response);
    }
    return response.choices?.[0]?.message?.content ?? response;
  }

  /**
   * 客户端获取方法（用于Ollama等本地模型）
   * @param {Array} messages - 消息列表
   * @returns {Promise<Object>} 响应结果
   */
  async fetchOnClient(messages) {
    const payload = this.accessStore();
    return await new OllamaAI().chat(messages, payload, {
      callback: {},
      // signal: ""
      headers: {
        Authorization: `Bearer ${this.accessStore().token?.trim()}`,
      },
    });
  }

  /**
   * 启用客户端获取
   * @param {Array} messages - 消息列表
   * @param {Object} modelConfig - 模型配置
   * @returns {Promise<Function>} 获取函数
   */
  async enableFetchOnClient(messages, modelConfig) {
    let fetcher = null; //  typeof fetch
    const processedMessages = this.processPromptMessages(messages, modelConfig);
    fetcher = async () => {
      try {
        return await this.fetchOnClient(processedMessages);
      } catch (error) {
        const { errorType = 400, error: errorContent, ...rest } = error;
        const errorMessage = errorContent || error
        // 跟踪服务器端的错误
        console.error(`Route: [${this.provider}] ${errorType}:`, errorMessage);
        return createErrorResponse(errorType, {
          error,
          ...rest,
          provider: this.provider
        });
      }
    };
    return fetcher;
  }

  /**
   * 生成请求负载
   * @param {Array} messages - 消息列表
   * @param {Object} modelConfig - 模型配置
   * @param {Object} options - 选项
   * @returns {Object} 请求负载
   */
  generateRequestPayload(messages, modelConfig, options) {
    // DALL-E 3特殊处理
    if (_isDalle3(modelConfig.model)) {
      return generateDalle3RequestPayload(modelConfig)
    }

    const payload = {
      messages: this.processPromptMessages(messages, modelConfig),
      stream: options.stream, // 流式传输
      model: modelConfig.model, // 模型
      // max_tokens: modelConfig.max_tokens, // 单次回复限制
      temperature: modelConfig.temperature, // 随机性
      presence_penalty: modelConfig.presence_penalty, //话题新鲜度
      frequency_penalty: modelConfig.frequency_penalty, // 频率惩罚度
      top_p: modelConfig.top_p, // 核采样
      // tools: [] // 工具
    };
    const tools = this.getPluginTools();
    if (tools.length > 0) {
      payload.tools = tools;
      payload.stream = false;
    }
    return payload;
  }

  /**
   * 聊天接口
   * @param {Object} options - 聊天选项
   * @returns {Promise<void>}
   */
  async chat(options) {
    const messages = await transformData(options.messages);
    const modelConfig = {
      ...this.accessStore(),
      model: options.config.model,
    };

    const requestPayload = this.generateRequestPayload(messages, modelConfig, options.config);
    console.log("[Request] OpenAI payload: ", requestPayload);

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
      if (this.isOllamaProvider()) {
        chatPayload.fetch = await this.enableFetchOnClient(messages, modelConfig);
      }

      // 流式输出
      if (shouldStream) {
        await this.handleStreamingChat(chatPath, chatPayload, options, controller);
      } else {
        await this.handleNonStreamingChat(chatPath, chatPayload, options, controller);
      }
    } catch (error) {
      console.error("[Request] failed to make a chat reqeust", error);
      options?.onError?.(error.message || "请求失败，请稍后重试");
    }
  }

  /**
   * 处理流式响应错误
   * @param {Response} response - 响应对象
   * @param {Object} options - 选项
   * @param {Function} finish - 完成回调
   */
  async handleStreamError(response, options, finish) {
    let errorInfo = ""

    try {
      const responseData = await response.clone().json()
      errorInfo = JSON.stringify(responseData, null, 2)
    } catch {
      errorInfo = await response.clone().text()
    }

    if (response.status === 401) {
      options?.onError?.("认证失败，请检查 API 密钥")
    } else {
      options?.onError?.(errorInfo || `请求失败 (${response.status})`)
    }

    finish()
  }

  /**
   * 处理流式消息
   * @param {Object} msg - 消息对象
   * @param {string} remainText - 剩余文本引用
   * @param {string} reasoningText - 推理文本引用
   * @param {Object} options - 选项
   * @param {Function} finish - 完成回调
   */
  handleStreamMessage(msg, remainText, reasoningText, options, finish) {
    console.log("[OpenAI] 收到消息:", msg)

    if (msg.data === "[DONE]") {
      return finish()
    }

    try {
      const data = JSON.parse(msg.data)

      if (this.isOllamaProvider()) {
        if (data === "[DONE]") return finish();
        const delta = data.message?.content
        if (delta) {
          remainText += delta
        }
      } else {
        const choice = data.choices?.[0]
        if (!choice) return

        // 处理普通内容
        const delta = choice.delta?.content
        if (delta) {
          remainText += delta
        } else {
          // 处理推理内容（如 DeepSeek）
          const reasoning = choice.delta?.reasoning_content
          if (reasoning) {
            reasoningText += reasoning
            options.onReasoningMessage?.(reasoningText)
          }
        }
      }
    } catch (error) {
      console.error("[OpenAI] 解析消息失败:", error, msg.data)
    }
  }

  /**
   * 检查是否为 Ollama 提供商
   * @returns {boolean}
   */
  isOllamaProvider() {
    return this.provider === ModelProvider.Ollama
  }

  /**
   * 处理流式聊天的响应。
   * @param {string} chatPath - 聊天请求的路径。
   * @param {object} chatPayload - 聊天请求的有效负载。
   * @param {object} options - 处理选项，包括错误处理、更新和完成回调。
   * @param {AbortController} controller - 用于控制请求的 AbortController。
   */
  async handleStreamingChat(
    chatPath,
    chatPayload,
    options,
    controller,
  ) {
    let responseText = ""; // 用于存储完整的响应文本
    let remainText = ""; // 用于存储尚未处理的文本
    let reasoningText = ""; // 用于存储完整的推理内容
    let finished = false; // 用于标记动画是否已完成

    /**
     * 动画响应文本的显示。
     * 根据剩余文本的长度逐步更新响应文本。
     */
    const animateResponseText = () => {
      // 如果动画已完成或请求已被中止，结束动画
      if (finished || controller.signal.aborted) {
        responseText += remainText;
        console.log("[OpenAI] 流式响应完成")
        // 如果响应文本为空，触发错误回调
        if (!responseText.trim()) {
          this.updateSendingState("delete")
          options.onError?.("服务器繁忙，请稍后再试。");
        }
        return;
      }
      // 如果有剩余文本，进行文本动画更新
      if (remainText.length > 0) {
        const chunkSize = Math.max(1, Math.round(remainText.length / 60));
        const chunk = remainText.slice(0, chunkSize);

        responseText += chunk;
        remainText = remainText.slice(chunkSize);

        options?.onUpdate?.({
          message: responseText,
          fetchCount: chunk,
          think: reasoningText,
        });
      }

      requestAnimationFrame(animateResponseText);
    }

    // 开始动画
    animateResponseText();

    // 完成处理函数
    const finish = () => {
      if (!finished) {
        finished = true;
        options?.onFinish?.({
          message: responseText + remainText,
          think: reasoningText,
        });
      }
    };

    controller.signal.onabort = finish; // 设置请求中止时的处理函数

    // 取消fetch请求
    const requestTimeoutId = setTimeout(
      () => controller?.abort(),
      REQUEST_TIMEOUT_MS
    );

    const _this = this;

    await fetchEventSource(chatPath, {
      ...chatPayload,
      async onopen(res) {
        console.log("[OpenAI] fetchEventSource", res);
        clearTimeout(requestTimeoutId);
        const contentType = res.headers.get("content-type");
        // text/event-stream; charset=utf-8
        console.log("[OpenAI] request response content type: ", contentType);

        if (contentType?.startsWith("text/plain")) {
          responseText = await res.clone().text();
          return finish();
        }

        // text/event-stream EventStreamContentType
        const stream = contentType?.startsWith(EventStreamContentType);
        // const isRequestError = !res.ok || !stream || res.status !== 200;

        // 检查流式响应格式
        const isValidStream = stream && res.ok && res.status === 200

        if (!isValidStream) {
          await this.handleStreamError(response, options, finish)
        }

        // if (isRequestError) {
        //   const responseTexts = [responseText];
        //   let extraInfo = await res.clone().text();

        //   try {
        //     const resJson = await res.clone().json();
        //     extraInfo = prettyObject(resJson);
        //   } catch (e) {
        //     console.error("[resJson]", e);
        //   }

        //   if (res.status === 401) {
        //     options.onError?.(extraInfo);
        //   }

        //   if (extraInfo) {
        //     responseTexts.push(extraInfo);
        //   }

        //   responseText = responseTexts.join("\n\n");

        //   return finish();
        // } else {
        //   console.log(res);
        // }
      },
      // onmessage: (msg) => this.handleStreamMessage(msg, remainText, reasoningText, options, finish),
      onmessage(msg) {
        console.log("[OpenAI] 收到消息:", msg)

        if (msg.data === "[DONE]" || finished) {
          return finish()
        }

        try {
          const data = JSON.parse(msg.data)

          if (_this.isOllamaProvider()) {
            if (data === "[DONE]") return finish();
            const delta = data.message?.content
            if (delta) {
              remainText += delta
            }
          } else {
            const choice = data.choices?.[0]
            if (!choice) return

            // 处理普通内容
            const delta = choice.delta?.content
            if (delta) {
              remainText += delta
            } else {
              // 处理推理内容（如 DeepSeek）
              const reasoning = choice.delta?.reasoning_content
              if (reasoning) {
                reasoningText += reasoning
                options.onReasoningMessage?.(reasoningText)
              }
            }
          }
        } catch (error) {
          console.error("[OpenAI] 解析消息失败:", error, msg.data)
        }
      },
      onclose() {
        finish();
      },
      onerror(error) {
        console.error("[OpenAI] 流式请求错误:", error)
        options.onError?.(error);
        throw error;
      },
      openWhenHidden: true,
    });
  }

  /**
   * 处理非流式聊天
   * @param {string} chatPath - 聊天路径
   * @param {Object} chatPayload - 请求负载
   * @param {Object} options - 选项
   * @param {AbortController} controller - 控制器
   * @returns {Promise<void>}
   */
  async handleNonStreamingChat(chatPath, chatPayload, options, controller) {
    const requestTimeoutId = setTimeout(() => controller?.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(chatPath, chatPayload)
      clearTimeout(requestTimeoutId)

      if (response.status === 401) {
        const errorData = await response.json()
        // options?.onError?.(errorData)
        options?.onError?.(errorData.error?.message || "认证失败")
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        options?.onError?.(errorData.error?.message || `请求失败 (${response.status})`)
        return
      }

      const responseJson = await response.json()
      const message = await this.extractMessage(responseJson)

      options?.onFinish({ message })
    } catch (error) {
      clearTimeout(requestTimeoutId)

      if (error.name === "AbortError") {
        options?.onError?.("请求超时，请稍后重试")
      } else {
        options?.onError?.(error.message || "网络请求失败")
      }
    }
  }

  /**
   * 更新发送状态
   * @param {string} action - 操作类型
   */
  updateSendingState(action = "delete") {
    try {
      const modelId = getModelId(this.provider)
      useChatStore().updateSendingState(modelId, action)
    } catch (error) {
      console.error("更新发送状态失败:", error)
    }
  }

  /**
   * 获取模型列表
   * @returns {Promise<Array>} 模型列表
   */
  async getModels() {
    const url = this.getPath(OpenaiPath.ListModelPath)
    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
    })

    const responseJson = await response.json()
    const chatModels = responseJson.data.filter((model) => model.id.startsWith("gpt-") || model.id.startsWith("dall-"))

    return chatModels.map((model) => ({
      id: model.id,
      icon: "",
    }))
  }

  /**
   * 检查连通性
   * @returns {Promise<Object>} 检查结果
   */
  async checkConnectivity() {
    const url = this.getPath(OpenaiPath.ChatPath);
    const payload = this.accessStore();

    const chatPayload = {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hi, hello" }],
        model: payload?.model,
        stream: false,
      }),
      headers: this.getHeaders(),
    };

    try {
      const res = await fetch(url, chatPayload);
      if (!res.ok) {
        const resJson = await res.json();
        console.log("[Check] Response received:", resJson);
        return {
          valid: false,
          error: resJson?.error?.message || "未知错误"
        };
      }
      return {
        valid: true,
        error: undefined,
      };
    } catch (error) {
      return {
        valid: false,
        error: error?.message || "未知错误"
      };
    }
  }
}
