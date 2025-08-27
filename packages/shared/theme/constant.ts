export enum ThemeMode {
  light = 'light',
  dark = 'dark',
  auto = "auto"
}

export type ThemeModeKey = keyof typeof ThemeMode