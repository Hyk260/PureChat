import { browserDB } from "../client/db"

import type { BrowserDB } from "../client/db"
import type { BrowserDBSchema } from "../types/db"
import type { ZodObject } from "zod"
import type Dexie from "dexie"

export class BaseModel<N extends keyof BrowserDBSchema = any, T = BrowserDBSchema[N]["table"]> {
  protected readonly db: BrowserDB
  private readonly schema: ZodObject<any>
  private readonly _tableName: keyof BrowserDBSchema

  constructor(table: N, schema: ZodObject<any>, db = browserDB) {
    this.db = db
    this.schema = schema
    this._tableName = table
  }

  get table() {
    return this.db[this._tableName] as Dexie.Table
  }

  // **************** Create *************** //

  protected async _addWithSync<T = BrowserDBSchema[N]["model"]>(
    id: string | number,
    data: T,
    primaryKey: string = "id"
  ) {
    const result = this.schema.safeParse(data)

    if (!result.success) {
      const errorMsg = `[${this.db.name}][${this._tableName}] Failed to create new record. Error: ${result.error.message}`
      console.warn(errorMsg)
      // const newError = new TypeError(errorMsg)
      // console.error(newError)
      // throw newError
    }

    const tableName = this._tableName

    const record: any = {
      ...data,
      [primaryKey]: id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    const newId = await this.db[tableName].add(record)

    return { id: newId }
  }

  // **************** Delete *************** //

  protected async _deleteWithSync(id: string) {
    const result = await this.table.delete(id)

    return result
  }

  protected async _bulkDeleteWithSync(keys: string[]) {
    await this.table.bulkDelete(keys)
  }

  protected async _clearWithSync() {
    const result = await this.table.clear()

    return result
  }

  // **************** Update *************** //

  protected async _updateWithSync(id: string, data: Partial<T>) {
    const keys = Object.keys(data)
    const partialSchema = this.schema.pick(Object.fromEntries(keys.map((key) => [key, true])))

    const result = partialSchema.safeParse(data)
    if (!result.success) {
      const errorMsg = `[${this.db.name}][${this._tableName}] Failed to update the record:${id}. Error: ${result.error.message}`
      console.warn(errorMsg)
      // const newError = new TypeError(errorMsg)
      // console.error(newError)
      // throw newError
    }

    const success = await this.table.update(id, {
      ...data,
      updatedAt: Date.now(),
    })

    return { success }
  }

  protected async _putWithSync(data: any, id: string) {
    const result = await this.table.put(data, id)

    return result
  }

  protected async _bulkPutWithSync(items: T[]) {
    await this.table.bulkPut(items)
  }
}
