import type { Highlighter, SpecialTheme, ThemeInput } from "shiki"

const langsArray = [
  "jsx",
  "tsx",
  "vue",
  "csharp",
  "python",
  "java",
  "c",
  "cpp",
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
  "toml",
  "dockerfile",
  "kotlin",
  "objective-c",
  "objective-cpp",
  "php",
  "ruby",
  "scala",
  "svelte",
  "swift",
  "erlang",
  "angular-html",
  "angular-ts",
  "dart",
  "lua",
  "mermaid",
  "cmake",
  "nginx",
]
const themesArray = [
  "andromeeda",
  "aurora-x",
  "ayu-dark",
  "catppuccin-frappe",
  "catppuccin-latte",
  "catppuccin-macchiato",
  "catppuccin-mocha",
  "dark-plus",
  "dracula",
  "dracula-soft",
  "everforest-dark",
  "everforest-light",
  "github-dark",
  "github-dark-default",
  "github-dark-dimmed",
  "github-dark-high-contrast",
  "github-light",
  "github-light-default",
  "github-light-high-contrast",
  "gruvbox-dark-hard",
  "gruvbox-dark-medium",
  "gruvbox-dark-soft",
  "gruvbox-light-hard",
  "gruvbox-light-medium",
  "gruvbox-light-soft",
  "houston",
  "kanagawa-dragon",
  "kanagawa-lotus",
  "kanagawa-wave",
  "laserwave",
  "light-plus",
  "material-theme",
  "material-theme-darker",
  "material-theme-lighter",
  "material-theme-ocean",
  "material-theme-palenight",
  "min-dark",
  "min-light",
  "monokai",
  "night-owl",
  "nord",
  "one-dark-pro",
  "one-light",
  "plastic",
  "poimandres",
  "red",
  "rose-pine",
  "rose-pine-dawn",
  "rose-pine-moon",
  "slack-dark",
  "slack-ochin",
  "snazzy-light",
  "solarized-dark",
  "solarized-light",
  "synthwave-84",
  "tokyo-night",
  "vesper",
  "vitesse-black",
  "vitesse-dark",
  "vitesse-light",
]
let highlighter: Highlighter | null = null
/**
 * Register shiki highlighter with specified themes and languages.
 * If no languages are specified, all supported languages will be registered.
 * If any unsupported languages are specified, they will be ignored with a warning.
 * @param options.themes Array of theme names or theme objects to register
 * @param options.langs Array of language IDs to register (optional)
 * @returns Promise resolving to the created Highlighter instance
 */
export async function registerHighlight(
  options: {
    themes?: ThemeInput[] | SpecialTheme[]
    langs?: string[]
  } = {}
) {
  if (highlighter) return highlighter
  const { createHighlighter } = await import("shiki")
  if (!options.langs || options.langs.length === 0) {
    options.langs = langsArray
  } else if (options.langs?.some((l) => !langsArray.includes(l))) {
    options.langs = options.langs.filter((l) => {
      if (langsArray.includes(l)) return true
      console.warn(`[shiki] Language "${l}" is not in the supported list and will be ignored.`)
      return false
    })
  }

  if (!options.themes || options.themes.length === 0) {
    options.themes = themesArray as any
  } else if (
    options.themes?.some((t) => {
      if (typeof t === "string" && !themesArray.includes(t)) return true
      return false
    })
  ) {
    options.themes = options.themes.filter((t) => {
      if (typeof t === "string" && !themesArray.includes(t)) {
        console.warn(`[shiki] Theme "${t}" is not in the supported list and will be ignored.`)
        return false
      }
      return true
    }) as any
  }

  highlighter = await createHighlighter({ themes: options.themes, langs: options.langs })
  return highlighter
}
export function disposeHighlighter() {
  highlighter = null
}
