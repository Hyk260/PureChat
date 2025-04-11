import { uuid } from "@/utils/uuid";
import { getTime } from "@/utils/common";
import { browserDB } from "../client/db";

export class BaseModel {
  constructor(table, db = browserDB) {
    this.db = db;
    this._tableName = table;
  }

  get table() {
    return this.db[this._tableName];
  }

  // **************** Create *************** //

  async _addWithSync(id, data) {
    const tableName = this._tableName;

    const record = {
      ...data,
      updatedAt: Date.now(),
    };

    const newId = await this.db[tableName].add(record);

    return { id: newId };
  }

  // **************** Delete *************** //

  async _deleteWithSync(id) {
    const result = await this.table.delete(id);

    return result;
  }

  async _clearWithSync() {
    const result = await this.table.clear();

    return result;
  }

  // **************** Update *************** //

  async _updateWithSync(id, data) {
    const success = await this.table.update(id, {
      ...data,
      updatedAt: Date.now(),
    });

    return { success };
  }

  async _putWithSync(data, id) {
    const result = await this.table.put(data, id);

    return result;
  }
}
