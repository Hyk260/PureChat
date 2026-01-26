import { describe, it, expect, beforeEach } from "vitest"
import { getFileIcon, setFileIconResolver } from "./fileIcon"
import AudioIcon from "../images/audio.png"
import DefaultIcon from "../images/default.png"
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

describe("fileIcon", () => {
  beforeEach(() => {
    // 重置用户自定义解析器
    setFileIconResolver(null)
  })

  it("should return AudioIcon for audio files", () => {
    const audioTypes = ["mp3", "wav", "ogg", "flac", "aac"]
    audioTypes.forEach((type) => {
      expect(getFileIcon(type)).toBe(AudioIcon)
    })
  })

  it("should return VideoIcon for video files", () => {
    const videoTypes = ["mp4", "avi", "mov", "wmv", "flv", "mkv"]
    videoTypes.forEach((type) => {
      expect(getFileIcon(type)).toBe(VideoIcon)
    })
  })

  it("should return PictureIcon for image files", () => {
    const imageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"]
    imageTypes.forEach((type) => {
      expect(getFileIcon(type)).toBe(PictureIcon)
    })
  })

  it("should return DocumentIcon for document files", () => {
    const docTypes = ["doc", "docx"]
    docTypes.forEach((type) => {
      expect(getFileIcon(type)).toBe(DocumentIcon)
    })
  })

  it("should return FormIcon for spreadsheet files", () => {
    const sheetTypes = ["xls", "xlsx"]
    sheetTypes.forEach((type) => {
      expect(getFileIcon(type)).toBe(FormIcon)
    })
  })

  it("should return PptIcon for presentation files", () => {
    const pptTypes = ["ppt", "pptx"]
    pptTypes.forEach((type) => {
      expect(getFileIcon(type)).toBe(PptIcon)
    })
  })

  it("should return PdfIcon for PDF files", () => {
    expect(getFileIcon("pdf")).toBe(PdfIcon)
  })

  it("should return TxtIcon for text files", () => {
    const textTypes = ["txt", "md", "markdown"]
    textTypes.forEach((type) => {
      expect(getFileIcon(type)).toBe(TxtIcon)
    })
  })

  it("should return JsIcon for JavaScript files", () => {
    expect(getFileIcon("js")).toBe(JsIcon)
  })

  it("should return JsonIcon for JSON files", () => {
    expect(getFileIcon("json")).toBe(JsonIcon)
  })

  it("should return ZipIcon for archive files", () => {
    const archiveTypes = ["zip", "rar", "7z", "tar", "gz"]
    archiveTypes.forEach((type) => {
      expect(getFileIcon(type)).toBe(ZipIcon)
    })
  })

  it("should return ExeIcon for executable files", () => {
    const exeTypes = ["exe", "msi"]
    exeTypes.forEach((type) => {
      expect(getFileIcon(type)).toBe(ExeIcon)
    })
  })

  it("should return DefaultIcon for unknown files", () => {
    expect(getFileIcon("unknown")).toBe(DefaultIcon)
  })

  it("should be case insensitive", () => {
    expect(getFileIcon("MP3")).toBe(AudioIcon)
    expect(getFileIcon("JPG")).toBe(PictureIcon)
    expect(getFileIcon("PDF")).toBe(PdfIcon)
  })

  it("should use user-defined resolver when set", () => {
    const customIcon = "custom-icon.png"
    setFileIconResolver((type) => {
      if (type === "custom") return customIcon
      return null
    })

    expect(getFileIcon("custom")).toBe(customIcon)
    expect(getFileIcon("js")).toBe(JsIcon) // 仍然应该返回默认图标
  })

  it("should handle case when user resolver returns empty string", () => {
    setFileIconResolver(() => "")
    expect(getFileIcon("js")).toBe(JsIcon) // 应该回退到默认图标
  })

  it("should handle case when user resolver returns null", () => {
    setFileIconResolver(() => null)
    expect(getFileIcon("js")).toBe(JsIcon) // 应该回退到默认图标
  })

  it("should handle case when user resolver returns undefined", () => {
    setFileIconResolver(() => undefined)
    expect(getFileIcon("js")).toBe(JsIcon) // 应该回退到默认图标
  })
})
