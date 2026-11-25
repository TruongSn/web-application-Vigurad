import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

const concepts = [
  { kind: 'signal', name: 'Signal Field', letter: 'A' },
  { kind: 'constellation', name: 'Evidence Constellation', letter: 'B' },
  { kind: 'liquid', name: 'Liquid Intelligence', letter: 'C' },
]

async function openComparison(page: Page) {
  await page.goto('/__motion')
  await expect(page.getByRole('heading', { name: 'Three ways to see deeper.' })).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
}

async function selectConcept(page: Page, concept: typeof concepts[number]) {
  await page.getByRole('radio', { name: new RegExp(concept.name) }).check()
  const artwork = page.locator(`[data-testid="hero-art"][data-kind="${concept.kind}"]`)
  await expect(artwork).toBeVisible()
  await expect(page.getByTestId('hero-art')).toHaveCount(1)
  return artwork
}

test('three distinct artworks share copy, respond to pointer, and keep CTA usable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await openComparison(page)
  const copy = await page.locator('.prototype-copy').innerText()
  for (const concept of concepts) {
    const art = await selectConcept(page, concept)
    await art.scrollIntoViewIfNeeded()
    await expect(art).toHaveAttribute('data-scene-state', 'running')
    expect(await page.locator('.prototype-copy').innerText()).toBe(copy)
    const bounds = (await art.boundingBox())!
    await page.mouse.move(bounds.x + bounds.width * .85, bounds.y + bounds.height * .65, { steps: 12 })
    await expect.poll(() => art.evaluate(node => parseFloat(getComputedStyle(node).getPropertyValue('--scene-x')))).toBeGreaterThan(4)
    await page.mouse.move(0, 0)
    await expect.poll(() => art.evaluate(node => Math.abs(parseFloat(getComputedStyle(node).getPropertyValue('--scene-x'))))).toBeLessThan(.2)
    await expect(page.locator('.prototype-cta')).toBeVisible()
  }
  await page.getByRole('button', { name: 'Phát lại entrance' }).click()
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-kind', 'liquid')
  await page.locator('.prototype-cta').click()
  await expect(page).toHaveURL(/\/scanner$/)
  await expect(page.getByText('Placeholder — chưa triển khai')).toBeVisible()
  expect(errors).toEqual([])
})

test('all concepts capture desktop/mobile evidence and preserve layout at intermediate widths', async ({ page }) => {
  for (const width of [1440, 390, 375, 768]) {
    await page.setViewportSize({ width, height: 1080 })
    await openComparison(page)
    await page.getByRole('button', { name: 'Tạm dừng chuyển động' }).click()
    for (const concept of concepts) {
      const art = await selectConcept(page, concept)
      await expect(art).toHaveAttribute('data-scene-state', 'paused')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      await expect(page.locator('.prototype-cta')).toBeVisible()
      if (width === 1440 || width === 390) {
        await page.getByTestId('hero-stage').screenshot({ path: `test-results/hero-review/${concept.letter}-${width}.png` })
      }
    }
  }
})

test('native radio selection, focus, replay and pause work with the keyboard', async ({ page }) => {
  await openComparison(page)
  const first = page.getByRole('radio', { name: /Signal Field/ })
  await first.focus()
  const outline = await first.evaluate(node => getComputedStyle(node.nextElementSibling!).outlineWidth)
  expect(outline).toBe('3px')
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('radio', { name: /Evidence Constellation/ })).toBeChecked()
  await expect(page.getByRole('radio', { name: /Evidence Constellation/ })).toBeFocused()
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-kind', 'constellation')
  await page.getByRole('button', { name: 'Tạm dừng chuyển động' }).focus()
  await page.keyboard.press('Space')
  await expect(page.getByRole('button', { name: 'Tiếp tục chuyển động' })).toBeFocused()
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-scene-state', 'paused')
  await page.getByRole('button', { name: 'Phát lại entrance' }).click()
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-scene-state', 'paused')
})

test('reduced motion renders meaningful static art and ignores pointer motion for every concept', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openComparison(page)
  for (const concept of concepts) {
    const art = await selectConcept(page, concept)
    await expect(art).toHaveAttribute('data-scene-state', 'static')
    await expect(page.locator('.prototype-headline')).toHaveCSS('opacity', '1')
    await expect(page.locator('.prototype-headline')).toHaveCSS('transform', 'none')
    await art.hover()
    expect(await art.evaluate(node => getComputedStyle(node).getPropertyValue('--scene-x'))).toBe('0.000px')
    await expect(page.locator('.prototype-cta')).toBeVisible()
  }
})

