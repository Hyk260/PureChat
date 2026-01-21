import { isNil, omitBy } from "lodash-es"

/**
 * 清理对象中的空值（undefined、null、空字符串）
 * @param obj 要清理的对象
 * @returns 清理后的对象
 */
export const cleanObject = <T extends Record<string, any>>(obj: T): T => {
  return omitBy(obj, (value) => isNil(value) || value === "") as T
}

/**
 * 将对象转换为格式化的 JSON 字符串，并包装在代码块中
 * @param msg 要转换的对象或字符串
 * @returns 格式化后的字符串
 */
export function prettyObject(msg: any): string {
  const obj = msg
  if (typeof msg !== "string") {
    msg = JSON.stringify(msg, null, "  ")
  }
  if (msg === "{}") {
    return obj.toString()
  }
  if (msg.startsWith("```json")) {
    return msg
  }
  return ["```json", msg, "```"].join("\n")
}
