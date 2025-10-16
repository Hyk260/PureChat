import { ref } from "vue"

import { ElMessage } from "element-plus"

export function useCodeBlock() {
  const isCopied = ref(false)
  const saved = ref(false)

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      isCopied.value = true
      ElMessage.success({ message: "复制成功" })

      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    } catch (error) {
      console.error("复制失败:", error)
      ElMessage.error({ message: "复制失败" })
    }
  }

  const downloadCode = (code: string, language: string = "txt", filename?: string) => {
    try {
      const blob = new Blob([code], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")

      link.href = url
      link.download = filename || `code.${language}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      ElMessage.success({ message: "下载成功" })
    } catch (error) {
      console.error("下载失败:", error)
      ElMessage.error({ message: "下载失败" })
    }
  }

  const saveCode = (onSave?: (code: string) => void) => {
    saved.value = true
    ElMessage.success({ message: "保存成功" })

    if (onSave) {
      onSave("")
    }

    setTimeout(() => {
      saved.value = false
    }, 2000)
  }

  return {
    isCopied,
    saved,
    copyCode,
    downloadCode,
    saveCode,
  }
}
