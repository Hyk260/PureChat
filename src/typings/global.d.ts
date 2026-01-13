import { LocalStg, SessionStg } from "@/utils/storage"
import { DebugTools } from "@/service/chat/PureChatService"

/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 文件使用即可获得类型提示
 */
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
      repository: {
        url: string;
      };
      homepage: string;
      giteeHomepage: string;
      dependencies: Record<string>;
      devDependencies: Record<string>;
    };
    lastBuildTime: string;
  };

  export interface Window {
    /** 本地存储 */
    localStg: LocalStg;
    /** 会话存储 */
    sessionStg: SessionStg;
    /** 复制文本到剪贴板 */
    copyToClipboard: (str: string) => void;
    /** NProgress */
    NProgress: import('nprogress').NProgress;
    /** MessageBox */
    // $messageBox?: import('element-plus').IElMessageBox;
    /** Notification */
    // $notification: import('element-plus').Notify;
    /** Message */
    $message: import('element-plus').Message;
    /** DebugTools */
    __TIM_DEBUG__?: DebugTools
    /** 清空 S3 存储桶 */
    __CLEAR_S3_STORAGE__: () => Promise<string>;
  }

  /**
   * 是否为 Electron 环境
   */
  export const __IS_ELECTRON__: boolean;

  /**
   * 是否为本地模式
   */
  export const __LOCAL_MODE__: boolean;

  /** Build time of the project */
  export const BUILD_TIME: string;
}

export { };
