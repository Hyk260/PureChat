import { isEmpty } from "lodash-es"

import { REFERENCE_PROMPT } from "@/config/prompts"
import { WebSearchProviderResult } from "@/service/WebSearchProvider/types"
import WebSearchService from "@/service/WebSearchService"
import { useChatStore } from "@/stores"
import { useWebSearchStore } from "@/stores/modules/websearch"

import type { DB_Message } from "@/database/schemas/message"
import type { LLMMessage } from "@/ai/types"

export function mapWebSearchResults(results: WebSearchProviderResult[]) {
  return results.map((t, i) => ({
    id: i + 1,
    content: t.content,
    sourceUrl: t.url,
    type: "url",
  }))
}

export async function getWebSearchReferences(message: { content: string }) {
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

export async function generateReferencePrompt(data: DB_Message, message: { content: string }) {
  let webSearchJson = ""
  const webSearchReferences = await getWebSearchReferences(message)

  if (!isEmpty(webSearchReferences)) {
    const referenceContent = `\`\`\`json\n${JSON.stringify(webSearchReferences, null, 2)}\n\`\`\``

    webSearchJson = REFERENCE_PROMPT.replace("{question}", message.content).replace("{references}", referenceContent)
  }

  if (webSearchJson) {
    useChatStore().modifiedMessages({
      ...data,
      cloudCustomData: JSON.stringify({
        webSearch: {
          messageAbstract: webSearchJson,
        },
      }),
    })

    return webSearchReferences
  } else {
    return null
  }
}
