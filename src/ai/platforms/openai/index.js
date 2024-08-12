import { OpenaiPath, REQUEST_TIMEOUT_MS } from "@/ai/constant";
import { ModelProvider } from "@/ai/constant";
import { prettyObject, useAccessStore, usePromptStore } from "@/ai/utils";
import { EventStreamContentType, fetchEventSource } from "@fortaine/fetch-event-source";
import OllamaAI from '../ollama/ollama';

export class ChatGPTApi {
  messages;
  constructor(provider) {
    this.provider = provider;
  }
  path(path) {
    let openaiUrl = this.accessStore().openaiUrl;
    return openaiUrl + path;
  }
  userPromptMessages(messages, modelConfig) {
    let message = [];
    const prompts = usePromptStore(this.provider).prompt?.filter((t) => t.content) || []
    const countMessage = messages.slice(-Number(modelConfig.historyMessageCount));
    if (prompts.at(0)) {
      message = [...prompts, ...countMessage]; // prompt
    } else {
      message = countMessage; // 上下文
    }
    return message
  }
  accessStore(model = this.provider) {
    return useAccessStore(model);
  }
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      "x-requested-with": "XMLHttpRequest",
      "Authorization": `Bearer ${this.accessStore().token.trim()}`
    };
    return headers;
  }
  extractMessage(res) {
    return res.choices?.at(0)?.message?.content ?? "";
  }
  async fetchOnClient(messages = this.messages) {

    const payload = this.accessStore();

    try {
      return await new OllamaAI().chat(messages, payload, {
        callback: {

        },
        // signal: ""
      });

    } catch (e) {
      console.log(e)
    }

  };
  generateRequestPayload(messages, modelConfig, options) {
    return {
      messages: this.userPromptMessages(messages, modelConfig),
      stream: options.stream, // 流式传输
      model: modelConfig.model, // 模型
      // max_tokens: modelConfig.max_tokens, // 单次回复限制
      temperature: Number(modelConfig.temperature), // 随机性
      presence_penalty: modelConfig.presence_penalty, //话题新鲜度
      frequency_penalty: modelConfig.frequency_penalty, // 频率惩罚度
      top_p: modelConfig.top_p, // 核采样
    };
  }
  /**
   * 处理流式聊天的响应。
   * 
   * @param {string} chatPath - 聊天请求的路径。
   * @param {object} chatPayload - 聊天请求的有效负载。
   * @param {object} options - 处理选项，包括错误处理、更新和完成回调。
   * @param {AbortController} controller - 用于控制请求的 AbortController。
   * @param {number} requestTimeoutId - 请求超时的 ID。
   * 
   * @returns {Promise<void>} - 无返回值的 Promise。
   */
  async handleStreamingChat(
    chatPath,
    chatPayload,
    options,
    controller,
    requestTimeoutId
  ) {
    const _this = this;
    let responseText = ""; // 用于存储完整的响应文本
    let remainText = ""; // 用于存储尚未处理的文本
    let finished = false; // 用于标记动画是否已完成

    /**
    * 动画响应文本的显示。
    * 根据剩余文本的长度逐步更新响应文本。
    */
    function animateResponseText() {
      // 如果动画已完成或请求已被中止，结束动画
      if (finished || controller.signal.aborted) {
        responseText += remainText;
        console.log("[Response Animation] finished");
        // 如果响应文本为空，触发错误回调
        if (responseText?.length === 0) {
          options.onError?.(new Error("empty response from server"));
        }
        return;
      }
      // 如果有剩余文本，进行文本动画更新
      if (remainText.length > 0) {
        const fetchCount = Math.max(1, Math.round(remainText.length / 60));
        const fetchText = remainText.slice(0, fetchCount);
        responseText += fetchText;
        remainText = remainText.slice(fetchCount);
        options.onUpdate?.(responseText, fetchText);
      }

      requestAnimationFrame(animateResponseText);
    };

    // start animaion
    animateResponseText();

    const finish = () => {
      if (!finished) {
        finished = true;
        options.onFinish(responseText + remainText);
      }
    };

    controller.signal.onabort = finish; // 设置请求中止时的处理函数

    fetchEventSource(chatPath, {
      ...chatPayload,
      async onopen(res) {
        console.log('[OpenAI] fetchEventSource', res)
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
        const isRequestError = !res.ok || !stream || res.status !== 200;

        if (isRequestError) {
          const responseTexts = [responseText];
          let extraInfo = await res.clone().text();

          try {
            const resJson = await res.clone().json();
            extraInfo = prettyObject(resJson);
          } catch (e) {
            console.log("[resJson]", e);
          }

          if (res.status === 401) {
            options.onError?.(extraInfo);
          }

          if (extraInfo) {
            responseTexts.push(extraInfo);
          }

          responseText = responseTexts.join("\n\n");
          return finish();
        } else {
          console.log(res);
        }
      },
      onmessage(msg) {
        console.log('[OpenAI] onmessage:', msg)
        if (msg.data === "[DONE]" || finished) {
          return finish();
        }
        const text = msg.data;
        try {
          if ([ModelProvider.Ollama].includes(_this.provider)) {
            const json = JSON.parse(text);
            if (json === '[DONE]') return finish();
            const delta = json.message.content;
            if (delta) {
              remainText += delta;
            }
          } else {
            const json = JSON.parse(text);
            const delta = json.choices[0].delta.content;
            if (delta) {
              remainText += delta;
            }
          }
        } catch (e) {
          console.error("[Request] parse error", text, msg);
        }
      },
      onclose() {
        finish();
      },
      onerror(e) {
        options.onError?.(e);
        throw e;
      },
      openWhenHidden: true,
    });
  }
  // 生成聊天消息
  async chat(options) {
    const messages = options.messages.map(({ role, content }) => ({ role, content }));
    const modelConfig = {
      ...this.accessStore(),
      model: options.config.model,
    };
    this.messages = messages
    const requestPayload = this.generateRequestPayload(messages, modelConfig, options.config);

    console.log("[Request] openai payload: ", requestPayload);

    const shouldStream = !!options.config.stream;
    const controller = new AbortController();
    options.onController?.(controller);

    try {
      let fetcher = null //  typeof fetch | undefined = undefined;
      const chatPath = this.path(OpenaiPath.ChatPath);
      const chatPayload = {
        method: "POST",
        body: JSON.stringify(requestPayload),
        // fetch: () => {},
        signal: controller.signal,
        headers: this.getHeaders(),
      };

      // ollama本地模型使用自定义 fetch 请求
      if ([ModelProvider.Ollama].includes(this.provider)) {
        fetcher = async () => {
          try {
            return await this.fetchOnClient();
          } catch (e) {
            const {
              errorType = '400',
              error: errorContent,
              ...res
            } = e;

            const error = errorContent || e;
            // track the error at server side
            console.error(`Route: [${this.provider}] ${errorType}:`, error);
          }
        }
        chatPayload.fetch = fetcher
      }

      const requestTimeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      // 流式输出
      if (shouldStream) {
        await this.handleStreamingChat(chatPath, chatPayload, options, controller, requestTimeoutId);
      } else {
        const res = await fetch(chatPath, chatPayload);
        clearTimeout(requestTimeoutId);

        const resJson = await res.json();
        const message = this.extractMessage(resJson);
        options.onFinish(message);
      }
    } catch (e) {
      console.log("[Request] failed to make a chat reqeust", e);
      options.onError?.(e);
    }
  }
  // 列出模型
  async models() {
    const url = this.path(OpenaiPath.ListModelPath);
    const res = await fetch(url, { method: "GET", headers: { ...this.getHeaders() } });
    const resJson = await res.json();
    const chatModels = resJson.data.filter((m) => m.id.startsWith("gpt-"));
    const formattedModels = chatModels.map((m) => ({
      name: m.id,
      available: true,
    }));
    return formattedModels;
  }
}
