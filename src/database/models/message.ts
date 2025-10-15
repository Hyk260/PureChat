import { BaseModel } from "../core/model"
import { DB_MessageSchema } from "../schemas/message"

import type { DB_Message } from "../schemas/message"

export interface QueryMessageParams {
  current?: number
  pageSize?: number
  id: string
}

class _MessageModel extends BaseModel {
  constructor() {
    super("messages", DB_MessageSchema)
  }

  // **************** Query *************** //

  async query({ id, pageSize = 99, current = 0 }: QueryMessageParams) {
    const offset = current * pageSize

    const query = this.table.where("conversationID").equals(id)

    const dbMessages = await query.sortBy("createdAt").then((sortedArray) => {
      return sortedArray.slice(offset, offset + pageSize)
    })

    const messages = dbMessages

    return messages
  }

  /**
   * 分页查询消息列表
   * @param conversationID 会话ID
   * @param nextReqMessageID 下一页请求的消息ID，为空时获取最新消息
   * @param count 返回消息数量，默认20，最大20
   */
  async queryMessagesWithPagination(
    conversationID: string,
    nextReqMessageID?: string,
    count: number = 20
  ): Promise<{ messages: DB_Message[]; nextReqMessageID: string; isCompleted: boolean }> {
    const limit = Math.min(count, 20)

    // 获取该会话的所有消息，按时间正序排列（最旧的在前）
    const allMessages = await this.table.where("conversationID").equals(conversationID).sortBy("createdAt")

    // 保持正序排列，这样最新的消息在数组末尾
    const sortedMessages = allMessages

    let messages: DB_Message[] = []
    let nextReqMessageIDResult = ""
    let isCompleted = false

    if (nextReqMessageID) {
      // 上拉加载更多：查找指定消息的索引
      const targetIndex = sortedMessages.findIndex((msg) => msg.ID === nextReqMessageID)
      if (targetIndex !== -1) {
        // 获取该消息前面的消息（更早的消息）
        const startIndex = Math.max(0, targetIndex - limit)
        messages = sortedMessages.slice(startIndex, targetIndex)

        // 设置下一页的消息ID
        if (startIndex > 0) {
          nextReqMessageIDResult = sortedMessages[startIndex - 1].ID
        } else {
          isCompleted = true
        }
      } else {
        // 如果找不到指定消息，返回空数组
        messages = []
        isCompleted = true
      }
    } else {
      // 首次加载：获取最新的消息（数组末尾的消息）
      const startIndex = Math.max(0, sortedMessages.length - limit)
      messages = sortedMessages.slice(startIndex)

      // 设置下一页的消息ID
      if (startIndex > 0) {
        nextReqMessageIDResult = sortedMessages[startIndex - 1].ID
      } else {
        isCompleted = true
      }
    }

    return {
      messages,
      nextReqMessageID: nextReqMessageIDResult,
      isCompleted,
    }
  }

  async findById(id: string): Promise<DB_Message> {
    return this.table.get(id)
  }

  async queryAll(): Promise<DB_Message[]> {
    const data = await this.table.orderBy("createdAt").toArray()

    return data
  }

  async queryBySessionId(id: string) {
    return this.table.where("ID").equals(id).toArray()
  }

  async count() {
    return this.table.count()
  }

  // **************** Create *************** //

  async create(id: string, data: DB_Message) {
    const exist = await this.findById(id)
    if (exist) return

    const messageData = data

    return super._addWithSync(id, messageData)
  }

  async batchCreate(_messages: DB_Message[]) {}

  // **************** Delete *************** //

  async delete(id: string) {
    return super._deleteWithSync(id)
  }

  async clearTable() {
    return super._clearWithSync()
  }

  // **************** Update *************** //

  async update(id: string, data: DB_Message) {
    return super._updateWithSync(id, data)
  }
}

export const MessageModel = new _MessageModel()
