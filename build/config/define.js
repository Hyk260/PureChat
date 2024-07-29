import dayjs from "dayjs";
import {
  engines,
  dependencies,
  devDependencies,
  repository,
  name,
  homepage,
  version,
  docs,
} from "../../package.json";

/** 平台的名称、版本、运行所需的`node`版本、依赖、最后构建时间的类型提示 */
export const __APP_INFO__ = {
  pkg: {
    // docs: 'http://localhost:5173/pure-docs',
    docs,
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

export const viteDefine = {
  __APP_INFO__: JSON.stringify(__APP_INFO__),
};
