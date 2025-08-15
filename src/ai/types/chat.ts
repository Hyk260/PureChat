export type LLMRoleType = 'user' | 'system' | 'assistant' | 'function' | 'tool';

interface OnFinishData {
  grounding?: any;
  text: string;
  thinking?: string;
}

export interface ChatStreamCallbacks {
  onCompletion?: (data: OnFinishData) => Promise<void> | void;
  onFinal?: (data: OnFinishData) => Promise<void> | void;
  onStart?: () => Promise<void> | void;
  onText?: (content: string) => Promise<void> | void;
}

interface UserMessageContentPartText {
  text: string;
  type: 'text';
}

interface UserMessageContentPartImage {
  image_url: {
    detail?: 'auto' | 'low' | 'high';
    url: string;
  };
  type: 'image_url';
}

export interface ChatCompletionFunctions {
  description?: string;
  name: string;
  parameters?: {
    [key: string]: any;
  };
}

export interface ChatCompletionTool {
  function: ChatCompletionFunctions;
  type: 'function';
}

export type UserMessageContentPart =
  | UserMessageContentPartText
  | UserMessageContentPartImage

export interface OpenAIChatMessage {
  /**
   * @title 内容
   * @description 消息内容
   */
  content: string | UserMessageContentPart[];
  /**
   * 角色
   * @description 消息发送者的角色
   */
  role: LLMRoleType;
}

/**
 * @title Chat Stream Payload
 */
export interface ChatStreamPayload {
  /**
   * 开启上下文缓存
   */
  enabledContextCaching?: boolean;
  /**
   * 是否开启搜索
   */
  enabledSearch?: boolean;
  /**
   * @title 控制生成文本中的惩罚系数，用于减少重复性
   * @default 0
   */
  frequency_penalty?: number;
  /**
   * @title 生成文本的最大长度
   */
  max_tokens?: number;
  /**
   * @title 聊天信息列表
   */
  messages: OpenAIChatMessage[];
  /**
   * @title 模型名称
   */
  model: string;
  /**
   * @title 返回的文本数量
   */
  n?: number;
  /**
   * @title 控制生成文本中的惩罚系数，用于减少主题的变化
   * @default 0
   */
  presence_penalty?: number;
  provider?: string;
  reasoning?: {
    effort?: string;
    summary?: string;
  };
  reasoning_effort?: 'low' | 'medium' | 'high';
  responseMode?: 'stream' | 'json';
  /**
   * @title 是否开启流式请求
   * @default true
   */
  stream?: boolean;
  /**
   * @title 生成文本的随机度量，用于控制文本的创造性和多样性
   * @default 1
   */
  temperature: number;
  /**
   * use for Claude and Gemini
   */
  thinking?: {
    budget_tokens: number;
    type: 'enabled' | 'disabled';
  };
  /**
   * @title 控制生成文本中最高概率的单个令牌
   * @default 1
   */
  top_p?: number;
  tools?: ChatCompletionTool[];
  truncation?: 'auto' | 'disabled';
}

export interface ChatMethodOptions {
  callback?: ChatStreamCallbacks;
  /**
   * response headers
   */
  headers?: Record<string, any>;
  /**
   * send the request to the ai api endpoint
   */
  requestHeaders?: Record<string, any>;
  signal?: AbortSignal;
  /**
   * userId for the chat completion
   */
  user?: string;
}