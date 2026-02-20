import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should load with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Morse Code/i);
  });

  test('should show text input', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#text-input')).toBeVisible();
  });

  test('should show morse input', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#morse-input')).toBeVisible();
  });

  test('should show play button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#play-btn')).toBeVisible();
  });

  test('should show speed control', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#speed-slider')).toBeVisible();
  });
});
