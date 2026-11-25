import { defineConfig } from '@playwright/test'
import { resolve } from 'node:path'

process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve('node_modules/.cache/ms-playwright')

export default defineConfig({
  testDir: './tests', fullyParallel: false, workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:5173', browserName: 'chromium', headless: true, trace: 'retain-on-failure' },
  webServer: { command: 'npm.cmd run dev', url: 'http://127.0.0.1:5173', reuseExistingServer: !process.env.CI },
})
