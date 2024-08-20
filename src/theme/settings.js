import { localStg } from "@/utils/storage";

/** Default theme settings */
export const themeSettings = {
  themeScheme: 'auto', // ['light', 'dark', 'auto']
};

const DARK_CLASS = 'dark';

/** Init theme settings */
export function initThemeSettings() {

  const settings = localStg.get('themeSettings') || themeSettings.themeScheme;

  return settings;
}

export function localStgThemeScheme(theme) {
  localStg.set('themeSettings', theme)
}