import { BaseModel } from "@/database/core/model"
import { DBModel } from "@/database/types/db"
import { MessageModel } from "@/database/models/message"
import { DB_Topic, DB_TopicSchema } from "@/database/schemas/topic"
import { ChatTopic } from "@/types/topic"
import { nanoid } from "@/utils/uuid"

export interface CreateTopicParams {
  favorite?: boolean
  messages?: string[]
  sessionId: string
  title: string
}

export interface QueryTopicParams {
  containerId?: string | null // sessionId or groupId
  current?: number
  pageSize?: number
}

class _TopicModel extends BaseModel {
  constructor() {
    super("topics", DB_TopicSchema)
  }

  // **************** Query *************** //

  async query({ pageSize = 99, current = 0, containerId }: QueryTopicParams): Promise<ChatTopic[]> {
    const offset = current * pageSize

    // get all topics
    const allTopics = containerId
      ? await this.table.where("sessionId").equals(containerId).toArray()
      : await this.table.toArray()

    // 将所有主题按星标消息优先，时间倒序进行排序
    const sortedTopics = allTopics.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1 // a是星标，b不是，a排前面
      if (!a.favorite && b.favorite) return 1 // b是星标，a不是，b排前面

      // 如果星标状态相同，则按时间倒序排序
      return b.createdAt - a.createdAt
    })

    // handle pageSize
    const pagedTopics = sortedTopics.slice(offset, offset + pageSize)

    return pagedTopics.map((i) => this.mapToChatTopic(i))
  }

  queryAll() {
    return this.table.orderBy("updatedAt").toArray()
  }

  /**
   * 按标题、消息内容或翻译内容中的关键字查询主题
   * @param keyword 要搜索的关键字
   * @param sessionId 会话id
   */
  async queryByKeyword(keyword: string, sessionId?: string): Promise<ChatTopic[]> {
    if (!keyword) return []

    console.time("queryTopicsByKeyword")
    const keywordLowerCase = keyword.toLowerCase()

    // Find topics with matching title
    const queryTable = sessionId ? this.table.where("sessionId").equals(sessionId) : this.table
    const matchingTopicsPromise = queryTable
      .filter((topic) => topic.title.toLowerCase().includes(keywordLowerCase))
      .toArray()

    // Find messages with matching content or translate.content
    const queryMessages = sessionId ? this.db.messages.where("sessionId").equals(sessionId) : this.db.messages
    const matchingMessagesPromise = queryMessages
      .filter((message) => {
        const content = message.payload?.text ?? ""
        // check content
        if (content.toLowerCase().includes(keywordLowerCase)) return true
        return false
      })
      .toArray()

    // Resolve both promises
    const [matchingTopics, matchingMessages] = await Promise.all([matchingTopicsPromise, matchingMessagesPromise])

    // Extract topic IDs from messages
    const topicIdsFromMessages = matchingMessages.map((message) => message.topicId)

    // Combine topic IDs from both sources
    const combinedTopicIds = new Set([...topicIdsFromMessages, ...matchingTopics.map((topic) => topic.id)])

    // Retrieve unique topics by IDs
    const uniqueTopics = await this.table
      .where("id")
      .anyOf([...combinedTopicIds])
      .toArray()

    console.timeEnd("queryTopicsByKeyword")
    return uniqueTopics.map((i) => ({ ...i, favorite: !!i.favorite }))
  }

  async findBySessionId(sessionId: string) {
    return this.table.where({ sessionId }).toArray()
  }

  async findById(id: string): Promise<DBModel<DB_Topic>> {
    return this.table.get(id)
  }

  async count() {
    return this.table.count()
  }

  // **************** Create *************** //

  async create({ title, favorite, sessionId, messages }: CreateTopicParams, id = nanoid()) {
    const topic = await this._addWithSync(id, { favorite: favorite ? 1 : 0, sessionId, title: title })

    // add topicId to these messages
    if (messages) {
      await MessageModel.batchUpdate(messages, { topicId: topic.id })
    }

    return topic
  }

  async batchCreate(_topics: CreateTopicParams[]) {}

  async duplicateTopic(topicId: string, newTitle?: string) {
    return this.db.transaction("rw", [this.db.topics, this.db.messages], async () => {
      // Step 1: get DB_Topic
      const topic = await this.findById(topicId)

      if (!topic) {
        throw new Error(`Topic with id ${topicId} not found`)
      }

      // Step 3: 查询与 `topic` 关联的 `messages`
      // const originalMessages = await MessageModel.queryByTopicId(topicId)

      // const duplicateMessages = await MessageModel.duplicateMessages(originalMessages)

      const { id } = await this.create({
        ...this.mapToChatTopic(topic),
        // messages: duplicateMessages.map((m) => m.id),
        // messages: originalMessages,
        sessionId: topic.sessionId || "inbox",
        title: newTitle || topic.title,
      })

      return id
    })
  }

  // **************** Delete *************** //

  /**
   * Deletes a topic and all messages associated with it.
   */
  async delete(id: string) {
    return this.db.transaction("rw", [this.table, this.db.messages], async () => {
      // 删除topic关联的所有消息
      await MessageModel.batchDeleteByTopicId(id)

      await super._deleteWithSync(id)
    })
  }

  /**
   * 根据topic ID删除多个主题。
   *
   * @param {string} sessionId - The identifier of the assistant associated with the messages.
   * @returns {Promise<void>}
   */
  async batchDeleteBySessionId(sessionId: string): Promise<void> {
    // use sessionId as the filter criteria in the query.
    const query = this.table.where("sessionId").equals(sessionId)

    // Retrieve a collection of message IDs that satisfy the criteria
    const topicIds = await query.primaryKeys()

    // Use the bulkDelete method to delete all selected messages in bulk
    return super._bulkDeleteWithSync(topicIds)
  }

  /**
   * Deletes multiple topics and all messages associated with them in a transaction.
   */
  async batchDelete(topicIds: string[]) {
    return this.db.transaction("rw", [this.table, this.db.messages], async () => {
      // Iterate over each topicId and delete related messages, then delete the topic itself
      for (const topicId of topicIds) {
        // Delete all messages associated with the topic
        await this.delete(topicId)
      }
    })
  }

  async clearTable() {
    return super._clearWithSync()
  }

  // **************** Update *************** //

  async update(id: string, data: Partial<DB_Topic>) {
    return super._updateWithSync(id, data)
  }

  async toggleFavorite(id: string, newState?: boolean) {
    const topic = await this.findById(id)
    if (!topic) {
      throw new Error(`Topic with id ${id} not found`)
    }

    // 切换'favorite'状态
    const nextState = typeof newState !== "undefined" ? newState : !topic.favorite

    await this.update(id, { favorite: nextState ? 1 : 0 })

    return nextState
  }

  // **************** Helper *************** //

  private mapToChatTopic(dbTopic: DBModel<DB_Topic>): ChatTopic {
    return {
      ...dbTopic,
      favorite: !!dbTopic.favorite,
    }
  }
}

export const TopicModel = new _TopicModel()
