import { isEmpty } from "lodash-es"

import { REFERENCE_PROMPT } from "@/config/prompts"
import { WebSearchProviderResult } from "@/service/WebSearchProvider/types"
import WebSearchService from "@/service/WebSearchService"
import { useWebSearchStore } from "@/stores/modules/websearch"
import { localStg } from "@/utils/storage"

export function mapWebSearchResults(results: WebSearchProviderResult[]) {
  return results.map((t, i) => ({
    id: i + 1,
    content: t.content,
    sourceUrl: t.url,
    type: "url",
  }))
}

export async function getWebSearchReferences(message) {
  if (isEmpty(message.content)) {
    return []
  }

  const provider = useWebSearchStore().defaultProvider
  const references = await WebSearchService.search(provider, message.content)

  const webSearch = references

  if (webSearch) {
    return mapWebSearchResults(webSearch.results)
  }

  return []
}

export async function generateReferencePrompt(message) {
  const webSearchReferences = await getWebSearchReferences(message)

  localStg.set("webSearchReferences", webSearchReferences)

  if (!isEmpty(webSearchReferences)) {
    const referenceContent = `\`\`\`json\n${JSON.stringify(webSearchReferences, null, 2)}\n\`\`\``

    return REFERENCE_PROMPT.replace("{question}", message.content).replace("{references}", referenceContent)
  }

  return null
}
