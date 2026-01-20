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
