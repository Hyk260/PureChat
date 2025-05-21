import Dexie from "dexie";

export const dbSchemaV1 = {
  messages: "&ID, conversationID, conversationType, time, clientTime, createdAt, updatedAt, status, type",
};

export const dbSchemaV2 = {
  sessions: "&conversationID, createdAt, updatedAt, type, pinned",
};

export const dbSchemaV3 = {
  files: 'id, name, origin_name, path, size, ext, type, created_at, count'
};

// https://dexie.org/
// Define a local DB
export class BrowserDB extends Dexie {
  constructor() {
    super("PURE_CHAT_DB");
    this.version(1).stores(dbSchemaV1);
    this.version(2).stores(dbSchemaV2);
    this.version(3).stores(dbSchemaV3);

    this.messages = this.table("messages");
    this.sessions = this.table("sessions");
    this.files = this.table("files");
  }
}

export const browserDB = new BrowserDB();
