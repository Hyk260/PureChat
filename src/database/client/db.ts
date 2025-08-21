import Dexie from "dexie";

import { dbSchemaV1, dbSchemaV2, dbSchemaV3 } from "./schemas";

import type { BrowserDBTable } from "../types/db";

// https://dexie.org/
// Define a local DB
export class BrowserDB extends Dexie {
  public files: BrowserDBTable<"files">;
  public sessions: BrowserDBTable<"sessions">;
  public messages: BrowserDBTable<"messages">;

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
