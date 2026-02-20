import { test, expect } from '@playwright/test';

test.describe('App – basic loading and key elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Morse Code Translator');
  });

  test('should display the header heading and subtitle', async ({ page }) => {
    const heading = page.locator('header h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('morse code');

    const subtitle = page.locator('header p');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('translator');
  });

  test('should display the text input panel', async ({ page }) => {
    const textInput = page.locator('#text-input');
    await expect(textInput).toBeVisible();
    await expect(textInput).toHaveAttribute('placeholder', 'Type your message here...');
  });

  test('should display the morse input panel', async ({ page }) => {
    const morseInput = page.locator('#morse-input');
    await expect(morseInput).toBeVisible();
    await expect(morseInput).toHaveAttribute('placeholder', 'Type dots (.) and dashes (-) ...');
  });

  test('should display the swap direction button', async ({ page }) => {
    await expect(page.locator('#swap-btn')).toBeVisible();
  });

  test('should display the play button', async ({ page }) => {
    const playBtn = page.locator('#play-btn');
    await expect(playBtn).toBeVisible();
    await expect(page.locator('#play-label')).toHaveText('play');
  });

  test('should display the speed slider with default value of 15', async ({ page }) => {
    const slider = page.locator('#speed-slider');
    await expect(slider).toBeVisible();
    await expect(slider).toHaveValue('15');
    await expect(page.locator('#speed-val')).toHaveText('15');
  });

  test('should display copy morse and copy text buttons', async ({ page }) => {
    await expect(page.locator('#copy-morse-btn')).toBeVisible();
    await expect(page.locator('#copy-text-btn')).toBeVisible();
  });

  test('should display the playback visualization bar', async ({ page }) => {
    await expect(page.locator('#playback-bar')).toBeVisible();
  });

  test('should display the reference chart toggle', async ({ page }) => {
    const toggle = page.locator('#ref-toggle');
    await expect(toggle).toBeVisible();
    await expect(toggle).toContainText('reference chart');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('should display the footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('corvid-agent');
  });
});
