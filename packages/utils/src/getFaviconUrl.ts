// 记录失败的 URL，避免重复请求
const failedFaviconUrls = new Set<string>()

const markFailed = (faviconUrl: string) => failedFaviconUrls.add(faviconUrl)
const isFailed = (faviconUrl: string) => failedFaviconUrls.has(faviconUrl)

const parseHostname = (input: string): string | null => {
  try {
    return new URL(input).hostname
  } catch {
    return null
  }
}

const buildFaviconCandidates = (hostname: string): string[] => [
  `https://icon.horse/icon/${hostname}`,
  `https://favicon.splitbee.io/?url=${hostname}`,
  `https://favicon.im/${hostname}`,
  `https://${hostname}/favicon.ico`,
]

const isAbortError = (e: unknown) =>
  e instanceof DOMException ? e.name === "AbortError" : e instanceof Error && e.name === "AbortError"

/** 单个候选 URL 探测：成功返回 url；失败返回 null；AbortError 直接抛出 */
async function probeFavicon(url: string, signal: AbortSignal): Promise<string | null> {
  try {
    const resp = await fetch(url, { method: "HEAD", signal, credentials: "omit" })
    if (resp.ok) return url

    // 4xx/5xx 直接拉黑，避免下次重复试探
    if (resp.status >= 400) markFailed(url)
    return null
  } catch (e) {
    if (isAbortError(e)) throw e // 超时/中止交给上层统一处理
    return null
  }
}

/**
 * 获取 favicon URL
 * - 返回第一个可用的 favicon 地址
 * - timeout 超时后会 abort，并将本轮候选全部标记失败（防止短时间内反复打同一批）
 */
export async function getFaviconUrl(targetUrl: string, timeout = 5000): Promise<string | null> {
  const hostname = parseHostname(targetUrl)
  if (!hostname) return null

  const candidates = buildFaviconCandidates(hostname).filter((u) => !isFailed(u))
  if (!candidates.length) return null

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    // 并发探测，拿到“第一个成功值”（不是第一个完成）
    const settled = await Promise.allSettled(candidates.map((u) => probeFavicon(u, controller.signal)))
    return settled.find((r): r is PromiseFulfilledResult<string | null> => r.status === "fulfilled")?.value ?? null
  } catch (e) {
    // Abort：标记本轮全部失败，避免持续卡超时
    if (isAbortError(e)) candidates.forEach(markFailed)
    return null
  } finally {
    clearTimeout(timer)
  }
}
