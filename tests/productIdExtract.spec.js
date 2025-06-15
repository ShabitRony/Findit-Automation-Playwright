import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage.js';
import { saveProductIdToFile, readProductId } from '../utils/fileUtil.js';
import { saveFinalizedVideo } from '../utils/videoHelper.js';

test.describe('Smoke Suite', () => {
  test('Extract product ID and save to file @smoke', async ({ page }) => {
    await page.goto('https://base99.findit.id/product/8b1a0a28-770c-4444-bf1b-4b8083e83bd5');

    const productPage = new BasePage(page);
    const productId = await productPage.getProductIdFromUrl();
    saveProductIdToFile(productId);

    expect(productId).toMatch(/^[0-9a-fA-F-]{36}$/); // UUID format
  });

  test.afterEach(async ({}, testInfo) => {
    await saveFinalizedVideo(testInfo);
  });
});

test.describe('Regression Suite', () => {
  test('Extract product ID and save to file @regression', async ({ page }) => {
    await page.goto('https://base99.findit.id/product/8b1a0a28-770c-4444-bf1b-4b8083e83bd5');

    const productPage = new BasePage(page);
    const productId = await productPage.getProductIdFromUrl();

    saveProductIdToFile(productId);

    expect(productId).toMatch(/^[0-9a-fA-F-]{36}$/); // UUID format
   
  });

  test('Visit product page using product ID from file @regression', async ({ page }) => {
    const basePage = new BasePage(page);

    const productId = readProductId();
    console.log('Read Product ID:', productId);

    await basePage.goToProductPage(productId);

    await expect(page).toHaveURL(new RegExp(`/product/${productId}`));

  });
 test.afterEach(async ({}, testInfo) => {
    await saveFinalizedVideo(testInfo);
  });
});
