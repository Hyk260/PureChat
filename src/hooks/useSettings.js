import { watch } from 'vue';
import { ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router';
import { useRobotStore, useSidebarStore, useChatStore } from '@/stores/index';
import { ModelProvider } from '@/ai/constant';
import { showConfirmationBox } from "@/utils/message";
import { useAccessStore, getModelId } from "@/ai/utils";

const { VITE_OPENAI_API_KEY, VITE_OPENAI_PROXY_URL } = import.meta.env;

// https://purechat.cn/chat?settings={"keyVaults":{"openai":{"apiKey":"","baseURL":""}}}

// 检测到链接中包含了预制设置，是否自动填入？
// {
//   "apiKey": "sk-XXX",
//   "baseURL": "https://api.moleapi.com"
// }

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

const TestLink = `https://purechat.cn/chat?settings={"keyVaults":${keyVaults()}}`;
console.log('testlink', TestLink);

/**
 * 从 URL 中提取 settings 参数并解析为对象
 * @param {string} [url] - 可选，要解析的 URL 字符串。如果不提供，则使用当前页面的 URL
 * @returns {object|null} 解析成功的对象，或解析失败时返回 null
 */
function extractSettingsFromUrl(url) {
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
 * @param {string} str - 要解析的 JSON 字符串
 * @returns {object|null} 解析成功的对象，或解析失败时返回 null
 */
function tryParseJson(str) {
  try {
    // 先尝试解码 URI 组件后再解析
    return JSON.parse(decodeURIComponent(str));
  } catch (e1) {
    try {
      // 如果解码失败，尝试直接解析
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
async function autofillProvider(settings) {
  if (!settings?.keyVaults) return;
  const robotStore = useRobotStore();
  const sidebarStore = useSidebarStore();
  const chatStore = useChatStore();
  // 目前只处理 openai，可扩展其他 provider
  const openai = settings.keyVaults?.openai;
  if (openai) {
    const data = {
      message: `检测到链接中包含了预制设置，是否自动填入？
        {
          "apiKey": ${openai?.apiKey || "sk-xxx"},
          "baseURL": ${openai?.baseURL || "https://api.xxx.com"}
        }`, 
      iconType: "warning" 
    };
    const result = await showConfirmationBox(data);
    if (result === "cancel") {
      console.warn("取消");
      return;
    }
    const apiKey = openai?.apiKey || '';
    const baseURL = openai?.baseURL || '';
    const config = {
      ...useAccessStore('openai'),
      model: "gpt-4o-mini",
      token: apiKey,
      openaiUrl: baseURL,
    };
    robotStore.setAccessStore(config, 'openai');
    sidebarStore.toggleOutside({ path: "/chat" });
    chatStore.addConversation({ sessionId: `C2C${getModelId('openai')}` })
  }
}

export function useSettings(options = {}) {
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