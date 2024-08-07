export const chatStreamable = async function* (stream) {
  for await (const response of stream) {
    yield response;
  }
};

export const createSSEProtocolTransformer = (
  transformer,
  streamStack,
) =>
  new TransformStream({
    transform: (chunk, controller) => {
      const { type, id, data } = transformer(chunk, streamStack || { id: '' });
      controller.enqueue(`id: ${id}\n`);
      controller.enqueue(`event: ${type}\n`);
      controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
    },
  });

export function createCallbacksTransformer(cb) {
  const textEncoder = new TextEncoder();
  let aggregatedResponse = '';
  let currentType = '';
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
      if (chunk.startsWith('event:')) {
        currentType = chunk.split('event:')[1].trim();
      }
      // if the message is a data chunk, handle the callback
      else if (chunk.startsWith('data:')) {
        const content = chunk.split('data:')[1].trim();
        
        switch (currentType) {
          case 'text': {
            await callbacks.onText?.(content);
            await callbacks.onToken?.(JSON.parse(content));
            break;
          }
        }
      }
    },
  });
}
