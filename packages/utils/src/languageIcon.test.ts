import { describe, it, expect, beforeEach } from "vitest"
import { getLanguageIcon, setLanguageIconResolver } from "./languageIcon"
import ShellIcon from "../icon/shell.svg?raw"
import SquareCodeIcon from "../icon/square-code.svg?raw"

describe("languageIcon", () => {
  beforeEach(() => {
    // 重置用户自定义解析器
    setLanguageIconResolver(null)
  })

  it("should return ShellIcon for shell language", () => {
    expect(getLanguageIcon("shell")).toBe(ShellIcon)
  })

  it("should return ShellIcon for other shell-related languages", () => {
    const shellLanguages = ["sh", "bash", "zsh", "powershell", "ps1", "bat", "batch", "shellscript"]
    shellLanguages.forEach((lang) => {
      expect(getLanguageIcon(lang)).toBe(ShellIcon)
    })
  })

  it("should use user-defined resolver when set", () => {
    const customIcon = "<svg>Custom Icon</svg>"
    setLanguageIconResolver((lang) => {
      if (lang === "custom") return customIcon
      return null
    })

    expect(getLanguageIcon("custom")).toBe(customIcon)
    expect(getLanguageIcon("shell")).toBe(ShellIcon) // 仍然应该返回默认图标
  })

  it("should return SquareCodeIcon for unknown languages", () => {
    expect(getLanguageIcon("unknown-language")).toBe(SquareCodeIcon)
  })

  it("should handle case when user resolver returns empty string", () => {
    setLanguageIconResolver(() => "")
    expect(getLanguageIcon("shell")).toBe(ShellIcon) // 应该回退到默认图标
  })

  it("should handle case when user resolver returns null", () => {
    setLanguageIconResolver(() => null)
    expect(getLanguageIcon("shell")).toBe(ShellIcon) // 应该回退到默认图标
  })

  it("should handle case when user resolver returns undefined", () => {
    setLanguageIconResolver(() => undefined)
    expect(getLanguageIcon("shell")).toBe(ShellIcon) // 应该回退到默认图标
  })
})
