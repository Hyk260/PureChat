import { BaseModel } from "../core/model";
import { uuid } from "@/utils/uuid";

class _MessageModel extends BaseModel {
  constructor() {
    super("messages");
  }

  // **************** Query *************** //

  async query({ id, pageSize = 99, current = 0 }) {
    const offset = current * pageSize;

    const query = this.table.where("conversationID").equals(id);

    const dbMessages = await query
      .sortBy("createdAt")
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

  async queryBySessionId(sessionId) {
    return this.table.where("sessionId").equals(sessionId).toArray();
  }

  async count() {
    return this.table.count();
  }

  // **************** Create *************** //

  async create(id, data) {
    const messageData = {
      ...data,
      updatedAt: new Date(),
    };
    if (!this.findById(id)) return 
    this._addWithSync(id, messageData);
  }

  async batchCreate(messages) {}

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

export const MessageModel = new _MessageModel();

window.MessageModel = MessageModel;
