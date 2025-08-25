import { isEmpty } from "lodash-es"

import WebSearchService from "@/service/WebSearchService"
import { useWebSearchStore } from "@/stores/index"
import { localStg } from "@/utils/storage"

export const REFERENCE_PROMPT = `Please answer the question based on the reference materials

## Citation Rules:
- Please cite the context at the end of sentences when appropriate.
- Please use the format of citation number [^number] to reference the context in corresponding parts of your answer.
- If a sentence comes from multiple contexts, please list all relevant citation numbers, e.g., [^1][^2]. Remember not to group citations at the end but list them in the corresponding parts of your answer.

## My question is:

{question}

## Reference Materials:

{references}

Please respond in the same language as the user's question.
`

export function mapWebSearchResults(results) {
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
