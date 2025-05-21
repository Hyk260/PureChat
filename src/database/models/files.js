import { BaseModel } from "../core/model";

class _FilesModel extends BaseModel {
  constructor() {
    super("files");
  }

  // **************** Query *************** //

  async findById(id) {
    return this.table.get(id);
  }

  async queryAll() {
    const data = await this.table.orderBy("createdAt").toArray();

    return data;
  }

  // **************** Create *************** //

  async create(id, data) {
    const exist = await this.findById(id)
    if (exist) return

    const messageData = {
      ...data,
      createdAt: Date.now(),
    };

    this._addWithSync(id, messageData);
  }

  // **************** Delete *************** //

  async delete(id) {
    return this._deleteWithSync(id);
  }

  async clearTable() {
    return this._clearWithSync();
  }

  // **************** Update *************** //

  async update(id, data) {
    return this._updateWithSync(id, data);
  }
}

export const FilesModel = new _FilesModel();
