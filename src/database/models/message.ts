import { BaseModel } from "../core/model";
import { DB_Message, DB_MessageSchema } from "../schemas/message";

export interface QueryMessageParams {
  current?: number;
  pageSize?: number;
  id: string;
}

class _MessageModel extends BaseModel {
  constructor() {
    super("messages", DB_MessageSchema);
  }

  // **************** Query *************** //

  async query({ id, pageSize = 99, current = 0 }: QueryMessageParams) {
    const offset = current * pageSize;

    const query = this.table.where("conversationID").equals(id);

    const dbMessages = await query
      .sortBy("createdAt")
      .then((sortedArray) => {
        return sortedArray.slice(offset, offset + pageSize)
      });

    const messages = dbMessages;

    return messages;
  }

  async findById(id: string): Promise<DB_Message> {
    return this.table.get(id);
  }

  async queryAll() {
    const data: DB_Message[] = await this.table.orderBy("createdAt").toArray();

    return data;
  }

  async queryBySessionId(id: string) {
    return this.table.where("ID").equals(id).toArray();
  }

  async count() {
    return this.table.count();
  }

  // **************** Create *************** //

  async create(id: string, data: DB_Message) {
    const exist = await this.findById(id)
    if (exist) return

    const messageData = data

    return super._addWithSync(id, messageData);
  }

  async batchCreate(messages: DB_Message[]) { }

  // **************** Delete *************** //

  async delete(id: string) {
    return super._deleteWithSync(id);
  }

  async clearTable() {
    return super._clearWithSync();
  }

  // **************** Update *************** //

  async update(id: string, data: DB_Message) {
    return super._updateWithSync(id, data);
  }
}

export const MessageModel = new _MessageModel();
