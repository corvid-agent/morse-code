import { test, expect } from '@playwright/test';

test.describe('Translator – text to morse encoding', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should encode "SOS" to "... --- ..."', async ({ page }) => {
    const textInput = page.locator('#text-input');
    const morseInput = page.locator('#morse-input');

    await textInput.fill('SOS');
    await textInput.dispatchEvent('input');

    await expect(morseInput).toHaveValue('... --- ...');
  });

  test('should encode "HELLO" to morse code', async ({ page }) => {
    const textInput = page.locator('#text-input');
    const morseInput = page.locator('#morse-input');

    await textInput.fill('HELLO');
    await textInput.dispatchEvent('input');

    // H=.... E=. L=.-.. L=.-.. O=---
    await expect(morseInput).toHaveValue('.... . .-.. .-.. ---');
  });

  test('should handle lowercase input the same as uppercase', async ({ page }) => {
    const textInput = page.locator('#text-input');
    const morseInput = page.locator('#morse-input');

    await textInput.fill('hi');
    await textInput.dispatchEvent('input');

    // H=.... I=..
    await expect(morseInput).toHaveValue('.... ..');
  });

  test('should encode words separated by spaces using /', async ({ page }) => {
    const textInput = page.locator('#text-input');
    const morseInput = page.locator('#morse-input');

    await textInput.fill('A B');
    await textInput.dispatchEvent('input');

    // A=.- space=/ B=-...
    await expect(morseInput).toHaveValue('.- / -...');
  });

  test('should generate playback symbols when encoding', async ({ page }) => {
    const textInput = page.locator('#text-input');

    await textInput.fill('E');
    await textInput.dispatchEvent('input');

    // E is a single dot, so playback bar should have a .dot symbol
    const dots = page.locator('#playback-bar .sym.dot');
    await expect(dots).toHaveCount(1);
  });
});

test.describe('Translator – morse to text decoding', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Switch to morse-to-text mode by clicking swap
    await page.locator('#swap-btn').click();
  });

  test('should decode "... --- ..." to "SOS"', async ({ page }) => {
    const textInput = page.locator('#text-input');
    const morseInput = page.locator('#morse-input');

    await morseInput.fill('... --- ...');
    await morseInput.dispatchEvent('input');

    await expect(textInput).toHaveValue('SOS');
  });

  test('should decode ".... . .-.. .-.. ---" to "HELLO"', async ({ page }) => {
    const textInput = page.locator('#text-input');
    const morseInput = page.locator('#morse-input');

    await morseInput.fill('.... . .-.. .-.. ---');
    await morseInput.dispatchEvent('input');

    await expect(textInput).toHaveValue('HELLO');
  });

  test('should decode words separated by / into spaces', async ({ page }) => {
    const textInput = page.locator('#text-input');
    const morseInput = page.locator('#morse-input');

    await morseInput.fill('.- / -...');
    await morseInput.dispatchEvent('input');

    await expect(textInput).toHaveValue('A B');
  });
});

test.describe('Translator – clear and swap functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should clear text input and update morse output', async ({ page }) => {
    const textInput = page.locator('#text-input');
    const morseInput = page.locator('#morse-input');

    // Type something first
    await textInput.fill('SOS');
    await textInput.dispatchEvent('input');
    await expect(morseInput).toHaveValue('... --- ...');

    // Clear the text input
    await textInput.fill('');
    await textInput.dispatchEvent('input');
    await expect(morseInput).toHaveValue('');
  });

  test('should swap direction from text-to-morse to morse-to-text', async ({ page }) => {
    const morseInput = page.locator('#morse-input');
    const textInput = page.locator('#text-input');

    // Initially, morse input should be read-only
    await expect(morseInput).toHaveAttribute('readonly', '');

    // Click swap
    await page.locator('#swap-btn').click();

    // Now morse input should be editable
    await expect(morseInput).not.toHaveAttribute('readonly', '');

    // And text input should be read-only
    await expect(textInput).toHaveAttribute('readonly', '');
  });

  test('should swap back to text-to-morse on double swap', async ({ page }) => {
    const morseInput = page.locator('#morse-input');
    const textInput = page.locator('#text-input');

    await page.locator('#swap-btn').click();
    await page.locator('#swap-btn').click();

    // Back to default: text editable, morse read-only
    await expect(textInput).not.toHaveAttribute('readonly', '');
    await expect(morseInput).toHaveAttribute('readonly', '');
  });

  test('should open and close the reference chart', async ({ page }) => {
    const toggle = page.locator('#ref-toggle');
    const grid = page.locator('#ref-grid');

    // Initially closed
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(grid).not.toHaveClass(/open/);

    // Open it
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(grid).toHaveClass(/open/);

    // Verify reference items exist (A-Z = 26, 0-9 = 10 = 36 total)
    await expect(grid.locator('.ref-item')).toHaveCount(36);

    // Close it
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(grid).not.toHaveClass(/open/);
  });

  test('should update speed value when slider changes', async ({ page }) => {
    const slider = page.locator('#speed-slider');
    const speedVal = page.locator('#speed-val');

    // Default is 15
    await expect(speedVal).toHaveText('15');

    // Change slider to 25
    await slider.fill('25');
    await slider.dispatchEvent('input');
    await expect(speedVal).toHaveText('25');
  });
});
