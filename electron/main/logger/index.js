import os from 'node:os';
import path from 'node:path';
import log from 'electron-log';
import { MAIN_DIRECTORY } from '../utils/file';
import { isDevelopment } from '../platform';

const rootDir = path.resolve(os.homedir(), "Documents", MAIN_DIRECTORY);

// log.transports.console.level = false; // 禁用控制台输出;
log.transports.file.maxSize = 10024300; // 文件最大不超过 10M
// 输出格式
log.transports.file.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}";
const date = new Date();
// 文件名为：年-月-日.log
const dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
// 默认位置为：C:\Users\[user]\AppData\Roaming\[appname]\electron_log\
const folder = isDevelopment ? "dev" : "pro";
// 自定义文件保存位置为安装目录下 \log\年-月-日.log
// C:\Users\{user}\Documents\{MAIN_DIRECTORY}\log\{dev|pro}\{年-月-日.log}
log.transports.file.resolvePathFn = () => path.join(rootDir, "log", folder, dateStr + ".log");

// 有六个日志级别 error, warn, info, verbose, debug, silly
export const logger = log;
