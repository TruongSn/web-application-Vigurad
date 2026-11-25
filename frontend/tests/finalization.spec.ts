import { test, expect } from '@playwright/test'
import { mkdir, writeFile, readdir, readFile } from 'node:fs/promises'

test('Home interaction, repeated navigation cleanup, screenshots and recording', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, recordVideo: { dir: 'test-results/finalization/raw-video' } })
  const page = await context.newPage(); const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  page.on('console', e => { if (e.type() === 'error') errors.push(e.text()) })
  await page.addInitScript(() => {
    const pending = new Set<number>(); const request = requestAnimationFrame.bind(window); const cancel = cancelAnimationFrame.bind(window)
    window.requestAnimationFrame = callback => { const id = request(time => { pending.delete(id); callback(time) }); pending.add(id); return id }
    window.cancelAnimationFrame = id => { pending.delete(id); cancel(id) }
    Object.assign(window, { pendingRafs: pending })
  })
  await page.goto('/'); const art = page.getByTestId('hero-art')
  await expect(art).toHaveAttribute('data-scene-state', 'running')
  const rect = (await art.boundingBox())!
  await page.mouse.move(rect.x + rect.width * .85, rect.y + rect.height * .6, { steps: 30 })
  await expect.poll(() => art.evaluate(n => parseFloat(getComputedStyle(n).getPropertyValue('--scene-x')))).toBeGreaterThan(4)
  await page.getByRole('button', { name: 'Tạm dừng chuyển động' }).click()
  const image = await page.locator('canvas').evaluate(c => (c as HTMLCanvasElement).toDataURL())
  await page.waitForTimeout(150)
  expect(await page.locator('canvas').evaluate(c => (c as HTMLCanvasElement).toDataURL())).toBe(image)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'test-results/finalization/home-desktop.png', fullPage: true })
  for (let i = 0; i < 6; i++) {
    await page.getByRole('link', { name: 'Scanner', exact: true }).click()
    await expect(page.locator('main')).toBeFocused()
    await expect(page.getByTestId('hero-art')).toHaveCount(0)
    await expect.poll(() => page.evaluate(() => (window as unknown as { pendingRafs: Set<number> }).pendingRafs.size)).toBeLessThanOrEqual(1)
    await page.getByRole('link', { name: 'Home', exact: true }).click()
    await expect(art).toHaveAttribute('data-scene-state', 'running')
  }
  await page.goBack(); await expect(page).toHaveURL(/scanner$/)
  await page.goForward(); await expect(page.locator('h1')).toContainText('Đọc kỹ hơn.')
  await page.goto('/__motion')
  await page.getByTestId('motion-studies').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'Giới hạn của bản minh họa' }).click()
  await page.getByTestId('motion-studies').screenshot({ path: 'test-results/finalization/playground.png' })
  expect(errors).toEqual([])
  const video = page.video()!; await context.close(); await video.saveAs('test-results/finalization/interaction.webm')
})

test('disclosure, tab state and reduced motion remain keyboard accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/__motion')
  const trigger = page.getByRole('button', { name: 'Giới hạn của bản minh họa' })
  await trigger.focus(); await page.keyboard.press('Enter')
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Đến câu chuyện cuộn' })).toBeFocused()
  await trigger.focus(); await page.keyboard.press('Enter')
  await expect(page.locator('.motion-disclosure [inert]')).toHaveAttribute('aria-hidden', 'true')
  await page.getByLabel('Ghi chú mẫu Quick').fill('Giữ ngữ cảnh mẫu')
  const quick = page.getByRole('tab', { name: 'Quick' }); await quick.focus()
  await page.keyboard.press('End'); await expect(page.getByRole('tab', { name: 'Compare' })).toBeFocused()
  await expect(page.locator('.tab-indicator')).toHaveCount(1)
  await page.keyboard.press('Home'); await expect(quick).toBeFocused()
  await expect(page.getByLabel('Ghi chú mẫu Quick')).toHaveValue('Giữ ngữ cảnh mẫu')
  for (const n of await page.locator('[data-motion="text"], [data-motion="page"]').all()) await expect(n).toHaveCSS('transform', 'none')
  await page.goto('/'); await expect(page.getByTestId('hero-art')).toHaveAttribute('data-scene-state', 'static')
})

