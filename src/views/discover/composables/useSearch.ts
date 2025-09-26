import { ref, watch } from "vue"

import { debounce } from "lodash-es"

interface SearchOptions {
  debounceMs?: number
  minLength?: number
}

export function useSearch<T>(searchFn: (query: string) => Promise<T[]> | T[], options: SearchOptions = {}) {
  const { debounceMs = 300, minLength = 1 } = options

  const query = ref("")
  const results = ref<T[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (searchQuery.length < minLength) {
      results.value = []
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const searchResults = await searchFn(searchQuery)
      results.value = searchResults
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Search failed"
      results.value = []
    } finally {
      isLoading.value = false
    }
  }, debounceMs)

  watch(query, debouncedSearch, { immediate: false })

  const clearSearch = () => {
    query.value = ""
    results.value = []
    error.value = null
  }

  return {
    query,
    results,
    isLoading,
    error,
    clearSearch,
  }
}
