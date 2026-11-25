import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'
import { dirname, resolve } from 'node:path'

const require = createRequire(import.meta.url)
const manifestPath = require.resolve('playwright/package.json')
const cli = resolve(dirname(manifestPath), require(manifestPath).bin.playwright)
const result = spawnSync(process.execPath, [cli, 'install', 'chromium'], {
  stdio: 'inherit',
  env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: fileURLToPath(new URL('../node_modules/.cache/ms-playwright', import.meta.url)) },
})
if (result.error) throw result.error
process.exitCode = result.status ?? 1
