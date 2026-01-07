import { get } from "lodash-es"

/**
 * 将模板字符串中的占位符替换为上下文中的对应值。
 * 占位符格式为 `{{path.to.value}}`，支持嵌套路径。
 *
 * 示例:
 *   const tpl = "Hello, {{ user.name }}!";
 *   hydrationPrompt(tpl, { user: { name: 'Alice' } }) // -> "Hello, Alice!"
 *
 * 实现要点：
 * - 使用正则匹配所有 `{{...}}` 占位符。
 * - 使用 lodash 的 `get` 支持从 `context` 中安全取值（包括嵌套路径）。
 * - 若取到的值为 `undefined`，则替换为空字符串，避免出现字符串 "undefined"。
 *
 * @param prompt 要进行占位符替换的模板字符串
 * @param context 提供占位符对应值的上下文对象（可以是任意嵌套结构）
 * @returns 替换完成后的字符串
 */
export const hydrationPrompt = (prompt: string, context: any) => {
  // 匹配形式为 {{ ... }} 的占位符，使用非贪婪匹配以捕获内部内容
  const regex = /{{([\S\s]+?)}}/g

  // 使用 String.prototype.replaceAll，提供替换回调以便处理每个占位符
  return prompt.replaceAll(regex, (match, key) => {
    // 去除占位符内部两端可能存在的空白
    const trimmedKey = key.trim()

    // 从 context 中安全获取值，支持路径如 "user.name" 或 "items[0].title"
    const value = get(context, trimmedKey)

    // 如果值不是 undefined，则转换为字符串返回；否则返回空字符串以避免插入 "undefined"
    return value !== undefined ? String(value) : ""
  })
}
