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

  async findById(id: string) {
    return this.table.get(id)
  }

  async queryAll() {
    const data = await this.table.orderBy("createdAt").toArray()

    return data
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
    return this._updateWithSync(id, data)
  }
}

export const FilesModel = new _FilesModel()
