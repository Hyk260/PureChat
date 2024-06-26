import dayjs from "dayjs";
import {
  engines,
  dependencies,
  devDependencies,
  repository,
  name,
  version,
} from "../../package.json";

/** 平台的名称、版本、运行所需的`node`和`pnpm`版本、依赖、最后构建时间的类型提示 */
export const __APP_INFO__ = {
  pkg: {
    name,
    version,
    engines,
    repository,
    dependencies,
    devDependencies,
  },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

export const viteDefine = {
  __APP_INFO__: JSON.stringify(__APP_INFO__),
};
