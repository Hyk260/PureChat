import { ref } from "vue"

import { ElMessage } from "element-plus"

/**
 * HTML Artifacts 相关的共享逻辑
 */
export function useHtmlArtifacts() {
  const popupOpen = ref(false)

  /**
   * 从 HTML 内容中提取标题
   */
  const extractTitle = (html: string): string => {
    if (!html) return "HTML Artifacts"

    // 尝试从 HTML 中提取 title 标签
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
    if (titleMatch?.[1]) {
      return titleMatch[1].trim()
    }

    // 尝试从 h1 标签中提取
    const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/i)
    if (h1Match?.[1]) {
      return h1Match[1].trim()
    }

    return "HTML Artifacts"
  }

  /**
   * 获取最后几行代码用于终端预览
   */
  const getLastLines = (html: string, lines: number = 3): string => {
    if (!html) return ""
    const htmlLines = html.trim().split("\n")
    return htmlLines.slice(-lines).join("\n")
  }

  /**
   * 下载 HTML 文件
   */
  const downloadHtml = (html: string, title?: string) => {
    try {
      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")

      // 使用标题作为文件名，如果没有则使用时间戳
      const fileName = title && title !== "HTML Artifacts" ? `${title}.html` : `html-artifact-${Date.now()}.html`

      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      ElMessage.success({ message: "下载成功" })
    } catch (error) {
      console.error("Download failed:", error)
      ElMessage.error({ message: "下载失败" })
    }
  }

  /**
   * 在新窗口中打开 HTML
   */
  const openExternal = (html: string) => {
    try {
      // 创建临时文件
      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // 在新窗口中打开
      const newWindow = window.open(url, "_blank")
      if (!newWindow) {
        ElMessage.warning({ message: "无法打开新窗口，请检查浏览器设置" })
      }

      // 清理 URL
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 1000)
    } catch (error) {
      console.error("Failed to open external:", error)
      window.$message?.error("打开外部窗口失败")
    }
  }

  /**
   * 复制 HTML 到剪贴板
   */
  const copyHtml = async (html: string) => {
    try {
      await navigator.clipboard.writeText(html)
      window.$message?.success("已复制到剪贴板")
    } catch (error) {
      console.error("复制失败:", error)
      window.$message?.error("复制失败")
    }
  }

  return {
    popupOpen,
    extractTitle,
    getLastLines,
    downloadHtml,
    openExternal,
    copyHtml,
  }
}