test('mobile and high DPR Canvas resize stay bounded and provide touch fallback', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 })
  const page = await context.newPage(); await page.goto('/')
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-scene-state', 'static')
  await page.evaluate(() => document.fonts.ready)
  for (const width of [390, 768, 375]) {
    await page.setViewportSize({ width, height: 844 })
    await expect.poll(() => page.locator('canvas').evaluate(c => Math.abs((c as HTMLCanvasElement).width - Math.round(c.getBoundingClientRect().width * 1.5)))) .toBeLessThanOrEqual(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if (width === 390) await page.screenshot({ path: 'test-results/finalization/home-mobile.png', fullPage: true })
  }
  await page.locator('.prototype-cta').tap(); await expect(page).toHaveURL(/scanner$/)
  await context.close()
})

test('production includes selected Signal Field and excludes comparison and B/C', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/')
  await expect(page.locator('h1')).toContainText('Đọc kỹ hơn.')
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-kind', 'signal')
  await page.goto('http://127.0.0.1:4173/__motion')
  await expect(page.getByTestId('hero-comparison')).toHaveCount(0)
  const files = (await readdir('dist/assets')).filter(f => /\.(js|css)$/.test(f))
  for (const file of files) {
    const content = await readFile(`dist/assets/${file}`, 'utf8')
    for (const marker of ['Evidence Constellation', 'Liquid Intelligence', 'constellation-map', 'liquid-contour', 'hero-selector', 'Three ways to see deeper.']) expect(content).not.toContain(marker)
  }
})

test('measure selected Canvas draw CPU time under a local pointer sweep', async ({ page }) => {
  await page.addInitScript(() => {
    const times: number[] = []; let start = 0
    const clear = CanvasRenderingContext2D.prototype.clearRect; const stroke = CanvasRenderingContext2D.prototype.stroke
    CanvasRenderingContext2D.prototype.clearRect = function(...args) { if (this.canvas.classList.contains('signal-canvas')) start = performance.now(); return clear.apply(this, args) }
    CanvasRenderingContext2D.prototype.stroke = function(path?: Path2D) { const result = path ? stroke.call(this, path) : (stroke as () => void).call(this); if (this.canvas.classList.contains('signal-canvas') && start) { times.push(performance.now() - start); start = 0 } return result }
    Object.assign(window, { drawTimes: times })
  })
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto('/')
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-scene-state', 'running')
  const rect = (await page.getByTestId('hero-art').boundingBox())!
  for (let i = 0; i < 5; i++) await page.mouse.move(rect.x + rect.width * (i % 2 ? .15 : .85), rect.y + rect.height * .5, { steps: 25 })
  await expect.poll(() => page.evaluate(() => (window as unknown as { drawTimes: number[] }).drawTimes.length)).toBeGreaterThanOrEqual(90)
  const data = await page.evaluate(() => { const n = (window as unknown as { drawTimes: number[] }).drawTimes.slice(5).sort((a,b) => a-b); return { samples: n.length, medianMs: n[Math.floor(n.length / 2)], p95Ms: n[Math.floor(n.length * .95)], maxMs: n.at(-1), viewport: [innerWidth, innerHeight], dpr: devicePixelRatio } })
  await mkdir('test-results/finalization', { recursive: true })
  await writeFile('test-results/finalization/runtime.json', JSON.stringify({ scope: 'Chromium headless local, Canvas CPU draw only; not FPS, paint/GPU or Web Vitals', ...data }, null, 2))
  console.log('Signal Canvas draw CPU:', data)
})
