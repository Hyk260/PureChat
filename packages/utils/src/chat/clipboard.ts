export const getBlob = (url: string): Promise<Blob> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.responseType = "blob"
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response
        const image = new Image()
        image.onload = function () {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          canvas.width = image.width
          canvas.height = image.height
          ctx?.drawImage(image, 0, 0)
          canvas.toBlob((blob) => {
            resolve(blob!)
          }, "image/png")
        }
        image.src = URL.createObjectURL(blob)
      }
    }
    xhr.send()
  })
}

const copyUsingFallback = (imageUrl: string) => {
  getBlob(imageUrl)
    .then((blob) => {
      const item = new ClipboardItem({ "image/png": blob })
      navigator.clipboard.write([item]).then(() => {
        console.log("Image copied to clipboard")
      })
    })
    .catch((error) => {
      console.error("Failed to copy image using fallback method:", error)
    })
}

const copyUsingModernAPI = async (imageUrl: string) => {
  try {
    const base64Response = await fetch(imageUrl)
    const blob = await base64Response.blob()
    const item = new ClipboardItem({ "image/png": blob })
    await navigator.clipboard.write([item])
  } catch (error) {
    console.error("Failed to copy image using modern API:", error)
    copyUsingFallback(imageUrl)
  }
}

export const copyImageToClipboard = async (imageUrl: string) => {
  // 检查是否支持现代 Clipboard API
  if (navigator.clipboard && "write" in navigator.clipboard) {
    await copyUsingModernAPI(imageUrl)
  } else {
    copyUsingFallback(imageUrl)
  }
}
