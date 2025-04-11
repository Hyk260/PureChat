import Dexie from "dexie";
import { uuid } from "@/utils/uuid";

export const dbSchemaV1 = {
  messages:
    "&ID, conversationID, conversationType, time, clientTime, createdAt, updatedAt, status, type",
};

export const dbSchemaV2 = {
  sessions: "&conversationID, createdAt, updatedAt, type, pinned",
};

// https://dexie.org/
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
