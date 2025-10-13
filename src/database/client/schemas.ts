export const dbSchemaV1 = {
  messages: "&ID, conversationID, conversationType, time, clientTime, createdAt, updatedAt, status, type",
}

export const dbSchemaV2 = {
  sessions: "&conversationID, createdAt, updatedAt, type, pinned",
}

export const dbSchemaV3 = {
  files: "id, name, origin_name, path, size, ext, type, created_at, count",
}

export const dbSchemaV4 = {
  users: "++id, uuid",
}
