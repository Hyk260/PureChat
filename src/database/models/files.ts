import { BaseModel } from "../core/model"
import { DB_FileSchema } from "../schemas/files"

import type { DB_File } from "../schemas/files"

class _FilesModel extends BaseModel {
  constructor() {
    super("files", DB_FileSchema)
  }

  // **************** Create *************** //

  async create(id: string, file: DB_File) {
    const exist = await this.findById(id)
    if (exist) return

    return super._addWithSync(id, file)
  }

  // **************** Query *************** //

  async findById(id: string): Promise<DB_File> {
    return this.table.get(id)
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
      matchingFilesPromise = this.table.filter((file: DB_File) => {
        return (
          file.name?.toLowerCase().includes(keywordLowerCase) ||
          file.origin_name?.toLowerCase().includes(keywordLowerCase)
        )
      }).toArray()
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

  async clear() {
    return this.table.clear()
  }

  // **************** Update *************** //

  async update(id: string, data: DB_File) {
    return super._updateWithSync(id, data)
  }
}

export const FilesModel = new _FilesModel()
