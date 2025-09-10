import { Page, expect } from '@playwright/test';
import { selectors } from '../helpers/selectors';

export class FilterPage {
  constructor(private page: Page) {}

  async applyBarksiFilter() {
    const barksiFilter = this.page.locator(selectors.barksiFilterItem);
    await barksiFilter.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateDiscountedPrices() {
    const oldPriceLocators = this.page.locator(selectors.oldPrice);
    const newPriceLocators = this.page.locator(selectors.newPrice);
    const discountLabelLocators = this.page.locator(selectors.discountLabel);
    const count = await oldPriceLocators.count();
    expect(count).toBe(5);
    for (let i = 0; i < count; i++) {
      const newPriceText = (await newPriceLocators.nth(i).textContent())?.trim() ?? '';
      const discountLabel = (await discountLabelLocators.nth(i).textContent())?.trim() ?? '';
      if (!discountLabel.includes('95')) {
        throw new Error(`Ожидали, что скидка будет содержать "95", но получили: "${discountLabel}"`);
      }
      if (i === 0) {
        expect(newPriceText.startsWith('3')).toBeTruthy();
      }
    }
  }
}