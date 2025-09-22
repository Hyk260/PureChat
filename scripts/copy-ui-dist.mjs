import { cp, mkdir, rm, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const from = resolve(root, 'packages/ui/dist')
const to = resolve(root, 'public/purechat-ui')

async function exists(p) {
  try { await stat(p); return true } catch { return false }
}

async function main() {
  if (await exists(to)) {
    await rm(to, { recursive: true, force: true })
  }
  await mkdir(to, { recursive: true })
  await cp(from, to, { recursive: true })
  console.log(`[copy-ui-dist] copied ${from} -> ${to}`)
}

main().catch((err) => {
  console.error('[copy-ui-dist] failed:', err)
  process.exit(1)
})


