/**
 * 环境变量命名空间
 *
 * import.meta对象的类型定义
 */
declare namespace Env {
  /** 路由器历史模式类型 */
  type RouterHistoryMode = 'hash' | 'history' | 'memory';

  /** import.meta 接口定义 */
  interface ImportMeta extends ImportMetaEnv {
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
    /** 是否启用removeConsole插件 */
    readonly VITE_REMOVE_CONSOLE: 'Y' | 'N';
    /** 应用环境 */
    readonly VITE_APP_ENV: 'electron' | 'web';
    /** 是否启用自动导入 */
    readonly VITE_AUTO_IMPORT: 'Y' | 'N';
    /** 是否启用自动组件 */
    readonly VITE_AUTO_COMPONENT: 'Y' | 'N';
    /**
     * 本地图标的前缀
     *
     * 此前缀以图标前缀开头
     */
    readonly VITE_ICON_LOCAL_PREFIX: 'local-icon';
    /** 后端服务基础URL */
    readonly VITE_SERVICE_BASE_URL: string;

    /** The launch editor */
    readonly VITE_DEVTOOLS_LAUNCH_EDITOR?: import('vite-plugin-vue-devtools').VitePluginVueDevToolsOptions['launchEditor'];
  }
}

/** 全局 import.meta 接口 */
interface ImportMeta {
  /** 环境变量对象 */
  readonly env: Env.ImportMeta;
}
