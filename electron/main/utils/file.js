import fs from 'node:fs'
import os from "node:os";
import path from 'node:path'
import { app } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import { audioExts, documentExts, imageExts, textExts, videoExts } from "../config/constant";

export const SUB_DIRECTORY = "Files";
export const MAIN_DIRECTORY = "PureChat Files";
export const fileStorageDir = path.resolve(os.homedir(), "Documents", MAIN_DIRECTORY);
export const FileTypes = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  TEXT: 'text',
  DOCUMENT: 'document',
  OTHER: 'other'
}
const fileTypeMap = new Map()

// 初始化映射表
function initFileTypeMap() {
  imageExts.forEach((ext) => fileTypeMap.set(ext, FileTypes.IMAGE))
  videoExts.forEach((ext) => fileTypeMap.set(ext, FileTypes.VIDEO))
  audioExts.forEach((ext) => fileTypeMap.set(ext, FileTypes.AUDIO))
  textExts.forEach((ext) => fileTypeMap.set(ext, FileTypes.TEXT))
  documentExts.forEach((ext) => fileTypeMap.set(ext, FileTypes.DOCUMENT))
}

// 初始化映射表
initFileTypeMap()

export function getFileType(ext) {
  ext = ext.toLowerCase()
  return fileTypeMap.get(ext) || FileTypes.OTHER
}

export function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    if (file.startsWith('.')) {
      return
    }

    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
    } else {
      const ext = path.extname(file)
      const fileType = getFileType(ext)

      if ([FileTypes.OTHER, FileTypes.IMAGE, FileTypes.VIDEO, FileTypes.AUDIO].includes(fileType)) {
        return
      }

      const name = path.basename(file)
      const size = fs.statSync(fullPath).size

      const fileItem = {
        id: uuidv4(),
        name,
        path: fullPath,
        size,
        ext,
        count: 1,
        origin_name: name,
        type: fileType,
        created_at: new Date().toISOString()
      }

      arrayOfFiles.push(fileItem)
    }
  })

  return arrayOfFiles
}

export function getTempDir() {
  return path.join(app.getPath('temp'), 'PureChat')
}

export function getFilesDir() {
  // return path.join(app.getPath('userData'), 'Data', 'Files')
  return path.join(fileStorageDir, SUB_DIRECTORY)
}

export function getResourcePath() {
  return path.join(app.getAppPath(), 'resources')
}

export function getDataPath() {
  const dataPath = path.join(app.getPath('userData'), 'Data')
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true })
  }
  return dataPath
}

/**
 * 获取图标文件的完整路径
 * @param {string} iconName - 图标文件的名称，例如 'icon.png'
 * @returns {string} - 图标文件的完整路径
 */
export function getIconPath(iconName) {
  let iconPath;

  if (app.isPackaged) {
    // 打包后的路径
    iconPath = path.join(process.cwd(), 'resources/app.asar.unpacked/resources', iconName);
  } else {
    // 开发模式下的路径
    iconPath = path.join(__dirname, '../../resources', iconName);
  }

  if (!fs.existsSync(iconPath)) {
    console.error(`Icon file does not exist: ${iconPath}`);
  }

  return iconPath;
}
