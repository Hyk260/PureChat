import { BaseModel } from "../core/model";
import { getTime } from "@/utils/common";

class _MessageModel extends BaseModel {
  constructor() {
    super("messages");
  }

  // **************** Query *************** //

  async query({ id, pageSize = 99, current = 0 }) {
    const offset = current * pageSize;

    const query = this.table.where("conversationID").equals(id);

    const dbMessages = await query
      .sortBy("clientTime")
      // handle page size
      .then((sortedArray) => sortedArray.slice(offset, offset + pageSize));

    const messages = dbMessages;

    return messages;
  }

  async findById(id) {
    return this.table.get(id);
  }

  async queryAll() {
    const data = await this.table.orderBy("updatedAt").toArray();

    return data;
  }

  async queryBySessionId(id) {
    return this.table.where("ID").equals(id).toArray();
  }

  async count() {
    return this.table.count();
  }

  // **************** Create *************** //

  async create(id, data) {
    const exist = await this.findById(id)
    if (exist) return

    const messageData = {
      ...data,
      updatedAt: getTime(),
    };

    this._addWithSync(id, messageData);
  }

  async batchCreate(messages) { }

  // **************** Delete *************** //

  async delete(id) {
    return this._deleteWithSync(id);
  }

  async clearTable() {
    return this._clearWithSync();
  }

  // **************** Update *************** //

  async update(id, data) {
    if (!__LOCAL_MODE__) return
    return this._updateWithSync(id, data);
  }
}

export const MessageModel = new _MessageModel();
