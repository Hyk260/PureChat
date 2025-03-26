import gradient from "gradient-string";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import boxen from "boxen";
import { getPackageSize } from "./utils";
import { __APP_INFO__ } from '../config/define';

dayjs.extend(duration);

const welcomeMessage = gradient(["cyan", "magenta"]).multiline(
  `您好! 欢迎使用 pure-chat 开源项目\n为您精心准备了文档\n${__APP_INFO__.pkg.docs}`
);

const boxenOptions = {
  padding: 0.5,
  borderColor: "cyan",
  borderStyle: "round"
};

export function viteBuildInfo() {
  let config = { command: '' }
  let startTime = ""
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    buildStart() {
      console.log(boxen(welcomeMessage, boxenOptions));
      if (config.command === "build") {
        startTime = dayjs(new Date());
      }
    },
    closeBundle() {
      if (config.command === "build") {
        const endTime = dayjs(new Date());
        const outDir = config.build?.outDir ?? "dist";
        getPackageSize({
          folder: outDir,
          callback: (size) => {
            const duration = dayjs.duration(endTime.diff(startTime)).format("mm分ss秒");
            const info = `🎉 恭喜打包完成（总用时${duration}，打包后的大小为${size}）`
            console.log(boxen(gradient(["cyan", "magenta"]).multiline(info), boxenOptions));
          }
        });
      }
    }
  };
}
