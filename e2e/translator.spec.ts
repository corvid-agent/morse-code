import { test, expect } from '@playwright/test';

test.describe('Translator', () => {
  test('should convert text to morse', async ({ page }) => {
    await page.goto('/');
    await page.locator('#text-input').click();
    await page.locator('#text-input').pressSequentially('SOS');
    await expect(page.locator('#morse-input')).toHaveValue(/\.\.\.\s/);
  });

  test('should show reference chart toggle', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#ref-toggle')).toBeVisible();
  });

  test('should toggle reference chart', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('#ref-toggle');
    await toggle.scrollIntoViewIfNeeded();
    await toggle.click();
    await expect(page.locator('#ref-grid')).toHaveClass(/open/);
    await expect(page.locator('#ref-grid')).toBeVisible();
  });

  test('should show copy buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#copy-morse-btn')).toBeVisible();
    await expect(page.locator('#copy-text-btn')).toBeVisible();
  });

  test('should show playback bar', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#playback-bar')).toBeAttached();
  });

  test('should show speed value', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#speed-val')).toBeVisible();
  });
});
