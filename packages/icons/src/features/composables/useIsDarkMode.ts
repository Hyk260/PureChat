import { computed } from "vue"
import { useThemeStore } from "@/stores/modules/theme"
import { usePreferredColorScheme } from "@vueuse/core"

export function useIsDarkMode() {
  const themeStore = useThemeStore()
  const osTheme = usePreferredColorScheme()

  const isDarkMode = computed(() => {
    return themeStore.themeScheme === "auto" ? osTheme.value === "dark" : themeStore.themeScheme === "dark"
  })

  return isDarkMode
}
