import { test, expect } from '@playwright/test'

test('routes, navigation and local fonts work without runtime errors', async ({ page }) => {
  const errors: string[] = []; const failures: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('response', response => { if (response.status() >= 400) failures.push(response.url()) })
  for (const [route, title] of [['/', 'Đọc kỹ hơn.'], ['/scanner', 'Scanner'], ['/investigation', 'Investigation'], ['/research', 'Research']]) {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: route === '/' ? 1 : 2 }).first()).toContainText(title)
    if (route !== '/') await expect(page.getByText('Placeholder — chưa triển khai')).toBeVisible()
  }
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await expect(page.locator('main')).toBeFocused()
  await page.goto('/__motion')
  await expect(page.getByRole('heading', { name: 'Motion foundation', exact: true })).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
  expect(await page.evaluate(() => ['400 16px "Be Vietnam Pro"', '600 32px "Space Grotesk"', '400 14px "JetBrains Mono"'].every(font => document.fonts.check(font, 'Nguyễn ễ ộ ắ ự')))).toBe(true)
  const loadedFonts = await page.evaluate(() => performance.getEntriesByType('resource').filter(entry => /\.woff2?$/.test(new URL(entry.name).pathname)).map(entry => entry.name))
  expect(loadedFonts.some(url => url.includes('vietnamese'))).toBe(true)
  expect(loadedFonts.every(url => new URL(url).origin === 'http://127.0.0.1:5173')).toBe(true)
  expect(failures).toEqual([]); expect(errors).toEqual([])
})

test('desktop and mobile layouts have no horizontal overflow; capture evidence', async ({ page }) => {
  for (const width of [375, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 960 })
    for (const route of ['/', '/scanner', '/investigation', '/research', '/__motion']) {
      await page.goto(route); await page.evaluate(() => document.fonts.ready)
      await expect(page.locator('h1,h2').first()).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      if ((width === 390 || width === 1440) && (route === '/' || route === '/__motion')) {
        for (const reveal of await page.locator('[data-motion="reveal"]').all()) {
          await reveal.scrollIntoViewIfNeeded(); await expect(reveal).toHaveCSS('opacity', '1')
        }
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.screenshot({ path: `test-results/review/${route === '/' ? 'home' : 'foundation'}-${width}.png`, fullPage: true, animations: 'disabled' })
      }
    }
  }
})

test('keyboard focus, tabs and text entry remain accessible', async ({ page }) => {
  await page.goto('/__motion')
  await expect(page.getByRole('heading', { name: 'Motion foundation', exact: true })).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Đến nội dung chính' })).toBeFocused()
  await page.keyboard.press('Enter'); await expect(page.locator('main')).toBeFocused()
  const quick = page.getByRole('tab', { name: 'Quick' }); await quick.focus()
  const outline = await quick.evaluate(node => ({ style: getComputedStyle(node).outlineStyle, width: getComputedStyle(node).outlineWidth }))
  expect(outline.style).toBe('solid'); expect(outline.width).toBe('3px')
  await page.keyboard.press('ArrowRight'); await expect(page.getByRole('tab', { name: 'Deep' })).toBeFocused()
  await expect(page.getByRole('tab', { name: 'Deep' })).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('End'); await expect(page.getByRole('tab', { name: 'Compare' })).toBeFocused()
  await page.keyboard.press('Home'); await expect(quick).toBeFocused()
  await page.getByLabel('SMS mẫu').fill('Nội dung hư cấu: quyền riêng tư, bằng chứng.')
  await page.getByRole('tab', { name: 'Deep' }).click()
  await expect(page.getByLabel('SMS mẫu')).toHaveValue('Nội dung hư cấu: quyền riêng tư, bằng chứng.')
  await page.getByRole('button', { name: 'Xem lại reveal' }).click()
  await expect(page.getByTestId('reveal-content')).toBeVisible()
})

test('reduced motion shows final states and removes transforms', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/__motion')
  await expect(page.getByTestId('motion-preference')).toContainText('on')
  await expect(page.locator('[data-motion="reveal"]').first()).toHaveAttribute('data-reduced-motion', 'true')
  for (const element of await page.locator('[data-motion="reveal"]').all()) {
    await element.scrollIntoViewIfNeeded()
    await expect(element).toHaveCSS('opacity', '1')
    expect(await element.evaluate(node => getComputedStyle(node).transform)).toBe('none')
  }
  await page.getByRole('button', { name: 'Press feedback' }).hover()
  expect(await page.getByRole('button', { name: 'Press feedback' }).evaluate(node => getComputedStyle(node).transitionDuration)).toBe('0s')
})

test('light and dark controls/text meet token contrast thresholds', async ({ page }) => {
  await page.goto('/__motion')
  await expect(page.getByRole('heading', { name: 'Motion foundation', exact: true })).toBeVisible()
  const checks = await page.evaluate(() => {
    function luminance(value: string) {
      const channels = value.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
      return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722
    }
    function contrast(a: string, b: string) { const values = [luminance(a), luminance(b)].sort((x, y) => y - x); return (values[0] + .05) / (values[1] + .05) }
    return [...document.querySelectorAll('.panel')].flatMap(panel => {
      const background = getComputedStyle(panel).backgroundColor
      const children = [...panel.querySelectorAll('h3,p,label,small,.status')].map(node => ({ pair: node.textContent?.slice(0, 30), ratio: contrast(getComputedStyle(node).color, background), threshold: 4.5 }))
      return [...children, ...[...panel.querySelectorAll('button,input,textarea')].map(node => {
        const css = getComputedStyle(node)
        return { pair: node.tagName, ratio: contrast(css.color, css.backgroundColor), threshold: 4.5 }
      })]
    })
  })
  expect(checks.length).toBeGreaterThan(15)
  expect(checks.filter(check => check.ratio < check.threshold)).toEqual([])
})
