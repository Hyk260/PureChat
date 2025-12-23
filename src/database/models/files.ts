import { BaseModel } from "../core/model"
import { DB_FileSchema } from "../schemas/files"
import { clientS3Storage } from "@/service/file/ClientS3"

import type { DB_File } from "../schemas/files"

class _FilesModel extends BaseModel {
  constructor() {
    super("files", DB_FileSchema)
  }

  // **************** Create *************** //

  async create(id: string, file: DB_File) {
    const exist = await this.findById(id)
    if (exist) return

    // clientS3Storage.putObject(id, file)
    return super._addWithSync(id, file)
  }

  // **************** Query *************** //

  async findById(id: string): Promise<DB_File | undefined> {
    const item = await this.table.get(id)
    if (!item) return

    // arrayBuffer to url
    // let base64
    // if (!item.data) {
    //   const hash = (item.url as string).replace("client-s3://", "")
    //   base64 = await this.getBase64ByFileHash(hash)
    // } else {
    //   base64 = Buffer.from(item.data).toString("base64")
    // }

    return {
      ...item,
      // base64,
      // url: `data:${item.fileType};base64,${base64}`
    }
  }

  async queryAll(): Promise<DB_File[]> {
    const data = await this.table.orderBy("createdAt").toArray()

    return data
  }

  async queryByKeyword(keyword: string, fileType: string = "all") {
    if (!keyword) return []

    const startTime = Date.now()
    const keywordLowerCase = keyword.toLowerCase()

    let matchingFilesPromise: Promise<DB_File[]>

    if (fileType === "all") {
      matchingFilesPromise = this.table
        .filter((file: DB_File) => {
          return (
            file.name?.toLowerCase().includes(keywordLowerCase) ||
            file.origin_name?.toLowerCase().includes(keywordLowerCase)
          )
        })
        .toArray()
    } else {
      matchingFilesPromise = this.table
        .where("type")
        .equals(fileType)
        .filter((file: DB_File) => {
          return (
            file.name?.toLowerCase().includes(keywordLowerCase) ||
            file.origin_name?.toLowerCase().includes(keywordLowerCase)
          )
        })
        .toArray()
    }

    const [matchingFiles] = await Promise.all([matchingFilesPromise])

    const items = matchingFiles

    console.log(`检索到 ${items.length} 项，耗时 ${Date.now() - startTime}ms`)

    return items
  }

  // **************** Delete *************** //

  async delete(id: string) {
    return this.table.delete(id)
  }

  async bulkDelete(ids: string[]) {
    this.beforeBulkDelete(ids)
    return super._bulkDeleteWithSync(ids)
  }

  async clear() {
    return this.table.clear()
  }

  // **************** Update *************** //

  async update(id: string, data: DB_File) {
    return super._updateWithSync(id, data)
  }

  // **************** Helper *************** //

  private async getBase64ByFileHash(hash: string) {
    const fileItem = await clientS3Storage.getObject(hash)
    if (!fileItem) throw new Error("file not found")

    return Buffer.from(await fileItem.arrayBuffer()).toString("base64")
  }

  private async beforeBulkDelete(ids: string[]) {
    await Promise.all(ids.map((id) => clientS3Storage.deleteObject(id)))
  }
}

export const FilesModel = new _FilesModel()
