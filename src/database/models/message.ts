import { BaseModel } from "../core/model"
import { DB_MessageSchema } from "../schemas/message"

import type { DB_Message } from "../schemas/message"
import type { DBModel } from "@/database/types/db"

import type { GET_MESSAGE_LIST_OPTIONS } from "@/types/tencent-cloud-chat"

export interface QueryMessageParams {
  current?: number
  pageSize?: number
  topicId?: string
  sessionId: string
}

// topicId 用于区分同一会话下的不同子主题消息
type QueryMessageWithPaginationParams = GET_MESSAGE_LIST_OPTIONS & {
  topicId?: string
}

class _MessageModel extends BaseModel {
  constructor() {
    super("messages", DB_MessageSchema)
  }

  // **************** Query *************** //

  async query({ sessionId, pageSize = 99, current = 0, topicId }: QueryMessageParams): Promise<DB_Message[]> {
    const offset = current * pageSize
    //  TODO：针对消息的查询 {"sessionId":"xxx","topicId":"xxx"} 将受益于复合索引 [sessionId+topicId]
    // const query = this.table.where("conversationID").equals(id)

    const query = topicId
      ? this.table.where({ sessionId, topicId })
      : this.table
          .where("sessionId")
          .equals(sessionId)
          .and((message) => !message.topicId)

    const dbMessages: DBModel<DB_Message>[] = await query.sortBy("createdAt").then((sortedArray) => {
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
  async queryMessagesWithPagination({
    conversationID: sessionId,
    nextReqMessageID,
    count = 20,
    topicId,
  }: QueryMessageWithPaginationParams): Promise<{
    messages: DB_Message[]
    nextReqMessageID: string
    isCompleted: boolean
  }> {
    const limit = Math.min(count, 20)

    const query = topicId
      ? this.table.where({ sessionId, topicId })
      : this.table
          .where("sessionId")
          .equals(sessionId)
          .and((message) => !message.topicId)

    // 获取该会话的所有消息，按时间正序排列（最旧的在前）
    const allMessages = await query.sortBy("createdAt")

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
    return this.table.where("sessionId").equals(id).toArray()
  }

  async queryByTopicId(topicId: string) {
    const dbMessages = await this.table.where("topicId").equals(topicId).toArray()

    return dbMessages.map((message) => this.mapToChatMessage(message))
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

  /**
   * 删除与topicId相关的所有消息
   * @param topicId
   */
  async batchDeleteByTopicId(topicId: string): Promise<void> {
    const messageIds = await this.table.where("topicId").equals(topicId).primaryKeys()

    return super._bulkDeleteWithSync(messageIds)
  }

  // **************** Update *************** //

  async update(id: string, data: DB_Message) {
    return super._updateWithSync(id, data)
  }

  /**
   * 批量更新指定消息的多个字段。
   *
   * @param {string[]} messageIds - 要更新的消息的标识符。
   * @param {Partial<DB_Message>} updateFields - 包含要更新的字段及其新值的对象。
   * @returns {Promise<number>} - 更新的消息数。
   */
  async batchUpdate(messageIds: string[], updateFields: Partial<DB_Message>): Promise<number> {
    // 按ID检索消息
    const messagesToUpdate = await this.table.where("id").anyOf(messageIds).toArray()

    // 更新每条消息的指定字段
    const updatedMessages = messagesToUpdate.map((message) => ({
      ...message,
      ...updateFields,
    }))

    // 使用bulkPut批量更新消息
    await super._bulkPutWithSync(updatedMessages)

    return updatedMessages.length
  }

  // **************** Helper *************** //

  private mapToChatMessage = ({ ...item }: DBModel<DB_Message>): DB_Message => {
    return {
      ...item,
      topicId: item.topicId ?? undefined,
    }
  }
}

export const MessageModel = new _MessageModel()
