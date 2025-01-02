import Dexie from "dexie";
import { uuid } from "@/utils/uuid";

export const dbSchemaV1 = {
  messages: "&ID, conversationID, conversationType, time, nick, flow, status, payload, type",
};

// Define a local DB
export class BrowserDB extends Dexie {
  constructor() {
    super("PURE_CHAT_DB");
    this.version(1).stores(dbSchemaV1);

    this.messages = this.table("messages");
  }
}

export const browserDB = new BrowserDB();

// console.log("browserDB", browserDB.messages);

// browserDB.messages.add({
// // id: uuid(),
// name: "test",
// fileType: "text",
// saveMode: "auto",
// asdf: "test",
// });

// browserDB.messages.delete('fb442477-1f7a-4af6-a690-ef51b1788501');

// browserDB.messages.put({
//   id: "0162d083-5979-410f-9202-d745c57d3bbd",
//   name: "1213",
//   fileType: "text",
//   saveMode: "auto",
//   asdf: "test",
// });

// .equals("test").toArray();
// const data = await browserDB.messages.toArray();
// console.log("data", data);