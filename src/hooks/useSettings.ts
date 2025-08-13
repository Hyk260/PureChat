import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRobotStore, useSidebarStore, useChatStore } from '@/stores/index';
import { ModelProvider } from '@/ai/constant';
import { showConfirmationBox } from "@/utils/message";
import { useAccessStore, getModelId } from "@/ai/utils";

const { VITE_OPENAI_API_KEY, VITE_OPENAI_PROXY_URL, DEV: isDev } = import.meta.env;

// 生成测试链接
const keyVaults = () => {
  return JSON.stringify({
    openai: {
      apiKey: VITE_OPENAI_API_KEY,
      baseURL: VITE_OPENAI_PROXY_URL,
      // apiKey: "sk-XXX",
      // baseURL: "https://api.XXX.com"
    }
  })
}

if (isDev) {
  // https://purechat.cn/chat?settings={"keyVaults":{"openai":{"apiKey":"","baseURL":""}}}
  console.log('useSettings test link', `https://purechat.cn/chat?settings={"keyVaults":${keyVaults()}}`);
}

/**
 * 从 URL 中提取 settings 参数并解析为对象
 */
export function extractSettingsFromUrl(url?: string) {
  try {
    // 获取 URL 的查询参数
    const searchParams = url
      ? new URL(url, window.location.origin).searchParams
      : new URLSearchParams(window.location.search);

    const settingsString = searchParams.get('settings');
    if (!settingsString) return null;
    // 尝试解码并解析 JSON
    return tryParseJson(settingsString);
  } catch (error) {
    console.error('解析 URL settings 参数失败:', error);
    return null;
  }
}

/**
 * 尝试解析 JSON 字符串，支持已编码和未编码的情况
 */
function tryParseJson(str: string) {
  try {
    // 先尝试解码 URI 组件后再解析
    return JSON.parse(decodeURIComponent(str));
  } catch (e1) {
    try {
      return JSON.parse(str);
    } catch (e2) {
      return null;
    }
  }
}

/**
 * 自动填充机器人 provider 的 apiKey 和 baseURL
 * @param {Object} settings - 解析后的 settings 对象
 */
export async function autofillProvider(settings: any) {
  if (!settings?.keyVaults) return;
  const robotStore = useRobotStore();
  const sidebarStore = useSidebarStore();
  const chatStore = useChatStore();
  // 目前只处理 openai，可扩展其他 provider
  const openai = settings.keyVaults?.openai;
  if (openai) {
    if (!openai?.apiKey || !openai?.baseURL) return
    const data = {
      message: h('div', { style: 'line-height: 20px;' }, [
        h('div', null, '检测到链接中包含了预制设置，是否自动填入？'),
        h('div', { style: "width:360px;", class: 'truncate' }, `"apiKey": ${openai.apiKey}`),
        h('div', null, `"baseURL": ${openai.baseURL}`),
      ]),
      iconType: "warning"
    };
    const result = await showConfirmationBox(data);
    if (result === "cancel") {
      console.warn("取消");
      return;
    }
    const apiKey = openai.apiKey || '';
    const baseURL = openai.baseURL || '';
    const config = {
      ...useAccessStore('openai'),
      // model: "gpt-4o-mini",
      token: apiKey,
      openaiUrl: baseURL,
    };
    robotStore.setAccessStore(config, 'openai');
    sidebarStore.toggleOutside({ path: "/chat" });
    chatStore.addConversation({ sessionId: `C2C${getModelId('openai')}` })
  }
}

interface UseSettingsOptions {
  autoWatch?: boolean;
}

export function useSettings(options: UseSettingsOptions = { autoWatch: true }) {
  const { autoWatch = true } = options;
  const route = useRoute();

  if (autoWatch) {
    watch(
      () => route.fullPath,
      (fullPath) => {
        const settings = extractSettingsFromUrl(fullPath);
        if (settings) {
          autofillProvider(settings);
        }
      },
      { immediate: true }
    );
  }

  return {
    extractSettingsFromUrl,
    autofillProvider,
  };
}