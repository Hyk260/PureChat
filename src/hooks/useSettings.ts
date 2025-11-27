import { h, watch } from "vue"
import { useRoute } from "vue-router"
import { ElMessageBox } from "element-plus"
import { getModelId, useAccessStore } from "@/ai/utils"
import { useChatStore, useRobotStore, useRouteStore } from "@/stores"

const { VITE_OPENAI_API_KEY, VITE_OPENAI_PROXY_URL, DEV: isDev } = import.meta.env

interface KeyVaults {
  openai?: {
    apiKey?: string
    baseURL?: string
  }
}

interface UseSettingsOptions {
  autoWatch?: boolean
}

interface UrlSettings {
  keyVaults?: KeyVaults
}

// 生成测试链接
const generateKeyVaults = () => {
  return JSON.stringify({
    openai: {
      apiKey: VITE_OPENAI_API_KEY,
      baseURL: VITE_OPENAI_PROXY_URL,
      // 示例配置
      // apiKey: "sk-XXX",
      // baseURL: "https://api.XXX.com"
    },
  })
}

if (isDev) {
  // https://purechat.cn/chat?settings={"keyVaults":{"openai":{"apiKey":"","baseURL":""}}}
  const params = `?settings={"keyVaults":${generateKeyVaults()}}`
  console.log("useSettings 测试链接:", `https://purechat.cn/chat${params}`)
  console.log("useSettings decodeURI 测试链接:", `https://purechat.cn/chat${encodeURIComponent(params)}}`)
}

/**
 * 从URL中提取settings参数并解析为对象
 * @param url 可选的URL字符串，默认为当前页面URL
 * @returns 解析后的设置对象或null
 */
export function extractSettingsFromUrl(url?: string) {
  try {
    // 获取 URL 的查询参数
    const searchParams = url
      ? new URL(url, window.location.origin).searchParams
      : new URLSearchParams(window.location.search)

    const settingsString = searchParams.get("settings")
    if (!settingsString) return null

    return tryParseJson(settingsString)
  } catch (error) {
    console.error("解析 URL settings 参数失败:", error)
    return null
  }
}

/**
 * 尝试解析JSON字符串，支持已编码和未编码的情况
 * @param str 待解析的字符串
 * @returns 解析后的对象或null
 */
function tryParseJson(str: string): UrlSettings | null {
  try {
    // 先尝试解码 URI 组件后再解析
    return JSON.parse(decodeURIComponent(str))
  } catch (e1) {
    console.error("URI解码失败:", e1)
    try {
      return JSON.parse(str) as UrlSettings
    } catch (e2) {
      console.error("JSON解析失败:", e2)
      return null
    }
  }
}

/**
 * 自动填充ai provider 的 apiKey 和 baseURL
 * @param settings 解析后的settings对象
 */
export async function autofillProvider(settings: UrlSettings) {
  if (!settings?.keyVaults) return

  const robotStore = useRobotStore()
  const routeStore = useRouteStore()
  const chatStore = useChatStore()

  const { keyVaults } = settings
  const openaiConfig = keyVaults.openai

  if (!openaiConfig?.baseURL) {
    console.warn("baseURL is not found")
    return
  }

  if (!openaiConfig?.apiKey) {
    console.warn("apiKey is not found")
    return
  }

  const confirmationMessage = h("div", { style: "line-height: 20px;" }, [
    h("div", null, "检测到链接中包含了预制设置，是否自动填入？"),
    h("div", { style: "width:360px;", class: "truncate" }, `"apiKey": ${openaiConfig.apiKey}`),
    h("div", null, `"baseURL": ${openaiConfig.baseURL}`),
  ])

  await ElMessageBox.confirm("检测到链接中包含了预制设置，是否自动填入？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    message: confirmationMessage,
    type: "warning",
  })

  const config = {
    ...useAccessStore("openai"),
    // model: "gpt-4o-mini",
    token: openaiConfig.apiKey,
    openaiUrl: openaiConfig.baseURL,
  }
  robotStore.setAccessStore(config, "openai")
  routeStore.routerPush("/chat")
  chatStore.addConversation({ sessionId: `C2C${getModelId("openai")}` })
}

export function useSettings(options: UseSettingsOptions = { autoWatch: true }) {
  const { autoWatch = true } = options
  const route = useRoute()

  if (autoWatch) {
    watch(
      () => route.fullPath,
      (fullPath) => {
        const settings = extractSettingsFromUrl(fullPath)
        if (settings) {
          autofillProvider(settings)
        }
      },
      { immediate: true }
    )
  }

  return {
    extractSettingsFromUrl,
    autofillProvider,
  }
}
