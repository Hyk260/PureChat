import { createStore, del, get, set, clear, type UseStore } from "idb-keyval"

const BROWSER_S3_DB_NAME = "purechat-local-s3"

export class BrowserS3Storage {
  private store: UseStore

  constructor() {
    this.store = createStore(BROWSER_S3_DB_NAME, "objects")
  }

  /**
   * 上传文件
   * @param key 文件 hash
   * @param file File 对象
   */
  putObject = async (key: string, file: File): Promise<void> => {
    try {
      const data = await file.arrayBuffer()
      await set(key, { data, name: file.name, type: file.type }, this.store)
    } catch (e) {
      throw new Error(`Failed to put file ${file.name}: ${(e as Error).message}`)
    }
  }

  /**
   * 获取文件
   * @param key 文件 hash
   * @returns File 对象
   */
  getObject = async (key: string): Promise<File | undefined> => {
    try {
      const res = await get<{ data: ArrayBuffer; name: string; type: string }>(key, this.store)
      if (!res) return

      return new File([res.data], res.name, { type: res?.type })
    } catch (e) {
      throw new Error(`Failed to get object (key=${key}): ${(e as Error).message}`)
    }
  }

  /**
   * 删除文件
   * @param key 文件 hash
   */
  deleteObject = async (key: string): Promise<void> => {
    try {
      await del(key, this.store)
    } catch (e) {
      throw new Error(`Failed to delete object (key=${key}): ${(e as Error).message}`)
    }
  }

  /**
   * 清空所有数据
   */
  clearAll = async (): Promise<void> => {
    try {
      await clear(this.store)
    } catch (e) {
      throw new Error(`Failed to clear all data: ${(e as Error).message}`)
    }
  }
}

export const clientS3Storage = new BrowserS3Storage()

if (import.meta.env.DEV) {
  console.log(
    `%c🗑️ 一键清空 ${BROWSER_S3_DB_NAME} 数据`,
    "color: #ff6b6b; font-size: 16px; font-weight: bold; padding: 8px; background: #fff3cd; border-radius: 4px;"
  )

  // 同时在控制台输出可执行的函数
  ;(window as any).__CLEAR_S3_STORAGE__ = async () => {
    if (confirm(`确定要清空所有 ${BROWSER_S3_DB_NAME} 数据吗？此操作不可恢复！`)) {
      try {
        await clientS3Storage.clearAll()
        console.log("%c✅ 数据已清空", "color: #28a745; font-size: 14px; font-weight: bold;")
        return "数据已成功清空！"
      } catch (error) {
        console.error("%c❌ 清空数据失败:", "color: #dc3545; font-size: 14px; font-weight: bold;", error)
        throw error
      }
    }
    return "操作已取消"
  }

  console.log(
    "%c💡 提示: 在控制台执行 window.__CLEAR_S3_STORAGE__() 来清空数据",
    "color: #17a2b8; font-size: 12px; font-style: italic;"
  )
}
