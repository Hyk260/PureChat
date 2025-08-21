import { BaseModel } from "../core/model";
import { DB_SessionSchema } from "../schemas/session";

import type { DB_Session } from "../schemas/session";

export interface QuerySessionParams {
  current?: number;
  pageSize?: number;
}

class _SessionModel extends BaseModel {
  constructor() {
    super("sessions", DB_SessionSchema);
  }

  // **************** Query *************** //

  async query({ pageSize = 99, current = 0 }: QuerySessionParams = {}) {
    const offset = current * pageSize;

    const items = await this.table
      .orderBy("updatedAt")
      .reverse()
      .offset(offset)
      .limit(pageSize)
      .toArray();

    return this.mapToAgentSessions(items);
  }

  async queryByKeyword(keyword: string) {
    if (!keyword) return [];

    const startTime = Date.now();
    const keywordLowerCase = keyword.toLowerCase();

    const matchingSessionsPromise = this.table
      .filter((session) => {
        return (
          session.meta.title?.toLowerCase().includes(keywordLowerCase) ||
          session.meta.description?.toLowerCase().includes(keywordLowerCase)
        );
      })
      .toArray();

    const matchingMessagesPromise = this.db.messages
      .filter((message) => {
        // check content
        if (message.content.toLowerCase().includes(keywordLowerCase)) return true;

        // check translate content
        if (message.translate?.content) {
          return message.translate.content.toLowerCase().includes(keywordLowerCase);
        }

        return false;
      })
      .toArray();

    // Resolve both promises
    const [matchingSessions, matchingMessages] = await Promise.all([
      matchingSessionsPromise,
      matchingMessagesPromise,
    ]);

    const sessionIdsFromMessages = matchingMessages.map((message) => message.sessionId);

    // Combine session IDs from both sources
    const combinedSessionIds = new Set([
      ...sessionIdsFromMessages,
      ...matchingSessions.map((session) => session.id),
    ]);

    // Retrieve unique sessions by IDs
    const items = await this.table
      .where("id")
      .anyOf([...combinedSessionIds])
      .toArray();

    console.log(`检索到 ${items.length} 项，耗时 ${Date.now() - startTime}ms`);
    return items;
  }

  async getPinnedSessions(): Promise<DB_Session[]> {
    const items = await this.table.where("pinned").equals(1).reverse().sortBy("updatedAt");

    return items;
  }

  async findById(id: string): Promise<DB_Session> {
    return this.table.get(id);
  }

  async isEmpty() {
    return (await this.table.count()) === 0;
  }

  async count() {
    return this.table.count();
  }

  // **************** Create *************** //

  async create(id: string, data: DB_Session) {
    const exist = await this.findById(id);
    if (exist) return;

    const dataDB = this.mapToDB_Session(data);

    return super._addWithSync(id, dataDB);
  }

  async batchCreate(sessions) {}

  // **************** Delete *************** //

  /**
   * 删除会话
   */
  async delete(id: string) {
    return await super._deleteWithSync(id);
  }

  async clearTable() {
    return super._clearWithSync();
  }

  // **************** Update *************** //

  async update(id: string, data: DB_Session) {
    return super._updateWithSync(id, data);
  }

  async updateConfig(id: string, data: DB_Session) {}

  // **************** Helper *************** //

  mapToDB_Session(session: DB_Session) {
    return {
      ...session,
      pinned: session.isPinned ? 1 : 0,
    };
  }

  DB_SessionToAgentSession(session: DB_Session) {
    return {
      ...session,
      isPinned: session.pinned === 1,
    };
  }

  mapToAgentSessions(session: DB_Session[]) {
    return session.map((item) => this.DB_SessionToAgentSession(item));
  }
}

export const SessionModel = new _SessionModel();
