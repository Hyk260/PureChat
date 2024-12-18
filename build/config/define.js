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
  // console.log("viteEnv", viteEnv);
  return {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
    __LOCAL_MODE__: env?.VITE_LOCAL_MODE === "Y"
  }
};
