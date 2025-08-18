export function isRange(id) {
  return [
    "temperature",
    "top_p",
    "presence_penalty",
    "frequency_penalty",
    "historyMessageCount",
  ].includes(id);
}