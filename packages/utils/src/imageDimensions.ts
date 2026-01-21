/**
 * 从 File 对象或 base64 数据 URI 中提取图像尺寸的辅助函数
 * @param source 图像源 - 可以是 File 对象或 base64 数据 URI 字符串
 * @returns解析为尺寸信息；如果不是图像或发生错误，则返回 undefined
 */
export const getImageDimensions = async (
  source: File | string
): Promise<{ height: number; width: number } | undefined> => {
  // Type guard and validation
  if (typeof source === "string") {
    // Handle base64 data URI
    if (!source.startsWith("data:image/")) return undefined
  } else {
    // Handle File object
    if (!source.type.startsWith("image/")) return undefined
  }

  return new Promise((resolve) => {
    const img = new Image()
    let objectUrl: string | null = null

    const handleLoad = () => {
      resolve({
        height: img.naturalHeight,
        width: img.naturalWidth,
      })
      // Clean up object URL if created
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }

    const handleError = () => {
      // Clean up object URL if created
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
      resolve(undefined)
    }

    img.addEventListener("load", handleLoad)
    img.addEventListener("error", handleError)

    // Set source based on input type
    if (typeof source === "string") {
      // Base64 data URI - use directly
      img.src = source
    } else {
      // File object - create object URL
      objectUrl = URL.createObjectURL(source)
      img.src = objectUrl
    }
  })
}

/**
 * 获取图片的宽度和高度属性
 * @param imageUrl 图片地址
 * @returns 包含图片宽度和高度的 Promise 对象
 */
export function getImageSize(imageUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    // 防止跨域问题
    if (imageUrl.startsWith("http")) {
      img.crossOrigin = "anonymous"
    }

    // 图片加载成功时返回宽高
    img.onload = () => resolve({ width: img.width, height: img.height })

    // 图片加载失败时进行错误处理
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`))

    // 超时处理
    setTimeout(() => {
      reject(new Error(`Image loading timeout: ${imageUrl}`))
    }, 10000)

    // 设置图片的源
    img.src = imageUrl
  })
}

/**
 * 根据图片的宽度和高度计算展示图片的样式
 * @param width 图片的宽度
 * @param height 图片的高度
 * @returns 返回计算后的图片样式对象
 */
export const calculateImageStyle = ({ width, height }: { width: number; height: number }) => {
  // 确保高度不小于40px
  const minHeight = 40
  // 限制高度不超过360px
  const maxHeight = 360

  // 计算宽度和高度的逻辑
  let computedWidth: number
  let computedHeight: number

  if (width >= 140) {
    computedWidth = 140
    computedHeight = Math.max(Math.round((140 / width) * height), minHeight)
  } else if (width <= 35) {
    computedWidth = 45
    computedHeight = Math.max(Math.round((45 / width) * height), minHeight)
  } else {
    computedWidth = width
    computedHeight = Math.max(height, minHeight)
  }

  computedHeight = Math.min(computedHeight, maxHeight)

  const imageStyle = {
    width: `${computedWidth}px`,
    height: `${computedHeight}px`,
  }

  return imageStyle
}

export interface ImageInfo {
  url: string
  width?: number
  height?: number
}

export interface ImageInputData {
  payload: {
    imageInfoArray: ImageInfo[]
  }
}

/**
 * 计算并更新图片宽高
 * @param imageInput 包含图片信息的输入对象
 * @param index 需要更新的图片索引
 * @returns 更新后的图片输入对象
 */
export const updateImageSize = async (imageInput: ImageInputData, index: number = 0): Promise<ImageInputData> => {
  if (!imageInput?.payload?.imageInfoArray) {
    throw new Error("Invalid imageInput structure")
  }

  const { imageInfoArray } = imageInput.payload

  // 提前进行边界检查，避免数组索引越界
  if (index < 0 || index >= imageInfoArray.length) {
    throw new Error(`Invalid image index: ${index}, array length: ${imageInfoArray.length}`)
  }

  const targetImage = imageInfoArray[index]

  if (!targetImage?.url) {
    throw new Error("Target image missing URL property")
  }

  // 获取宽高并更新目标图片的元数据
  const { width, height } = await getImageSize(targetImage.url)
  targetImage.width = width
  targetImage.height = height

  // 返回更新后的对象
  return imageInput
}
