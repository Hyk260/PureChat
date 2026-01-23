export function generateDalle3RequestPayload(config: any) {
  return {
    model: config.model,
    prompt: "画一只猫",
    response_format: "b64_json",
    n: 1,
    size: "1024x1024",
    quality: "standard",
    style: "vivid",
  }
}

export async function uploadImage(file: File | Blob) {
  const body = new FormData()
  body.append("file", file)
  const res = await fetch("https://api.openai.com", {
    method: "post",
    body,
    mode: "cors",
    credentials: "include",
  })
  const res_1 = await res.json()
  console.log("res", res_1)
  if (res_1?.code === 0 && res_1?.data) {
    return res_1?.data
  }
  throw Error(`upload Error: ${res_1?.msg}`)
}

export function base64Image2Blob(base64Data: string, contentType: string): Blob {
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: contentType })
}

export async function extractImageMessage(res: any): Promise<any> {
  if (res.data) {
    let url = res.data?.at(0)?.url ?? ""
    const b64_json = res.data?.at(0)?.b64_json ?? ""
    if (!url && b64_json) {
      url = await uploadImage(base64Image2Blob(b64_json, "image/png"))
    }
    return [
      {
        type: "image_url",
        image_url: {
          url,
        },
      },
    ]
  }
}

/**
 * 检查对象是否包含特定键。
 * @param {any} obj 输入对象
 * @param {string} key 要检查的键
 * @returns {boolean} 包含该键则返回 true，否则返回 false
 */
export function hasObjectKey(obj: any, key: string): boolean {
  if (typeof obj !== "object" || obj === null) {
    return false
  }

  return Object.keys(obj).includes(key)
}

/**
 * 打开新窗口
 * @param url 要打开的URL
 * @param options 打开窗口的选项
 * @param options.target 目标窗口，默认为"_blank"
 * @param options.noopener 是否设置noopener属性，默认为true
 * @param options.noreferrer 是否设置noreferrer属性，默认为true
 * @returns 新打开的窗口对象
 */
export const openWindow = (
  url: string,
  { target = "_blank", noopener = true, noreferrer = true } = {}
): Window | null => {
  const features = [noopener && "noopener=yes", noreferrer && "noreferrer=yes"].filter(Boolean).join(",")

  return window.open(url, target, features)
}

/**
 * HTML实体映射
 */
const htmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
}

/**
 * 将字符串中的特殊字符进行 HTML 转义
 * @param str 需要转义的字符串
 * @returns 转义后的字符串
 */
export const encodeHTML = (str: string): string => {
  if (typeof str !== "string") {
    throw new Error("encodeHTML expects a string parameter")
  }

  return str.replace(/[&<>"']/g, (match) => htmlEntities[match] ?? match)
}

/**
 * 创建文件输入对话框的配置选项
 */
export interface CreateFileInputOptions {
  /** 可接受的文件类型数组 */
  accept: string[]
  /** 文件选择变化时的回调函数 */
  onChange: (files: FileList | null) => void
}

/**
 * 创建并触发文件选择对话框
 * @param options 配置选项
 */
export const createFileInput = (options: CreateFileInputOptions): void => {
  if (!options || !Array.isArray(options.accept) || typeof options.onChange !== "function") {
    throw new Error("Invalid options provided to createFileInput")
  }

  const input = document.createElement("input")
  input.type = "file"
  input.accept = options.accept.join(",")
  input.style.display = "none"

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target?.files ?? null
    cleanup()
    options.onChange(files)
  }

  const handleWindowFocus = () => {
    setTimeout(() => {
      if (document.body.contains(input)) {
        cleanup()
        options.onChange(null)
      }
    }, 300)
  }

  const cleanup = () => {
    if (document.body.contains(input)) {
      document.body.removeChild(input)
    }
    input.removeEventListener("change", handleChange)
    window.removeEventListener("focus", handleWindowFocus)
  }

  try {
    // 添加事件监听器
    input.addEventListener("change", handleChange)
    window.addEventListener("focus", handleWindowFocus)

    // 添加到DOM并触发点击
    document.body.appendChild(input)
    input.click()
  } catch (error) {
    // 出错时确保清理资源
    cleanup()
    throw new Error(`Failed to create file input: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * 将查询字符串转换为对象
 * @param {String} queryString - 查询字符串，例如 "https://purechat.cn?name=John&age=30"
 * @return {Object} - 转换后的对象，例如 { name: "John", age: "30" }
 */
export function queryStringToObject(queryString: string): Record<string, string> {
  const str = queryString.split("?")[1]
  const params = new URLSearchParams(str)
  const obj = {}
  for (const [key, value] of params) {
    obj[key] = value
  }
  return obj
}
