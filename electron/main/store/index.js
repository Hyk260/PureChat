import Store from 'electron-store'
import path from 'path'
import os from 'os'

const customPath = path.join(os.homedir(), '.HikEMAS', 'HikEMAS_AppSettings.json')

class StoreUtil {
  constructor(configName = 'appSettings', defaults = {}, encryptionKey = null) {
    this.store = new Store({
      name: configName,
      encryptionKey, // 可选，提供一个密钥用于加密存储
      defaults,
      cwd: path.dirname(customPath), // 设置当前工作目录
      configName: path.basename(customPath), // 设置配置文件名
    })

    // 初始化默认值，确保所有默认设置已写入存储
    for (const key in defaults) {
      if (!this.store.has(key)) {
        this.set(key, defaults[key])
      }
    }
  }

  // 设置值，支持自动处理特殊类型如Date
  set(key, value) {
    if (value instanceof Date) {
      value = value.toISOString()
    }
    return this.store.set(key, value)
  }

  // 获取值，支持类型转换和默认值
  get(key, defaultValue = null) {
    const rawValue = this.store.get(key)
    if (rawValue === undefined && defaultValue !== null) {
      return defaultValue
    }

    try {
      if (
        typeof defaultValue === 'string' &&
        defaultValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/)
      ) {
        return new Date(rawValue)
      }
    } catch (error) {
      console.error(`Error converting value for key ${key}:`, error)
    }

    return rawValue
  }

  // 删除键值对
  delete(key) {
    return this.store.delete(key)
  }

  // 清空所有存储
  clear() {
    return this.store.clear()
  }

  // 检查是否存在某个键
  has(key) {
    return this.store.has(key)
  }
}

export { StoreUtil }

