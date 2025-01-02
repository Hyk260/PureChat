import Dexie from 'dexie';
import { uuid } from '@/utils/uuid';

export const dbSchemaV1 = {
  messages: '&id, name, fileType, saveMode',
};

// Define a local DB
export class BrowserDB extends Dexie {
  constructor() {
    super("PURE_CHAT_DB");
    this.version(1).stores(dbSchemaV1);

    this.messages = this.table('messages')
  }

}

export const browserDB = new BrowserDB();

console.log('browserDB', browserDB);