import { computed, ref } from "vue"

interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

export function useCache<T>(defaultTtl = 5 * 60 * 1000) {
  const cache = ref<Map<string, CacheItem<T>>>(new Map())

  const set = (key: string, data: T, ttl = defaultTtl) => {
    cache.value.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  const get = (key: string): T | null => {
    const item = cache.value.get(key)
    if (!item) return null

    const isExpired = Date.now() - item.timestamp > item.ttl
    if (isExpired) {
      cache.value.delete(key)
      return null
    }

    return item.data
  }

  const has = (key: string): boolean => {
    return get(key) !== null
  }

  const clear = () => {
    cache.value.clear()
  }

  const remove = (key: string) => {
    cache.value.delete(key)
  }

  const size = computed(() => cache.value.size)

  return {
    set,
    get,
    has,
    clear,
    remove,
    size,
  }
}
