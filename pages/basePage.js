export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async getProductIdFromUrl() {
    const url = this.page.url();
    const productId = url.split('/').pop();
    return productId;
  }
  
  async goToProductPage(productId) {
    const url = `https://base99.findit.id/product/${productId}`;
    await this.page.goto(url);
  }
}
