import dayjs from "dayjs";

import {
  engines,
  dependencies,
  devDependencies,
  repository,
  name,
  homepage,
  bugs,
  version,
  docs,
} from "../../package.json";

/** 平台的名称、版本、运行所需的`node`版本、依赖、最后构建时间的类型提示 */
export const __APP_INFO__ = {
  pkg: {
    // docs: process.env.NODE_ENV === "development" ? "http://localhost:5173/pure-docs" : docs,
    docs,
    bugs,
    name,
    version,
    engines,
    homepage,
    repository,
    dependencies,
    devDependencies,
  },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

export const viteDefine = (env) => {
  return {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
    __LOCAL_MODE__: env?.VITE_LOCAL_MODE === "Y"
  }
};

export const manualChunks = (id) => {
  if (id.includes('node_modules')) {
    if (id.includes('@tencentcloud/chat')){
      return 'tencent-im-vendor';
    }
    if (id.includes('@vueuse')) {
      return 'vueuse-vendor';
    }
    if (id.includes('@wangeditor')) {
      return 'wangeditor-vendor';
    }
    if (id.includes('lodash-es')) {
      return 'lodash-vendor';
    }
    if (id.includes('element-plus')) {
      return 'el-vendor';
    }
    if (id.includes('@vue') || id.includes('vue')) {
      return 'vue-vendor';
    }
    return 'vendor';
  }
};
