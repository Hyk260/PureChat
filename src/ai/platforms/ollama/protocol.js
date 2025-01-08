export const transformOllamaStream = (chunk, stack) => {
  // maybe need another structure to add support for multiple choices
  if (chunk.done) {
    return { data: "[DONE]", id: stack.id, type: "stop" };
  }
  return { data: chunk, id: stack.id, type: "text" };
};

/**
 * 一个异步生成器函数，用于从给定的流中逐步获取响应。
 *
 * @param {AsyncIterable} stream - 一个异步可迭代对象，代表一个数据流。
 *   该流可以是从服务器获取的实时数据流，或者是任何符合
 *   AsyncIterable 接口的对象。
 *
 * @yields {any} response - 从流中逐个获取的响应数据。
 *   每次迭代时，返回流中的下一个响应。
 */
export const chatStreamable = async function* (stream) {
  for await (const response of stream) {
    yield response;
  }
};

export const createSSEProtocolTransformer = (transformer, streamStack) => {
  return new TransformStream({
    transform: (chunk, controller) => {
      const { type, id, data } = transformer(chunk, streamStack || { id: "" });
      controller.enqueue(`id: ${id}\n`);
      controller.enqueue(`event: ${type}\n`);
      controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
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

      // track the type of the chunk
      if (chunk.startsWith("event:")) {
        currentType = chunk.split("event:")[1].trim();
      }
      // if the message is a data chunk, handle the callback
      else if (chunk.startsWith("data:")) {
        const content = chunk.split("data:")[1].trim();

        switch (currentType) {
          case "text": {
            await callbacks.onText?.(content);
            await callbacks.onToken?.(JSON.parse(content));
            break;
          }
        }
      }
    },
  });
};

export const parseDataUri = (dataUri) => {
  // 正则表达式匹配整个 Data URI 结构
  const dataUriMatch = dataUri.match(/^data:([^;]+);base64,(.+)$/);

  if (dataUriMatch) {
    // 如果是合法的 Data URI
    return { base64: dataUriMatch[2], mimeType: dataUriMatch[1], type: "base64" };
  }

  try {
    new URL(dataUri);
    // 如果是合法的 URL
    return { base64: null, mimeType: null, type: "url" };
  } catch {
    // 既不是 Data URI 也不是合法 URL
    return { base64: null, mimeType: null, type: null };
  }
};
