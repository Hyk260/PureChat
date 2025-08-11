import { readdir, stat } from "node:fs/promises";
import { sum } from "lodash-es";

/**
 * 格式化字节数为易读的字符串
 * @param byte - 字节数
 * @param digits - 保留的小数位数
 * @returns 格式化后的字符串
 */
function formatBytes(byte: number, digits = 2) {
  if (byte === 0) return '0 Bytes';
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const base = 1024;
  const index = Math.floor(Math.log(byte) / Math.log(base));
  return `${parseFloat((byte / Math.pow(base, index)).toFixed(digits))} ${units[index]}`;
}

/**
 * 获取指定文件夹中所有文件的总大小
 * @param options - 配置项
 */
export const getPackageSize = async (
  options: {
    folder?: string,
    callback: (size: number | string) => void,
    format?: boolean
  }
) => {
  const { folder = "dist", callback, format = true } = options;

  try {
    const files = await readdir(folder);
    if (files.length === 0) {
      callback(0);
      return;
    }
    const fileSizes = await Promise.all(
      files.map(async (item) => {
        const path = `${folder}/${item}`;
        const stats = await stat(path);
        if (stats.isFile()) {
          return stats.size;
        } else if (stats.isDirectory()) {
          const subFolderSize = await new Promise((resolve) => {
            getPackageSize({
              folder: path,
              callback: (result: number) => resolve(typeof result === "number" ? result : 0),
              format: false,
            });
          });
          return subFolderSize;
        }
        return 0;
      })
    );
    const totalSize = sum(fileSizes);
    callback(format ? formatBytes(totalSize) : totalSize);
  } catch (err) {
    console.error("Error calculating package size:", err);
    callback(0);
  }
};

