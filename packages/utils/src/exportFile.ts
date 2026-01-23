export const exportFile = (content: string, filename?: string) => {
  const blob = new Blob([content], { type: "plain/text" })

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename || "file.txt"

  document.body.append(a)
  a.click()

  URL.revokeObjectURL(url)
  a.remove()
}

export const exportJSONFile = (data: object, fileName: string) => {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" })

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = fileName

  document.body.append(a)
  a.click()

  URL.revokeObjectURL(url)
  a.remove()
}
