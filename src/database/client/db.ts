import Dexie from "dexie"

import { dbSchemaV1, dbSchemaV2, dbSchemaV3, dbSchemaV4, dbSchemaV5 } from "./schemas"

import type { BrowserDBTable } from "../types/db"

// https://dexie.org/
// Define a local DB
export class BrowserDB extends Dexie {
  public files: BrowserDBTable<"files">
  public sessions: BrowserDBTable<"sessions">
  public messages: BrowserDBTable<"messages">
  public topics: BrowserDBTable<"topics">
  public users: BrowserDBTable<"users">

  constructor() {
    super("PURE_CHAT_DB")
    this.version(1).stores(dbSchemaV1)
    this.version(2).stores(dbSchemaV2)
    this.version(3).stores(dbSchemaV3)
    this.version(4).stores(dbSchemaV4)
    this.version(5).stores(dbSchemaV5)

    this.messages = this.table("messages")
    this.sessions = this.table("sessions")
    this.topics = this.table("topics")
    this.files = this.table("files")
    this.users = this.table("users")
  }
}

export const browserDB = new BrowserDB()
