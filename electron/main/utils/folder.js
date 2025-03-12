import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import progressStream from "progress-stream";
import axios from "axios";

export const SUB_DIRECTORY = "File";
export const MAIN_DIRECTORY = "PureChat Files";

const fileStorageDir = path.resolve(os.homedir(), "Documents", MAIN_DIRECTORY);

export function getFilesDir() {
  return path.join(fileStorageDir, SUB_DIRECTORY)
}

/**
 * 获取文件的完整存储路径
 * @param {string} fileName - 文件名
 * @returns {string} 完整文件路径
 */
export const getFilePath = (fileName) => {
  return path.join(fileStorageDir, SUB_DIRECTORY, fileName);
}

/**
 * 创建指定目录（包含递归创建父目录）
 * @param {string} dirPath - 要创建的目录路径
 * @throws {Error} 当目录创建失败时抛出错误
 */
export const createDirectory = (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`目录创建成功: ${dirPath}`);
    }
  } catch (err) {
    console.error(`目录创建失败 [${dirPath}]:`, err);
    throw err;
  }
};

/**
 * 初始化文件存储目录
 * @throws {Error} 当目录创建失败时抛出错误
 */
export const initStorage = () => {
  createDirectory(fileStorageDir);
};

/**
 * 检查文件是否存在
 * @param {string} fileName - 要检查的文件名
 * @returns {boolean} 文件是否存在
 */
export const checkFileExists = (fileName) => {
  const filePath = getFilePath(fileName);
  return fs.existsSync(filePath);
};

/**
 * 下载文件至指定文件夹
 */
export const downloadFolder = async ({
  folder = SUB_DIRECTORY,
  fileName,
  fileSize,
  fileUrl,
  uuid,
}) => {
  createDirectory(path.join(fileStorageDir, folder));

  const filePath = path.join(fileStorageDir, folder, fileName);
  const filePathTemp = `${filePath}.tmp`;

  try {
    const { data } = await axios.get(fileUrl, { responseType: "stream" });

    const fileStream = fs.createWriteStream(filePathTemp);
    const stream = progressStream({ length: fileSize, time: 100 });

    stream.on("progress", ({ percentage }) => {
      const progress = Math.round(percentage);
      global.mainWin.webContents.send("downloadProgress", { progress, uuid });
    });

    data.pipe(stream).pipe(fileStream);

    fileStream.on("finish", () => {
      if (fs.existsSync(filePathTemp)) {
        fs.renameSync(filePathTemp, filePath);
        global.mainWin.webContents.send("downloadFinish", { filePath, uuid });
        console.log('下载完成:', filePath);
      }
    });

    fileStream.on("error", (error) => {
      console.error("文件流错误:", error);
    });
    
  } catch (error) {
    console.error("下载失败:", error);
  }
};