test('touch uses static artwork, allows selection and never prevents page scrolling', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const page = await context.newPage()
  await openComparison(page)
  for (const concept of concepts) {
    await page.getByRole('radio', { name: new RegExp(concept.name) }).tap()
    await expect(page.locator(`[data-kind="${concept.kind}"]`)).toHaveAttribute('data-scene-state', 'static')
  }
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.hero-art')!).touchAction)).toBe('auto')
  await page.locator('.prototype-cta').tap()
  await expect(page).toHaveURL(/\/scanner$/)
  await context.close()
})

test('pause, offscreen and simulated hidden state stop the scene; switching does not accumulate RAF work', async ({ page }) => {
  await page.addInitScript(() => {
    const pending = new Set<number>()
    const request = window.requestAnimationFrame.bind(window)
    const cancel = window.cancelAnimationFrame.bind(window)
    window.requestAnimationFrame = callback => {
      const id = request(time => { pending.delete(id); callback(time) })
      pending.add(id); return id
    }
    window.cancelAnimationFrame = id => { pending.delete(id); cancel(id) }
    Object.assign(window, { pendingRafs: pending })
  })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await openComparison(page)
  for (let i = 0; i < 9; i++) await selectConcept(page, concepts[i % 3])
  const art = page.getByTestId('hero-art')
  await art.scrollIntoViewIfNeeded()
  await expect(art).toHaveAttribute('data-scene-state', 'running')
  await expect.poll(() => page.evaluate(() => (window as unknown as { pendingRafs: Set<number> }).pendingRafs.size)).toBeLessThanOrEqual(3)
  await page.getByRole('button', { name: 'Tạm dừng chuyển động' }).click()
  await expect(art).toHaveAttribute('data-scene-state', 'paused')
  await expect.poll(() => page.evaluate(() => (window as unknown as { pendingRafs: Set<number> }).pendingRafs.size)).toBeLessThanOrEqual(1)
  const frozen = await art.innerHTML()
  await page.waitForTimeout(180) // prove paused SVG geometry stays still across multiple frames
  expect(await art.innerHTML()).toBe(frozen)
  await page.getByRole('button', { name: 'Tiếp tục chuyển động' }).click()
  await art.scrollIntoViewIfNeeded()
  await expect(art).toHaveAttribute('data-scene-state', 'running')
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { value: true, configurable: true }); document.dispatchEvent(new Event('visibilitychange')) })
  await expect(art).toHaveAttribute('data-scene-state', 'hidden')
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { value: false, configurable: true }); document.dispatchEvent(new Event('visibilitychange')) })
  await page.getByRole('heading', { name: 'Palette A / token ledger' }).scrollIntoViewIfNeeded()
  await expect(art).toHaveAttribute('data-scene-state', 'offscreen')
  await page.getByRole('link', { name: 'Scanner', exact: true }).click()
  await expect(page.getByTestId('hero-art')).toHaveCount(0)
  await expect.poll(() => page.evaluate(() => (window as unknown as { pendingRafs: Set<number> }).pendingRafs.size)).toBeLessThanOrEqual(1)
})

test('record pointer interaction and concept switching using existing Playwright video support', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, recordVideo: { dir: 'test-results/hero-review/raw-video', size: { width: 1440, height: 1000 } } })
  const page = await context.newPage()
  await openComparison(page)
  for (const concept of concepts) {
    const art = await selectConcept(page, concept)
    await art.scrollIntoViewIfNeeded()
    const rect = (await art.boundingBox())!
    await page.mouse.move(rect.x + rect.width * .15, rect.y + rect.height * .3, { steps: 18 })
    await page.mouse.move(rect.x + rect.width * .85, rect.y + rect.height * .7, { steps: 36 })
    await expect.poll(() => art.evaluate(node => parseFloat(getComputedStyle(node).getPropertyValue('--scene-x')))).toBeGreaterThan(4)
    await page.waitForTimeout(650) // intentional short dwell for review recording
  }
  const video = page.video()!
  await context.close()
  await video.saveAs('test-results/hero-review/interaction.webm')
})
