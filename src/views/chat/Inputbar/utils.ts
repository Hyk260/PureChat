export function isRange(id: string) {
  return ["temperature", "top_p", "presence_penalty", "frequency_penalty", "historyMessageCount"].includes(id)
}
