import { watch } from 'vue';
import { ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router';
import { useRobotStore, useSidebarStore, useChatStore } from '@/stores/index';
import { ModelProvider } from '@/ai/constant';
import { showConfirmationBox } from "@/utils/message";
import { useAccessStore, getModelId } from "@/ai/utils";

const { VITE_OPENAI_API_KEY, VITE_OPENAI_PROXY_URL } = import.meta.env;

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

// https://purechat.cn/chat?settings={"keyVaults":{"openai":{"apiKey":"","baseURL":""}}}
console.log('testlink', `https://purechat.cn/chat?settings={"keyVaults":${keyVaults()}}`);

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
    if (!openai.apiKey || openai?.baseURL) return
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