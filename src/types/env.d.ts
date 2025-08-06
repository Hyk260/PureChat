/// <reference types="vite/client" />

declare global {
  const __LOCAL_MODE__: boolean
  const __IS_ELECTRON__: boolean
  const __APP_INFO__: {
    name: string
    version: string
    description: string
  }
} 