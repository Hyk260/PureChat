import type { Highlighter, SpecialTheme, ThemeInput } from "shiki"

// 支持的语言列表
const SUPPORTED_LANGUAGES = [
  "vue",
  "js",
  "jsx",
  "tsx",
  "python",
  "java",
  "c",
  "rust",
  "go",
  "powershell",
  "sql",
  "json",
  "html",
  "javascript",
  "typescript",
  "css",
  "markdown",
  "xml",
  "yaml",
  "php",
  "ruby",
  "swift",
  "nginx",
] as const

// 支持的主题列表
const SUPPORTED_THEMES = [
  "github-dark",
  "github-light",
  "github-dark-default",
  "github-light-default",
  "one-dark-pro",
  "one-light",
  "vitesse-dark",
  "vitesse-light",
] as const

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]
type SupportedTheme = (typeof SUPPORTED_THEMES)[number]
interface HighlighterOptions {
  themes?: ThemeInput[] | SpecialTheme[]
  langs?: string[]
}
// 单例高亮器实例
let highlighterInstance: Highlighter | null = null
/**
 * 验证并过滤语言列表
 * @param langs - 待验证的语言列表
 * @returns 过滤后的有效语言列表
 */
function validateLanguages(langs?: string[]): string[] {
  // 如果未提供语言列表，返回所有支持的语言
  if (!langs?.length) {
    return [...SUPPORTED_LANGUAGES]
  }
  // 过滤出支持的语言
  return langs.filter((lang) => {
    const isSupported = SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)
    if (!isSupported) {
      console.warn(`[shiki] Language "${lang}" is not supported and will be ignored.`)
    }
    return isSupported
  })
}
/**
 * 验证并过滤主题列表
 * @param themes - 待验证的主题列表
 * @returns 过滤后的有效主题列表
 */
function validateThemes(themes?: ThemeInput[] | SpecialTheme[]): (ThemeInput | SpecialTheme)[] {
  // 如果未提供主题列表，返回所有支持的主题
  if (!themes?.length) {
    return [...SUPPORTED_THEMES] as any
  }
  // 过滤出支持的主题
  return themes.filter((theme) => {
    // 只验证字符串类型的主题
    if (typeof theme === "string" && !SUPPORTED_THEMES.includes(theme as SupportedTheme)) {
      console.warn(`[shiki] Theme "${theme}" is not supported and will be ignored.`)
      return false
    }
    return true
  })
}
/**
 * @description
 * 创建并缓存一个语法高亮器实例（单例模式）。
 * - 未提供 `langs` 时，注册所有支持的语言
 * - 未提供 `themes` 时，使用所有默认主题
 * - 不支持的语言或主题会被过滤并在控制台显示警告
 *
 * @param options - 配置选项
 * @param options.themes - 主题配置数组
 * @param options.langs - 语言配置数组
 * @returns Promise<Highlighter> - 高亮器实例
 */
export async function registerHighlight(options: HighlighterOptions = {}): Promise<Highlighter> {
  // 如果已存在实例，直接返回
  if (highlighterInstance) {
    return highlighterInstance
  }
  try {
    // 动态导入 shiki 以减少初始包体积
    const { createHighlighter } = await import("shiki")

    // 验证并准备配置
    const validatedLangs = validateLanguages(options.langs)
    const validatedThemes = validateThemes(options.themes)
    // 创建高亮器实例
    highlighterInstance = await createHighlighter({
      themes: validatedThemes as any,
      langs: validatedLangs as any,
    })
    return highlighterInstance
  } catch (error) {
    console.error("[shiki] Failed to create highlighter:", error)
    throw error
  }
}
/**
 * 释放高亮器实例
 * @description 清除缓存的高亮器实例，释放内存
 */
export function disposeHighlighter(): void {
  highlighterInstance = null
}
/**
 * 获取当前高亮器实例
 * @returns 当前的高亮器实例或 null
 */
export function getHighlighter(): Highlighter | null {
  return highlighterInstance
}
/**
 * 检查高亮器是否已初始化
 * @returns 是否已初始化
 */
export function isHighlighterInitialized(): boolean {
  return highlighterInstance !== null
}
