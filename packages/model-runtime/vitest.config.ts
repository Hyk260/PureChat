import { resolve } from "node:path"
import { coverageConfigDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    alias: {
      "@": resolve(__dirname, "../../src"),
    },
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, "**/types/**", "**/type.ts", "**/utils/index.ts"],
      reporter: ["text", "json", "lcov", "text-summary"],
    },
    environment: "happy-dom",
  },
})
