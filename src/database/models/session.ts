import { BaseModel } from "../core/model"
import { DB_SessionSchema } from "../schemas/session"
import { MessageModel } from "@/database/models/message"
import { TopicModel } from "@/database/models/topic"
import type { DBModel } from "@/database/types/db"
import type { DB_Session } from "../schemas/session"

export interface QuerySessionParams {
  current?: number
  pageSize?: number
}

class _SessionModel extends BaseModel {
  constructor() {
    super("sessions", DB_SessionSchema)
  }

  // **************** Query *************** //

  async query({ pageSize = 99, current = 0 }: QuerySessionParams = {}) {
    // const offset = current * pageSize

    // const items: DBModel<DB_Session>[] = await this.table
    //   .orderBy("updatedAt")
    //   .reverse()
    //   .offset(offset)
    //   .limit(pageSize)
    //   .toArray()

    // return this.mapToAgentSessions(items)
    return this.queryOrderByPinnedAndUpdatedAt({ pageSize, current })
  }

  /**
   * 根据 pinned（1 在前）和 updatedAt 排序
   * 排序优先级：pinned(1>0) > updatedAt(新>旧)
   */
  async queryOrderByPinnedAndUpdatedAt({ pageSize = 99, current = 0 }: QuerySessionParams = {}) {
    const offset = current * pageSize

    const items: DBModel<DB_Session>[] = await this.table.toArray()

    items.sort((a, b) => {
      const pinnedA = a.pinned ?? 0
      const pinnedB = b.pinned ?? 0
      if (pinnedA !== pinnedB) {
        return pinnedB - pinnedA
      }

      const updatedA = a.updatedAt ?? 0
      const updatedB = b.updatedAt ?? 0
      return updatedB - updatedA
    })

    const pagedItems = items.slice(offset, offset + pageSize)

    return this.mapToAgentSessions(pagedItems)
  }

  async queryByKeyword(keyword: string) {
    if (!keyword) return []

    const startTime = Date.now()
    const keywordLowerCase = keyword.toLowerCase()

    const matchingSessionsPromise: Promise<DB_Session[]> = this.table
      .filter((session: DB_Session) => {
        const messageMatch = session.lastMessage?.messageForShow?.toLowerCase().includes(keywordLowerCase) ?? false
        const nickMatch = session.userProfile?.nick?.toLowerCase().includes(keywordLowerCase) ?? false
        return messageMatch || nickMatch
      })
      .toArray()

    const [matchingSessions] = await Promise.all([matchingSessionsPromise])

    const items = matchingSessions

    console.log(`检索到 ${items.length} 项，耗时 ${Date.now() - startTime}ms`)
    return this.mapToAgentSessions(items)
  }

  async getPinnedSessions(): Promise<DB_Session[]> {
    const items: DBModel<DB_Session>[] = await this.table.where("pinned").equals(1).reverse().sortBy("updatedAt")

    return this.mapToAgentSessions(items)
  }

  async findById(id: string): Promise<DB_Session> {
    return this.table.get(id)
  }

  async isEmpty() {
    return (await this.table.count()) === 0
  }

  async count() {
    return this.table.count()
  }

  // **************** Create *************** //

  async create(id: string, data: DB_Session) {
    const exist = await this.findById(id)
    if (exist) return

    const dataDB = this.mapToDB_Session(data)

    return super._addWithSync(id, dataDB)
  }

  async batchCreate(_sessions: DB_Session[]) {}

  // **************** Delete *************** //

  /**
   * 删除会话
   */
  async delete(id: string) {
    return await super._deleteWithSync(id)
  }

  /**
   * 删除会话，同时删除关联的所有messages和topic。
   */
  async deleteWithRelations(id: string) {
    return this.db.transaction("rw", [this.table, this.db.topics, this.db.messages], async () => {
      // 删除该会话下所有消息
      await MessageModel.batchDeleteBySessionId(id)
      // 删除该会话下所有话题
      await TopicModel.batchDeleteBySessionId(id)
      // 最后删除会话本身
      await super._deleteWithSync(id)
    })
  }

  async clearTable() {
    return super._clearWithSync()
  }

  // **************** Update *************** //

  async update(id: string, data: Partial<DB_Session>) {
    const _data = {
      ...data,
      pinned: data.isPinned ? 1 : 0,
    }
    return super._updateWithSync(id, _data)
  }

  async updateConfig(_id: string, _data: DB_Session) {}

  // **************** Helper *************** //

  mapToDB_Session(session: DB_Session) {
    return {
      ...session,
      pinned: session.isPinned ? 1 : 0,
    }
  }

  DB_SessionToAgentSession(session: DB_Session) {
    return {
      ...session,
      isPinned: session.pinned === 1,
    }
  }

  mapToAgentSessions(session: DB_Session[]) {
    return session.map((item) => this.DB_SessionToAgentSession(item))
  }
}

export const SessionModel = new _SessionModel()
