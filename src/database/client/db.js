import Dexie from "dexie";
import { uuid } from "@/utils/uuid";

export const dbSchemaV1 = {
  messages: "&ID, conversationID, conversationType, time, clientTime, nick, flow, status, payload, type",
};

export const dbSchemaV2 = {
  sessions: "&conversationID, type, lastMessage.lastTime, lastMessage.messageForShow",
};

// Define a local DB
export class BrowserDB extends Dexie {
  constructor() {
    super("PURE_CHAT_DB");
    this.version(1).stores(dbSchemaV1);
    this.version(2).stores(dbSchemaV2);

    this.messages = this.table("messages");
    this.sessions = this.table("sessions");
  }
}

export const browserDB = new BrowserDB();

// 添加
// browserDB.messages.add();
// 删除
// browserDB.messages.delete();
// 更新
// browserDB.messages.put();
// 查询
// const data = await browserDB.messages.toArray();
