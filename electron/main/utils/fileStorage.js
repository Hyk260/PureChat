import * as crypto from "crypto";
import * as path from "path";
import * as fs from "fs";
import officeParser from "officeparser";
import { dialog, shell } from "electron";
import { writeFileSync } from "fs";
import { readFile } from "fs/promises";
import { chdir } from "process";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../logger/index";
import { getFilesDir, getFileType, getTempDir } from "../utils/util";
import { documentExts, imageExts } from "../config/constant";

class FileStorage {
  storageDir = getFilesDir();
  tempDir = getTempDir();

  constructor() {
    this.initStorageDir();
  }

  initStorageDir() {
    if (!fs.existsSync(this.storageDir)) {
      fs.mkdirSync(this.storageDir, { recursive: true });
    }
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  async getFileHash(filePath) {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash("md5");
      const stream = fs.createReadStream(filePath);
      stream.on("data", (data) => hash.update(data));
      stream.on("end", () => resolve(hash.digest("hex")));
      stream.on("error", reject);
    });
  }

  async findDuplicateFile(filePath) {
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;

    const files = await fs.promises.readdir(this.storageDir);
    for (const file of files) {
      const storedFilePath = path.join(this.storageDir, file);
      const storedStats = fs.statSync(storedFilePath);

      if (storedStats.size === fileSize) {
        const [originalHash, storedHash] = await Promise.all([
          this.getFileHash(filePath),
          this.getFileHash(storedFilePath),
        ]);

        if (originalHash === storedHash) {
          const ext = path.extname(file);
          const id = path.basename(file, ext);
          return {
            id,
            origin_name: file,
            name: file + ext,
            path: storedFilePath,
            created_at: storedStats.birthtime.toISOString(),
            size: storedStats.size,
            ext,
            type: getFileType(ext),
            count: 2,
          };
        }
      }
    }

    return null;
  }

  async selectFile(_, options) {
    const defaultOptions = {
      properties: ["openFile"],
    };
    const dialogOptions = { ...defaultOptions, ...options };

    const result = await dialog.showOpenDialog(dialogOptions);

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    const fileMetadataPromises = result.filePaths.map(async (filePath) => {
      const stats = fs.statSync(filePath);
      const ext = path.extname(filePath);
      const fileType = getFileType(ext);

      return {
        id: uuidv4(),
        origin_name: path.basename(filePath),
        name: path.basename(filePath),
        path: filePath,
        created_at: stats.birthtime.toISOString(),
        size: stats.size,
        ext: ext,
        type: fileType,
        count: 1,
      };
    });

    return Promise.all(fileMetadataPromises);
  }

  async compressImage(sourcePath, destPath) {
    try {
      const stats = fs.statSync(sourcePath);
      const fileSizeInMB = stats.size / (1024 * 1024);

      // 如果图片大于1MB才进行压缩
      if (fileSizeInMB > 1) {
        try {
          await fs.promises.copyFile(sourcePath, destPath);
          logger.info("[FileStorage] Image compressed successfully:", sourcePath);
        } catch (jimpError) {
          logger.error("[FileStorage] Image compression failed:", jimpError);
          await fs.promises.copyFile(sourcePath, destPath);
        }
      } else {
        // 小图片直接复制
        await fs.promises.copyFile(sourcePath, destPath);
      }
    } catch (error) {
      logger.error("[FileStorage] Image handling failed:", error);
      // 错误情况下直接复制原文件
      await fs.promises.copyFile(sourcePath, destPath);
    }
  }

  async uploadFile(_, file) {
    const duplicateFile = await this.findDuplicateFile(file.path);

    if (duplicateFile) {
      return duplicateFile;
    }

    const uuid = uuidv4();
    const origin_name = path.basename(file.path);
    const ext = path.extname(origin_name).toLowerCase();
    const destPath = path.join(this.storageDir, uuid + ext);

    logger.info("[FileStorage] Uploading file:", file.path);

    // 根据文件类型选择处理方式
    if (imageExts.includes(ext)) {
      await this.compressImage(file.path, destPath);
    } else {
      await fs.promises.copyFile(file.path, destPath);
    }

    const stats = await fs.promises.stat(destPath);
    const fileType = getFileType(ext);

    const fileMetadata = {
      id: uuid,
      origin_name,
      name: uuid + ext,
      path: destPath,
      created_at: stats.birthtime.toISOString(),
      size: stats.size,
      ext: ext,
      type: fileType,
      count: 1,
    };

    return fileMetadata;
  }

  async getFile(_, filePath) {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const stats = fs.statSync(filePath);
    const ext = path.extname(filePath);
    const fileType = getFileType(ext);

    const fileInfo = {
      id: uuidv4(),
      origin_name: path.basename(filePath),
      name: path.basename(filePath),
      path: filePath,
      created_at: stats.birthtime.toISOString(),
      size: stats.size,
      ext: ext,
      type: fileType,
      count: 1,
    };

    return fileInfo;
  }

  async deleteFile(_, id) {
    await fs.promises.unlink(path.join(this.storageDir, id));
  }

  async readFile(_, id) {
    const filePath = path.join(this.storageDir, id);

    if (documentExts.includes(path.extname(filePath))) {
      const originalCwd = process.cwd();
      try {
        chdir(this.tempDir);
        const data = await officeParser.parseOfficeAsync(filePath);
        chdir(originalCwd);
        return data;
      } catch (error) {
        chdir(originalCwd);
        logger.error(error);
        throw error;
      }
    }

    return fs.readFileSync(filePath, "utf8");
  }

  async createTempFile(_, fileName) {
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
    const tempFilePath = path.join(this.tempDir, `temp_file_${uuidv4()}_${fileName}`);
    return tempFilePath;
  }

  // 异步写入文件
  async writeFile(_, filePath, data) {
    await fs.promises.writeFile(filePath, data);
  }

  async base64Image(_, id) {
    const filePath = path.join(this.storageDir, id);
    const data = await fs.promises.readFile(filePath);
    const base64 = data.toString("base64");
    const ext = path.extname(filePath).slice(1) == "jpg" ? "jpeg" : path.extname(filePath).slice(1);
    const mime = `image/${ext}`;
    return {
      mime,
      base64,
      data: `data:${mime};base64,${base64}`,
    };
  }

  // 异步读取二进制文件
  async binaryFile(_, id) {
    const filePath = path.join(this.storageDir, id);
    const data = await fs.promises.readFile(filePath);
    const mime = `image/${path.extname(filePath).slice(1)}`;
    return { data, mime };
  }

  async clear() {
    await fs.promises.rmdir(this.storageDir, { recursive: true });
    this.initStorageDir();
  }

  async clearTemp() {
    await fs.promises.rmdir(this.tempDir, { recursive: true });
    await fs.promises.mkdir(this.tempDir, { recursive: true });
  }

  async open(_, options) {
    try {
      const result = await dialog.showOpenDialog({
        title: "打开文件",
        properties: ["openFile"],
        filters: [{ name: "所有文件", extensions: ["*"] }],
        ...options,
      });

      if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        const fileName = filePath.split("/").pop() || "";
        const content = await readFile(filePath);
        return { fileName, filePath, content };
      }

      return null;
    } catch (err) {
      logger.error("[IPC - Error]", "An error occurred opening the file:", err);
      return null;
    }
  }

  async showItemInFolder(_, path) {
    shell
      .showItemInFolder(path)
      .catch((err) => logger.error("[IPC - Error] Failed to showItemInFolder:", err));
  }
  async openPath(_, path) {
    shell.openPath(path).catch((err) => logger.error("[IPC - Error] Failed to open file:", err));
  }

  async save(_, fileName, content, options) {
    try {
      const result = await dialog.showSaveDialog({
        title: "保存文件",
        defaultPath: fileName,
        ...options,
      });

      if (!result.canceled && result.filePath) {
        writeFileSync(result.filePath, content, { encoding: "utf-8" });
      }

      return result.filePath;
    } catch (err) {
      logger.error("[IPC - Error]", "An error occurred saving the file:", err);
      return null;
    }
  }

  async saveImage(_, name, data) {
    try {
      const filePath = dialog.showSaveDialogSync({
        defaultPath: `${name}.png`,
        filters: [{ name: "PNG Image", extensions: ["png"] }],
      });

      if (filePath) {
        const base64Data = data.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(filePath, base64Data, "base64");
      }
    } catch (error) {
      logger.error("[IPC - Error]", "An error occurred saving the image:", error);
    }
  }

  async selectFolder(_, options) {
    try {
      const result = await dialog.showOpenDialog({
        title: "选择文件夹",
        properties: ["openDirectory"],
        ...options,
      });

      if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
      }

      return null;
    } catch (err) {
      logger.error("[IPC - Error]", "An error occurred selecting the folder:", err);
      return null;
    }
  }

  async downloadFile(_, url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 尝试从Content-Disposition获取文件名
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "download";

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // 如果URL中有文件名，使用URL中的文件名
      const urlFilename = url.split("/").pop()?.split("?")[0];
      if (urlFilename && urlFilename.includes(".")) {
        filename = urlFilename;
      }

      // 如果文件名没有后缀，根据Content-Type添加后缀
      if (!filename.includes(".")) {
        const contentType = response.headers.get("Content-Type");
        const ext = this.getExtensionFromMimeType(contentType);
        filename += ext;
      }

      const uuid = uuidv4();
      const ext = path.extname(filename);
      const destPath = path.join(this.storageDir, uuid + ext);

      // 将响应内容写入文件
      const buffer = Buffer.from(await response.arrayBuffer());
      await fs.promises.writeFile(destPath, buffer);

      const stats = await fs.promises.stat(destPath);
      const fileType = getFileType(ext);

      const fileMetadata = {
        id: uuid,
        origin_name: filename,
        name: uuid + ext,
        path: destPath,
        created_at: stats.birthtime.toISOString(),
        size: stats.size,
        ext: ext,
        type: fileType,
        count: 1,
      };

      return fileMetadata;
    } catch (error) {
      logger.error("[FileStorage] Download file error:", error);
      throw error;
    }
  }

  getExtensionFromMimeType(mimeType) {
    if (!mimeType) return ".bin";

    const mimeToExtension = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "application/pdf": ".pdf",
      "text/plain": ".txt",
      "application/msword": ".doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
      "application/zip": ".zip",
      "application/x-zip-compressed": ".zip",
      "application/octet-stream": ".bin",
    };

    return mimeToExtension[mimeType] || ".bin";
  }

  async copyFile(_, id, destPath) {
    try {
      const sourcePath = path.join(this.storageDir, id);

      // 确保目标目录存在
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        await fs.promises.mkdir(destDir, { recursive: true });
      }

      // 复制文件
      await fs.promises.copyFile(sourcePath, destPath);
      logger.info("[FileStorage] File copied successfully:", { from: sourcePath, to: destPath });
    } catch (error) {
      logger.error("[FileStorage] Copy file failed:", error);
      throw error;
    }
  }
}

export const fileManager = new FileStorage();
