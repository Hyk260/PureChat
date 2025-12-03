/**
 * Favicon 获取工具函数
 */

// 记录失败的 URL，避免重复请求
const failedUrls = new Set<string>()

/**
 * 标记 URL 为失败
 */
function markUrlAsFailed(url: string) {
  failedUrls.add(url)
}

/**
 * 检查 URL 是否已标记为失败
 */
function isUrlFailed(url: string): boolean {
  return failedUrls.has(url)
}

/**
 * 从 URL 中提取主机名
 */
function extractHostname(url: string): string | null {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return null
  }
}

/**
 * 生成所有可能的 favicon URLs
 */
function generateFaviconUrls(hostname: string): string[] {
  return [
    `https://icon.horse/icon/${hostname}`,
    `https://favicon.splitbee.io/?url=${hostname}`,
    `https://favicon.im/${hostname}`,
    `https://${hostname}/favicon.ico`,
  ]
}

/**
 * 获取 favicon URL
 * @param url 目标网站 URL
 * @param timeout 超时时间（毫秒），默认 5000
 * @returns Promise<string | null> favicon URL 或 null
 */
export async function getFaviconUrl(url: string, timeout = 5000): Promise<string | null> {
  const hostname = extractHostname(url)
  if (!hostname) {
    return null
  }

  // 生成所有可能的 favicon URLs
  const faviconUrls = generateFaviconUrls(hostname)

  // 过滤掉已失败的 URLs
  const validFaviconUrls = faviconUrls.filter((faviconUrl) => !isUrlFailed(faviconUrl))

  if (validFaviconUrls.length === 0) {
    return null
  }

  // 创建 AbortController 用于超时控制
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  const signal = controller.signal

  try {
    // 为每个 favicon URL 创建 Promise
    const faviconPromises = validFaviconUrls.map((faviconUrl) =>
      fetch(faviconUrl, {
        method: "HEAD",
        signal,
        credentials: "omit",
      })
        .then((response) => {
          if (response.ok) {
            return faviconUrl
          }
          // 记录 4xx 或 5xx 失败
          if (response.status >= 400) {
            markUrlAsFailed(faviconUrl)
          }
          throw new Error(`Failed to fetch ${faviconUrl}`)
        })
        .catch((error) => {
          // Rethrow aborted errors but silence other failures
          if (error.name === "AbortError") {
            throw error
          }
          return null // Return null for failed requests
        })
    )

    // 使用 Promise.race 获取第一个成功的响应
    const results = await Promise.allSettled(faviconPromises)

    // 查找第一个成功的结果
    for (const result of results) {
      if (result.status === "fulfilled" && result.value) {
        clearTimeout(timeoutId)
        return result.value
      }
    }

    // 如果所有请求都失败，标记所有 URL 为失败
    validFaviconUrls.forEach((faviconUrl) => markUrlAsFailed(faviconUrl))
    return null
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === "AbortError") {
      // 超时，标记所有 URL 为失败
      validFaviconUrls.forEach((faviconUrl) => markUrlAsFailed(faviconUrl))
    }
    return null
  }
}
