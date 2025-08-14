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
      engines: {};
      docs: string;
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

  /**
   * 应用名称
   */
  export const __APP_NAME__: string;

  export interface Window {
    /** NProgress instance */
    NProgress?: import('nprogress').NProgress;
  }

  /** Build time of the project */
  export const BUILD_TIME: string;
}
