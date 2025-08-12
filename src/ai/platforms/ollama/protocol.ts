import { ChatResponse } from 'ollama/browser';
import { ChatStreamCallbacks } from "../types/chat";

export interface StreamContext {
  id: string;
  returnedCitation?: boolean;
  startReasoning?: boolean;
  thinking?: {
    id: string;
    name: string;
  };
  thinkingInContent?: boolean;
  tool?: {
    id: string;
    index: number;
    name: string;
  };
  toolIndex?: number;
}

export interface StreamProtocolChunk {
  data: any;
  id?: string;
  type: // pure text
  | 'text'
  // base64 format image
  | 'base64_image'
  // Tools use
  | 'tool_calls'
  // Model Thinking
  | 'reasoning'
  // use for reasoning signature, maybe only anthropic
  | 'reasoning_signature'
  // flagged reasoning signature
  | 'flagged_reasoning_signature'
  // Search or Grounding
  | 'grounding'
  // stop signal
  | 'stop'
  // Error
  | 'error'
  // token usage
  | 'usage'
  // performance monitor
  | 'speed'
  // unknown data result
  | 'data';
}

export const transformOllamaStream = (chunk: ChatResponse, stack: StreamContext): StreamProtocolChunk => {
  if (chunk.done && !chunk.message.content) {
    return { data: "[DONE]", id: stack.id, type: "stop" };
  }
  return {
    data: chunk,
    id: stack.id,
    type: stack?.thinkingInContent ? 'reasoning' : 'text',
  };
};

/**
 * 一个异步生成器函数，用于从给定的流中逐步获取响应。
 */
export const chatStreamable = async function* <T>(stream: AsyncIterable<T>) {
  for await (const response of stream) {
    yield response;
  }
};

const ERROR_CHUNK_PREFIX = '%FIRST_CHUNK_ERROR%: ';

export const convertIterableToStream = <T>(stream: AsyncIterable<T>) => {
  const iterable = chatStreamable(stream);

  // copy from https://github.com/vercel/ai/blob/d3aa5486529e3d1a38b30e3972b4f4c63ea4ae9a/packages/ai/streams/ai-stream.ts#L284
  let it = iterable[Symbol.asyncIterator]();

  return new ReadableStream({
    async cancel(reason) {
      await it.return?.(reason);
    },
    async pull(controller) {
      const { done, value } = await it.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
    async start(controller) {
      try {
        const { done, value } = await it.next();
        if (done) controller.close();
        else controller.enqueue(value);
      } catch (e) {
        const error = e;

        controller.enqueue((ERROR_CHUNK_PREFIX + JSON.stringify({ message: error.message, name: error.name, stack: error.stack })));

        controller.close();
      }
    },
  });
};

export const createSSEProtocolTransformer = (
  transformer: (chunk: any, stack: StreamContext) => StreamProtocolChunk | StreamProtocolChunk[],
  streamStack?: StreamContext,
) => {
  return new TransformStream({
    transform: (chunk, controller) => {
      const result = transformer(chunk, streamStack || { id: "" });

      const buffers = Array.isArray(result) ? result : [result];

      buffers.forEach(({ type, id, data }) => {
        controller.enqueue(`id: ${id}\n`);
        controller.enqueue(`event: ${type}\n`);
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      });
    },
  });
};

export const createCallbacksTransformer = (cb: ChatStreamCallbacks | undefined) => {
  const textEncoder = new TextEncoder();
  let aggregatedText = '';

  let currentType = '' as unknown as StreamProtocolChunk['type'];
  const callbacks = cb || {};

  return new TransformStream({
    async flush(): Promise<void> {
      const data = {
        text: aggregatedText,
      };

      if (callbacks.onCompletion) {
        await callbacks.onCompletion(data);
      }

      if (callbacks.onFinal) {
        await callbacks.onFinal(data);
      }
    },

    async start(): Promise<void> {
      if (callbacks.onStart) await callbacks.onStart();
    },

    async transform(chunk: string, controller): Promise<void> {
      controller.enqueue(textEncoder.encode(chunk));

      if (chunk.startsWith("event:")) {
        currentType = chunk.split('event:')[1].trim() as unknown as StreamProtocolChunk['type'];
      } else if (chunk.startsWith("data:")) {

        const content = chunk.split("data:")[1].trim();

        switch (currentType) {
          case "text": {
            await callbacks.onText?.(content);
            break;
          }
        }
      }
    },
  });
};

interface UriParserResult {
  base64: string | null;
  mimeType: string | null;
  type: 'url' | 'base64' | null;
}

export const parseDataUri = (dataUri: string): UriParserResult => {
  const dataUriMatch = dataUri.match(/^data:([^;]+);base64,(.+)$/);

  if (dataUriMatch) {
    return { base64: dataUriMatch[2], mimeType: dataUriMatch[1], type: "base64" };
  }

  try {
    new URL(dataUri);
    return { base64: null, mimeType: null, type: "url" };
  } catch {
    return { base64: null, mimeType: null, type: null };
  }
};
