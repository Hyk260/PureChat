import { isRobot, getModelType } from "./agent"

// Bulk-import all avatar assets from @pure/icons-static-avatar by file name
// The webp filenames correspond to ModelProvider enum values (e.g. "openai", "anthropic")
const avatarModules = import.meta.glob<string>("../../static-avatar/avatars/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
})

const PROVIDER_AVATAR_URLS: Record<string, string> = {}

for (const [filePath, url] of Object.entries(avatarModules)) {
  const provider = filePath.split("/").pop()?.replace(".webp", "")
  if (provider) {
    PROVIDER_AVATAR_URLS[provider] = url
  }
}

export function getAiAvatarUrl(id?: string): string {
  if (!id || !isRobot(id)) return ""

  const provider = getModelType(id)
  if (!provider) return ""

  return PROVIDER_AVATAR_URLS[provider] || ""
}
