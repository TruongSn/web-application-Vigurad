import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

async function revealPage(page: Page) {
  for (const section of await page.locator('.home-page > section').all()) {
    await section.scrollIntoViewIfNeeded()
    for (const reveal of await section.locator('[data-motion="reveal"]').all()) {
      await reveal.scrollIntoViewIfNeeded()
      await expect(reveal).toHaveCSS('opacity', '1')
    }
  }
  await page.evaluate(() => scrollTo(0, 0))
}

test('complete Home renders, routes work, and desktop/mobile evidence is captured', async ({ browser }) => {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: width === 390, isMobile: width === 390 })
    const page = await context.newPage(); const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.goto('/'); await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('h1')).toHaveCount(1)
    for (const id of ['problem-title', 'engines-title', 'journey-title', 'research-title', 'conclusion-title']) await expect(page.locator(`#${id}`)).toHaveCount(1)
    await revealPage(page)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if (width === 1440) await page.getByRole('button', { name: 'Tạm dừng chuyển động' }).click()
    await page.screenshot({ path: `test-results/home-review/full-${width}.png`, fullPage: true })
    await page.locator('.production-hero').screenshot({ path: `test-results/home-review/hero-${width}.png` })
    await page.locator('.research-entry').first().click(); await expect(page).toHaveURL(/research$/)
    await expect(page.getByText('Placeholder — chưa triển khai')).toBeVisible()
    await page.goto('/'); await page.getByRole('link', { name: 'Mở Scanner', exact: true }).click(); await expect(page).toHaveURL(/scanner$/)
    await page.goto('/'); await page.locator('.prototype-cta').click(); await expect(page).toHaveURL(/scanner$/)
    expect(errors).toEqual([])
    await context.close()
  }
})

test('mobile navigation supports keyboard, Escape, outside close, resizing and destination focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/')
  const menu = page.getByRole('button', { name: 'Menu', exact: true })
  await menu.focus(); await page.keyboard.press('Enter'); await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Tab'); await expect(page.getByRole('navigation', { name: 'Điều hướng mobile' }).getByRole('link', { name: 'Home', exact: true })).toBeFocused()
  await page.keyboard.press('Escape'); await expect(menu).toBeFocused(); await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click(); await page.locator('.production-hero').click({ position: { x: 8, y: 80 } }); await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click(); await page.setViewportSize({ width: 1024, height: 1000 }); await expect(page.locator('#mobile-navigation')).toBeHidden()
  await expect(page.locator('.mobile-menu-toggle')).toHaveAttribute('aria-expanded', 'false')
  await page.setViewportSize({ width: 390, height: 844 }); await menu.click()
  await page.getByRole('navigation', { name: 'Điều hướng mobile' }).getByRole('link', { name: 'Investigation', exact: true }).click()
  await expect(page).toHaveURL(/investigation$/); await expect(page.locator('main')).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})

test('fictional SMS observations are keyboard controls and never become predictions or active URLs', async ({ page }) => {
  await page.goto('/')
  const group = page.getByRole('group', { name: 'Quan sát tin nhắn minh họa' })
  const linkControl = group.getByRole('button', { name: 'Đường dẫn', exact: true })
  await linkControl.focus(); await page.keyboard.press('Space')
  await expect(linkControl).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.sms-quote mark[data-active="true"]')).toHaveText('taikhoan.example')
  await expect(page.locator('.observation-detail')).toContainText('chỉ dùng cho minh họa')
  await expect(page.locator('a[href*="taikhoan.example"]')).toHaveCount(0)
  await expect(page.locator('.sms-fiction')).toContainText('Không phải dự đoán')
  await expect(page.locator('.research-note')).toContainText('không thay thế kết quả tái lập')
  const ratio = await page.evaluate(() => {
    const lum = (s: string) => { const c = s.match(/[\d.]+/g)!.slice(0,3).map(Number).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4); return c[0]*.2126+c[1]*.7152+c[2]*.0722 }
    return [['.prototype-cta','.prototype-cta'],['.sms-quote mark[data-active="true"]','.sms-quote mark[data-active="true"]'],['.problem-copy > p:not(.home-label)','.home-problem'],['.agent-method > p','.agent-chapter'],['.research-entry p','.home-research']].map(([fg,bg])=> {const values=[lum(getComputedStyle(document.querySelector(fg)!).color),lum(getComputedStyle(document.querySelector(bg)!).backgroundColor)].sort((a,b)=>b-a); return (values[0]+.05)/(values[1]+.05) })
  })
  for (const value of ratio) expect(value).toBeGreaterThanOrEqual(4.5)
})

test('scroll story follows native scrolling and field stops offscreen; reduced motion is static', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto('/')
  const journey = page.locator('.home-journey'); const marker = page.locator('.journey-rail > span')
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-scene-state', 'running')
  const top = await journey.evaluate(n=>n.getBoundingClientRect().top + scrollY)
  await page.evaluate(y=>scrollTo(0,y),top-600)
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-scene-state', 'offscreen')
  const scale = () => marker.evaluate(n => new DOMMatrix(getComputedStyle(n).transform).m22)
  await expect.poll(scale).toBeLessThan(.3)
  await page.evaluate(y=>scrollTo(0,y),top+300)
  await expect.poll(scale).toBeGreaterThan(.8)
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/')
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-scene-state', 'static')
  await expect(page.locator('h1')).toHaveCSS('transform', 'none')
  await expect(page.locator('h1')).toHaveCSS('opacity', '1')
  await expect.poll(scale).toBe(1)
})

test('Canvas unavailable retains SVG artwork and a usable Home', async ({ page }) => {
  await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null })
  await page.goto('/')
  await expect(page.locator('.production-hero .signal-fallback')).toBeVisible()
  await expect(page.locator('.prototype-cta')).toBeVisible()
  await page.locator('.prototype-cta').click(); await expect(page).toHaveURL(/scanner$/)
})

test('record Home pointer, scrolling and editorial interactions', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, recordVideo: { dir: 'test-results/home-review/raw-video', size: { width: 1440, height: 1000 } } })
  const page = await context.newPage(); await page.goto('/')
  await expect(page.getByTestId('hero-art')).toHaveAttribute('data-scene-state', 'running')
  const rect = (await page.getByTestId('hero-art').boundingBox())!
  await page.mouse.move(rect.x+rect.width*.2,rect.y+rect.height*.4,{steps:30})
  await page.mouse.move(rect.x+rect.width*.75,rect.y+rect.height*.65,{steps:45})
  await expect.poll(()=>page.getByTestId('hero-art').evaluate(n=>parseFloat(getComputedStyle(n).getPropertyValue('--scene-x')))).toBeGreaterThan(2)
  for (const section of await page.locator('.home-page > section').all()) {
    const y = await section.evaluate(n=>n.getBoundingClientRect().top+scrollY)
    await page.evaluate(y=>scrollTo({top:y,behavior:'smooth'}),y)
    await page.waitForTimeout(1000) // dwell for the human review recording
    if (await section.locator('.observation-controls').count()) await section.getByRole('button', { name: 'Đường dẫn', exact: true }).click()
  }
  const video = page.video()!; await context.close(); await video.saveAs('test-results/home-review/interaction.webm')
})
