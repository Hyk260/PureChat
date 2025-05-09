export const transformOllamaStream = (chunk, stack) => {
  if (chunk.done && !chunk.message.content) {
    return { data: "[DONE]", id: stack.id, type: "stop" };
  }
  return { data: chunk, id: stack.id, type: "text" };
};

/**
 * 一个异步生成器函数，用于从给定的流中逐步获取响应。
 * @param {AsyncIterable} stream - 一个异步可迭代对象，代表一个数据流。
 * @yields {any} response - 从流中逐个获取的响应数据。每次迭代时，返回流中的下一个响应。
 */
export const chatStreamable = async function* (stream) {
  for await (const response of stream) {
    yield response;
  }
};

const ERROR_CHUNK_PREFIX = '%FIRST_CHUNK_ERROR%: ';

export const convertIterableToStream = (stream) => {
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

export const createSSEProtocolTransformer = (transformer, streamStack) => {
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

export const createCallbacksTransformer = (cb) => {
  const textEncoder = new TextEncoder();
  let aggregatedResponse = "";
  let currentType = "";
  const callbacks = cb || {};

  return new TransformStream({
    async flush() {
      if (callbacks.onCompletion) {
        await callbacks.onCompletion(aggregatedResponse);
      }

      if (callbacks.onFinal) {
        await callbacks.onFinal(aggregatedResponse);
      }
    },

    async start() {
      if (callbacks.onStart) await callbacks.onStart();
    },

    async transform(chunk, controller) {
      controller.enqueue(textEncoder.encode(chunk));

      if (chunk.startsWith("event:")) {
        currentType = chunk.split("event:")[1].trim();
      } else if (chunk.startsWith("data:")) {

        const content = chunk.split("data:")[1].trim();

        switch (currentType) {
          case "text": {
            await callbacks.onText?.(content);
            await callbacks.onToken?.(JSON.parse(content));
            break;
          }
          case 'tool_calls': {
            await callbacks.onToolCall?.();
          }
        }
      }
    },
  });
};

export const parseDataUri = (dataUri) => {
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
