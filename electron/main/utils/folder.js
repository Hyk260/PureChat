import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const request = require("request");
const progressStream = require("progress-stream");

export const folderDir = "File";
export const mainDir = "Pure Files";

const rootDir = path.resolve(os.homedir(), "Documents", mainDir);

export const fnFilePath = (fileName) => {
  return path.join(rootDir, folderDir, fileName);
}

export const initFolder = () => {
  createFolder();
};

// 检查文件是否存在
export const checkFileExist = (fileName) => {
  const filePath = fnFilePath(fileName);
  return fs.existsSync(filePath);
};

/**
 * 创建主文件夹
 * @param {string} dirPath - 要创建的文件夹路径
 * @returns {boolean} - 返回是否成功创建文件夹
 * C:\Users\{user}\Documents\Pure Files
 */
export const createFolder = (dirPath = rootDir) => {
  if (!fs.existsSync(dirPath)) {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      return true; // 创建成功
    } catch (err) {
      console.error("Error creating directory:", err);
      return false; // 创建失败
    }
  } else {
    return true; // 路径已存在
  }
};

/**
 * 在指定文件夹下创建子文件夹
 * @param {string} folder - 要创建子文件夹的名称
 * @returns {boolean} - 返回是否成功创建文件夹
 * C:\Users\{user}\Documents\Pure Files\{folder}
 */
export const createFolderChild = (folder = folderDir) => {
  if (!folder) return;
  const parentDir = path.join(rootDir, folder);
  return createFolder(parentDir);
};

/**
 * 下载文件
 */
export const downloadFolder = ({
  folder = folderDir,
  fileName,
  fileSize,
  fileUrl,
  uuid,
}) => {
  const isFolder = createFolderChild();
  if (!isFolder) {
    console.log("文件路径不存在 downloadFolder:");
    return;
  }
  const file_path = path.join(rootDir, folder, fileName);
  const file_path_temp = `${file_path}.tmp`;
  const requestParams = {
    method: "get",
    url: fileUrl,
    responseType: "stream",
  };
  //创建写入流
  const fileStream = fs.createWriteStream(file_path_temp);
  fileStream
    .on("error", (e) => {
      console.error("error==>", e);
    })
    .on("ready", () => {
      console.log("开始下载:", fileUrl);
    })
    .on("finish", () => {
      //下载完成后重命名文件
      if (fs.existsSync(file_path_temp)) {
        fs.renameSync(file_path_temp, file_path);
        global.mainWin.webContents.send("downloadFinish", { file_path, uuid });
        console.log('file_path:', file_path)
      }
    });
  const requestItem = request(requestParams);
  const stream = progressStream({
    length: fileSize,
    time: 100, // ms
  });
  stream.on("progress", ({ percentage }) => {
    let progress = Math.round(percentage);
    global.mainWin.webContents.send("downloadProgress", { progress, uuid });
  });
  requestItem.pipe(stream).pipe(fileStream);
};