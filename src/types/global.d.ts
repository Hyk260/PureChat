/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 文件使用即可获得类型提示
 */
export { };

declare global {
  /**
   * 平台的名称、版本、运行所需的`node`和`pnpm`版本、依赖、最后构建时间的类型提示
   */
  export const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      engines: object;
      docs: string;
      bugs: {
        url: string;
      };
      homepage: string;
      giteeHomepage: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  /**
   * 是否为 Electron 环境
   */
  export const __IS_ELECTRON__: boolean;

  /**
   * 是否为本地模式
   */
  export const __LOCAL_MODE__: boolean;

  export interface Window {
    /** 复制文本到剪贴板 */
    copyToClipboard?: (str: string) => void;
    /** NProgress */
    NProgress?: import('nprogress').NProgress;
    /** MessageBox */
    $messageBox?: import('element-plus').IElMessageBox;
    /** Message */
    // $message?: import('element-plus').Message;
    $message?: import('element-plus').Message & {
      success: (message: string | import('element-plus').MessageParams) => void;
      warning: (message: string | import('element-plus').MessageParams) => void;
      info: (message: string | import('element-plus').MessageParams) => void;
      error: (message: string | import('element-plus').MessageParams) => void;
    };
    /** Notification */
    $notification?: import('element-plus').Notify;
    // __TIM_DEBUG__: DebugInterface;
  }

  /** Build time of the project */
  export const BUILD_TIME: string;
}
