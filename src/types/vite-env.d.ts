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
    /**
     * 本地图标的前缀
     *
     * 此前缀以图标前缀开头
     */
    readonly VITE_ICON_LOCAL_PREFIX: 'local-icon';
    /** 后端服务基础URL */
    readonly VITE_SERVICE_BASE_URL: string;
  }
}

/** 全局 import.meta 接口 */
interface ImportMeta {
  /** 环境变量对象 */
  readonly env: Env.ImportMeta;
}
