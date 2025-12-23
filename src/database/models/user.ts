// import { AgentConfig } from '@/types/agent';
import { BaseModel } from "../core/model"
import { DB_Settings, DB_User, DB_UserSchema } from "../schemas/user"
import { uuid } from "@/utils/uuid"

import type { PartialDeep } from "type-fest"

class _UserModel extends BaseModel {
  constructor() {
    super("users", DB_UserSchema)
  }
  // **************** Query *************** //

  getUser = async (): Promise<DB_User & { id: number }> => {
    const noUser = !(await this.table.count())

    if (noUser) await this.table.put({ uuid: uuid() })

    const list = (await this.table.toArray()) as (DB_User & { id: number })[]

    return list[0]
  }

  getAgentConfig = async () => {
    const user = await this.getUser()

    return user.settings?.defaultAgent?.config
  }
  // **************** Create *************** //

  create = async (user: DB_User) => {
    return this.table.put(user)
  }

  // **************** Delete *************** //

  clear() {
    return this.table.clear()
  }

  // **************** Update *************** //

  async updateSettings(settings: PartialDeep<DB_Settings>) {
    const user = await this.getUser()

    return this.update(user.id, { settings: settings as any })
  }

  async resetSettings() {
    const user = await this.getUser()

    return this.update(user.id, { avatar: undefined, settings: undefined })
  }

  async updateAvatar(avatar: string) {
    const user = await this.getUser()

    return this.update(user.id, { avatar })
  }

  // **************** Helper *************** //

  private update = async (id: number, value: PartialDeep<DB_User>) => {
    return this.table.update(id, value)
  }
}

export const UserModel = new _UserModel()
