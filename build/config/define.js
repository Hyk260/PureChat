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

// 定义模块与 chunk 名称的映射关系
const chunkMap = {
  '@element-plus/icons-vue': 'element-icons-vendor',
  '@wangeditor': 'wangeditor-vendor',
  '@tencentcloud/chat': 'tencent-im-vendor',
  '@vueuse': 'vueuse-vendor',
  'lodash-es': 'lodash-vendor',
  'element-plus': 'el-vendor',
  'artplayer': 'artplayer-vendor',
  'tailwindcss': 'tailwindcss-vendor',
  'highlight': 'highlight-vendor',
  'pinyin-pro': 'pinyin-pro-vendor',
  'markdown': 'markdown-vendor',
  'axios': 'axios-vendor',
  'dayjs': 'dayjs-vendor',
  'vue': 'vue-vendor',
};

export const manualChunks = (id) => {
  if (!id.includes('node_modules')) return;

  for (const [key, chunkName] of Object.entries(chunkMap)) {
    if (id.includes(key)) {
      return chunkName;
    }
  }

  return 'vendor';
};