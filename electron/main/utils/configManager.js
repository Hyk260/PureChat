import { app } from 'electron'
import Store from 'electron-store'

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
  auto: 'auto'
}

export class ConfigManager {
  store = null
  // subscribers = new Map()
  constructor() {
    this.store = new Store()
  }

  getTheme() {
    return this.store.get('theme', ThemeMode.light)
  }

  setTheme(theme) {
    this.store.set('theme', theme)
  }

  getTray() {
    return !!this.store.get('tray', true)
  }

  setTray(value) {
    this.store.set('tray', value)
  }

  set(key, value) {
    this.store.set(key, value)
  }

  get(key) {
    return this.store.get(key)
  }
}

export const configManager = new ConfigManager()
