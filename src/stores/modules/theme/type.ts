import type { ThemeModeKey } from "@/theme/settings"

export interface ThemeState {
  themeScheme: ThemeModeKey
  fontTheme: string
  fontThemeList: { label: string; value: string }[]
  page: {
    animate: boolean
    animateMode: string
  }
}
