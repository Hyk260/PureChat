// 初始数据库架构，包含`messages`表
export const dbSchemaV1 = {
  messages:
    "&ID, conversationID, conversationType, time, clientTime, createdAt, updatedAt, status, type, topicId, sessionId, [sessionId+topicId]",
}

// 添加了`sessions`表
export const dbSchemaV2 = {
  sessions: "&conversationID, createdAt, updatedAt, type, pinned, topicId",
}

// 添加了`files`表
export const dbSchemaV3 = {
  files: "id, name, origin_name, path, size, ext, type, created_at, count",
}

// 添加了`users`表
export const dbSchemaV4 = {
  users: "++id, uuid",
}

// 添加了`topics`表
export const dbSchemaV5 = {
  topics: "&id, title, favorite, createdAt, updatedAt, sessionId",
}
