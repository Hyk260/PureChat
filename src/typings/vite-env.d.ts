/// <reference types="vite/client" />
/**
 * 环境变量命名空间
 *
 * import.meta对象的类型定义
 */
declare namespace Env {
  /** 路由器历史模式类型 */
  type RouterHistoryMode = 'hash' | 'history';

  /** import.meta 接口定义 */
  // eslint-disable-next-line no-undef
  interface ImportMeta extends ImportMetaEnv {
    /** IM SDK AppID */
    readonly VITE_IM_SDK_APPID: string;
    /** IM SDK LogLevel */
    readonly VITE_LOG_LEVEL: string;
    /** 应用程序的基础URL */
    readonly VITE_BASE_URL: string;
    /** 应用程序的标题 */
    readonly VITE_APP_NAME: string;
    /** 路由器历史模式 */
    readonly VITE_ROUTER_HISTORY?: RouterHistoryMode;
    /** iconify图标的前缀 */
    readonly VITE_ICON_PREFIX: 'icon';
    /** 是否生成sourcemap */
    readonly VITE_SOURCE_MAP: 'Y' | 'N';
    /** 端口号 */
    readonly VITE_PORT: number;
    /** 是否为本地模式 */
    readonly VITE_LOCAL_MODE: 'Y' | 'N';
    /** 是否开启devtools */
    readonly VITE_DEV_TOOLS: 'Y' | 'N';
    /** 是否禁用浏览器开发者工具面板（阻止F12和右键菜单） */
    readonly VITE_DISABLE_DEVTOOLS: 'Y' | 'N';
    /** 是否启用removeConsole插件 */
    readonly VITE_REMOVE_CONSOLE: 'Y' | 'N';
    /** 应用环境 */
    readonly VITE_APP_ENV: 'electron' | 'web';
    /** 是否启用自动导入 */
    readonly VITE_AUTO_IMPORT: 'Y' | 'N';
    /** 是否启用自动组件 */
    readonly VITE_AUTO_COMPONENT: 'Y' | 'N';
    /** 是否自动检测更新 */
    readonly VITE_AUTOMATICALLY_DETECT_UPDATE: 'Y' | 'N';
    /** 本地图标的前缀 */
    readonly VITE_ICON_LOCAL_PREFIX: 'local-icon';
    /** 后端服务基础URL */
    readonly VITE_SERVICE_BASE_URL: string;
    /** Tavily API Key */
    readonly VITE_TAVILY_API_KEY: string
    /**
     * Iconify api provider url
     *
     * If the project is deployed in intranet, you can set the api provider url to the local iconify server
     *
     * @link https://docs.iconify.design/api/providers.html
     */
    readonly VITE_ICONIFY_URL?: string;
    /** 启动编辑器 */
    readonly VITE_DEVTOOLS_LAUNCH_EDITOR?: import('vite-plugin-vue-devtools').VitePluginVueDevToolsOptions['launchEditor'];

    /** AI 平台 */
    /** OpenAI API Key */
    readonly VITE_OPENAI_API_KEY: string;
    /** OpenAI 代理 URL */
    readonly VITE_OPENAI_PROXY_URL: string;
    /** DeepSeek API Key */
    readonly VITE_DEEPSEEK_API_KEY: string;
    /** DeepSeek API URL */
    readonly VITE_DEEPSEEK_BASE_URL: string;
    /** Qwen API Key */
    readonly VITE_QWEN_API_KEY: string;
    /** Qwen API URL */
    readonly VITE_QWEN_BASE_URL: string;
    /** ZeroOne API Key */
    readonly VITE_ZEROONE_API_KEY: string;
    /** ZeroOne API URL */
    readonly VITE_ZEROONE_BASE_URL: string;
    /** Ollama API URL */
    readonly VITE_OLLAMA_PROXY_URL: string;
    /** Mistral API URL */
    readonly VITE_MISTRAL_BASE_URL: string;
    /** Mistral API Key */
    readonly VITE_MISTRAL_API_KEY: string;
    /** GitHub API Key */
    readonly VITE_GITHUB_API_KEY: string;
    /** GitHub API URL */
    readonly VITE_GITHUB_PROXY_URL: string;
    /** Zhipu API Key */
    readonly VITE_ZHIPU_API_KEY: string;
    /** Zhipu API URL */
    readonly VITE_ZHIPU_BASE_URL: string;
  }
}

/** 全局 import.meta 接口 */
interface ImportMeta {
  /** 环境变量对象 */
  readonly env: Env.ImportMeta;
}
