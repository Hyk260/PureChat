import defaultIcon from "../images/default.png"
import AudioIcon from "../images/audio.png"
import DocumentIcon from "../images/document.png"
import ExeIcon from "../images/exe.png"
import FormIcon from "../images/form.png"
import JsIcon from "../images/js.png"
import JsonIcon from "../images/json.png"
import PdfIcon from "../images/pdf.png"
import PictureIcon from "../images/picture.png"
import PptIcon from "../images/ppt.png"
import TxtIcon from "../images/txt.png"
import VideoIcon from "../images/video.png"
import ZipIcon from "../images/zip.png"

export type FileIconResolver = (type: string) => string | undefined | null

let userFileIconResolver: FileIconResolver | null = null

export function setFileIconResolver(resolver?: FileIconResolver | null) {
  userFileIconResolver = resolver ?? null
}

/**
 * 根据文件类型渲染对应的文件图标URL
 * @param fileType 文件扩展名（如：'jpg', 'pdf', 'docx'等）
 * @returns 图标文件的完整URL路径
 */
export function getFileIcon(type: string): string {
  if (userFileIconResolver) {
    const hit = userFileIconResolver(type)
    if (hit != null && hit !== "") return hit
  }
  switch (type.toLowerCase()) {
    // 音频文件
    case "mp3":
    case "wav":
    case "ogg":
    case "flac":
    case "aac":
      return AudioIcon
    // 视频文件
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
    case "flv":
    case "mkv":
      return VideoIcon
    // 图片文件
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "webp":
    case "svg":
      return PictureIcon
    // 文档文件
    case "doc":
    case "docx":
      return DocumentIcon
    // 表格文件
    case "xls":
    case "xlsx":
      return FormIcon
    // 演示文件
    case "ppt":
    case "pptx":
      return PptIcon
    // PDF文件
    case "pdf":
      return PdfIcon
    // 文本文件
    case "txt":
    case "md":
    case "markdown":
      return TxtIcon
    // 代码文件
    case "js":
      return JsIcon
    case "json":
      return JsonIcon
    // 压缩文件
    case "zip":
    case "rar":
    case "7z":
    case "tar":
    case "gz":
      return ZipIcon
    // 可执行文件
    case "exe":
    case "msi":
      return ExeIcon
    // 默认图标
    default:
      return defaultIcon
  }
}
