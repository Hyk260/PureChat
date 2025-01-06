import { BaseModel } from "../core/model";
import { nanoid } from "@/utils/uuid";

class _MessageModel extends BaseModel {
  constructor() {
    super("messages");
  }

  // **************** Query *************** //

  async query({ sessionId, pageSize = 99, current = 0 }) {
    const offset = current * pageSize;

    const query = this.table.where("sessionId").equals(sessionId);

    const dbMessages = await query
      .sortBy("createdAt")
      // handle page size
      .then((sortedArray) => sortedArray.slice(offset, offset + pageSize));

    const messages = dbMessages;

    const finalList = [];

    const messageMap = new Map();
    for (const item of messages) messageMap.set(item.id, item);

    return finalList;
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

  async create(data) {}

  async batchCreate(messages) {}

  // **************** Delete *************** //

  async delete(id) {
    return super._deleteWithSync(id);
  }

  async clearTable() {
    return "";
  }

  // **************** Update *************** //

  async update(id, data) {
    // return super._updateWithSync(id, data);
  }
}

export const MessageModel = new _MessageModel();
