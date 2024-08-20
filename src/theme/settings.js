import storage from "@/utils/localforage/index";

/** Default theme settings */
export const themeSettings = {
  themeScheme: 'auto', // ['light', 'dark', 'auto']
};

const DARK_CLASS = 'dark';

/** Init theme settings */
export function initThemeSettings() {

  const settings = storage.get('themeSettings') || themeSettings.themeScheme;

  return settings;
}

export function localStgThemeScheme(theme) {
  storage.set('themeSettings', theme)
}