import { expect, test, type Page } from '@playwright/test'

/** Opens the main navigation on mobile (sheet menu) or uses the desktop nav bar. */
async function navigateTo(page: Page, linkName: string, isMobile: boolean) {
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('dialog').getByRole('link', { name: linkName }).click()
  } else {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: linkName }).click()
  }
}

test('landing page links to sign-up and validates the form', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('university community')

  await page.getByRole('link', { name: /get started/i }).click()
  await expect(page).toHaveURL(/\/signup$/)
  await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible()

  await page.getByRole('button', { name: 'Create account' }).click()
  await expect(page.getByText('Use at least 2 characters.')).toBeVisible()
})

test('signed-in shell navigates dashboard → discover → group → post', async ({ page, isMobile }) => {
  await page.goto('/dashboard')
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()

  await navigateTo(page, 'Discover', isMobile)
  await expect(page).toHaveURL(/\/discover$/)
  await page.getByRole('searchbox', { name: /search universities/i }).fill('georgia')
  await expect(page.getByText('1 result for “georgia”')).toBeVisible()

  await navigateTo(page, 'Dashboard', isMobile)
  await page.getByRole('link', { name: 'University of Michigan-Ann Arbor' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'University of Michigan-Ann Arbor' })).toBeVisible()

  await page.getByRole('link', { name: 'Ask me anything about North Campus housing' }).click()
  await expect(page.getByRole('heading', { name: /comments \(3\)/i })).toBeVisible()
})

test('unknown routes show the 404 page', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
})
