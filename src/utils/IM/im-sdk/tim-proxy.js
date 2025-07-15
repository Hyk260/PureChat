import { localChat } from "@/utils/IM/chat/local";

/**
 * IM SDK 全局状态管理
 */
let instance = null;           // SDK 实例
let isInitializing = false;    // 初始化状态标识
let initPromise = null;        // 初始化 Promise，避免重复初始化
let initStartTime = null;      // 初始化开始时间（性能监控）

const LOCAL_MODE = __LOCAL_MODE__;

/**
 * 初始化聊天 SDK
 * 
 * 支持两种模式：
 * 1. 本地模式 (LOCAL_MODE=true) - 使用本地聊天实现
 * 2. 腾讯云模式 (默认) - 使用腾讯云 IM SDK
 * 
 * @returns {Promise<Object>} 初始化后的聊天 SDK 实例
 * @throws {Error} 初始化失败时抛出错误
 * 
 */
async function initChat() {
  initStartTime = performance.now();

  try {
    console.log(`🚀 开始初始化 IM SDK (模式: ${LOCAL_MODE ? '本地' : '腾讯云'})`);

    // 本地模式：使用本地聊天实现
    if (LOCAL_MODE) {
      console.log('🏠 使用本地聊天模式');
      const localInstance = localChat.create({});

      const initTime = performance.now() - initStartTime;
      console.log(`✅ 本地聊天初始化完成 (${initTime.toFixed(2)}ms)`);

      return localInstance;
    }

    // 腾讯云模式：动态加载腾讯云 IM SDK
    console.log('☁️ 加载腾讯云 IM SDK 模块...');

    /**
     * 并行加载所有必需的模块
     * 使用 Promise.all 提高加载效率
     * 
     * 模块说明：
     * - TencentCloudChat: 核心 IM SDK
     * - GroupModule: 群组功能模块
     * - SignalingModule: 信令功能模块  
     * - TIMUploadPlugin: 文件上传插件
     */
    const moduleLoadStart = performance.now();

    const [
      { default: TencentCloudChat },
      { default: GroupModule },
      { default: SignalingModule },
      { default: TIMUploadPlugin },
    ] = await Promise.all([
      // 动态导入
      import(/* @vite-ignore */ "@tencentcloud/chat/index.es.js"),
      import(/* @vite-ignore */ "@tencentcloud/chat/modules/group-module.js"),
      import(/* @vite-ignore */ "@tencentcloud/chat/modules/signaling-module.js"),
      import(/* @vite-ignore */ "tim-upload-plugin"),
    ]);

    const moduleLoadTime = performance.now() - moduleLoadStart;
    console.log(`📦 模块加载完成 (${moduleLoadTime.toFixed(2)}ms)`);

    const {
      VITE_IM_SDK_APPID: appid,
      VITE_LOG_LEVEL: level = '1'  // 默认日志级别
    } = import.meta.env;

    if (!appid) {
      throw new Error('缺少必需的环境变量 VITE_IM_SDK_APPID');
    }

    if (isNaN(Number(appid))) {
      throw new Error('VITE_IM_SDK_APPID 必须是有效的数字');
    }

    console.log(`⚙️ 配置信息: AppID=${appid}, LogLevel=${level}`);

    /**
     * 创建腾讯云 IM 实例
     * 注册必需的功能模块
     */
    const chat = TencentCloudChat.create({
      SDKAppID: Number(appid),
      modules: {
        "group-module": GroupModule,      // 群组功能
        "signaling-module": SignalingModule, // 信令功能
      },
    });

    // 设置日志级别 (0=DEBUG, 1=INFO, 2=WARN, 3=ERROR, 4=NONE)
    const logLevel = Number(level);
    if (!isNaN(logLevel) && logLevel >= 0 && logLevel <= 4) {
      chat.setLogLevel(logLevel);
      console.log(`📝 日志级别设置为: ${logLevel}`);
    } else {
      console.warn(`⚠️ 无效的日志级别 ${level}，使用默认值 1`);
      chat.setLogLevel(1);
    }

    // 注册文件上传插件
    chat.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });
    console.log('🔌 文件上传插件注册成功');

    const totalInitTime = performance.now() - initStartTime;
    console.log(`🎉 腾讯云 IM SDK 初始化完成 (总耗时: ${totalInitTime.toFixed(2)}ms)`);

    return chat;

  } catch (error) {
    const failedInitTime = performance.now() - initStartTime;
    console.error(`❌ IM SDK 初始化失败 (耗时: ${failedInitTime.toFixed(2)}ms):`, error);

    instance = null;
    isInitializing = false;
    initPromise = null;

    throw new Error(`IM SDK初始化失败: ${error.message}`);
  }
}

/**
 * Proxy 处理器对象
 */
const handler = {
  /**
   * 拦截属性访问
   * 
   * @param {Object} target - 代理目标对象（空对象）
   * @param {string|symbol} propKey - 被访问的属性名
   * @returns {*} 属性值或代理函数
   * 
   */
  get(target, propKey) {
    if (instance && propKey in instance) {
      const value = instance[propKey];
      return typeof value === 'function' ? value.bind(instance) : value;
    }

    return async (...args) => {
      if (!instance) {
        if (!isInitializing) {
          isInitializing = true;
          initPromise = initChat();

          try {
            instance = await initPromise;
          } catch (error) {
            isInitializing = false;
            initPromise = null;
            throw error;
          }

          isInitializing = false;
        } else {
          await initPromise;
        }
      }

      if (!(propKey in instance)) {
        throw new Error(`方法 '${String(propKey)}' 在 IM SDK 中不存在`);
      }

      const method = instance[propKey];

      if (typeof method !== 'function') {
        return method;
      }

      try {
        return await method.apply(instance, args);
      } catch (error) {
        console.error(`调用 IM SDK 方法 '${String(propKey)}' 失败:`, error);
        throw error;
      }
    };
  },

  has(target, propKey) {
    return instance ? propKey in instance : true;
  },

  ownKeys(target) {
    return instance ? Object.keys(instance) : [];
  }
};

/**
 * IM SDK 代理对象
 */
const tim = new Proxy({}, handler);

if (import.meta.env.DEV) {
  /**
   * 开发环境下暴露调试接口
   * 可以通过浏览器控制台访问这些调试功能
   */
  window.__TIM_DEBUG__ = {
    getInstance: () => instance,
    getInitStatus: () => ({ instance: !!instance, isInitializing }),

    forceReinit: async () => {
      console.log('🔄 强制重新初始化 IM SDK...');
      instance = null;
      isInitializing = false;
      initPromise = null;

      return await tim.getLoginUser();
    },

    getPerformanceInfo: () => ({
      initStartTime,
      currentTime: performance.now(),
      timeSinceInit: initStartTime ? performance.now() - initStartTime : null
    })
  };

  console.log('🔧 开发模式：IM SDK 调试工具已启用');
  console.log('使用 window.__TIM_DEBUG__ 访问调试功能');
}

export default tim;