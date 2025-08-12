import Dexie from 'dexie';
import { z } from 'zod';
import { DB_File } from '../schemas/files';
import { DB_Message } from '../schemas/message';
import { DB_Session } from '../schemas/session';

export type DBModel<T> = T & {
  id: string;
  createdAt: number;
  updatedAt: number;
};

export const DBBaseFieldsSchema = z.object({
  id: z.string(),
  createdAt: z.number().or(z.string()),
  updatedAt: z.number().or(z.string()),
});

export interface DBSchemaMap {
  files: DB_File;
  messages: DB_Message;
  sessions: DB_Session;
}

export type BrowserDBSchema = {
  [t in keyof DBSchemaMap]: {
    model: DBSchemaMap[t];
    table: Dexie.Table<DBModel<DBSchemaMap[t]>, string>;
  };
};

export type BrowserDBTable<T extends keyof DBSchemaMap> = BrowserDBSchema[T]['table'];

