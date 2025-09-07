import { Page, expect } from '@playwright/test';
import { selectors } from '../helpers/selectors';

export class FilterPage {
  constructor(private page: Page, private url: string) {}
  // Открытие страницы с игрушками для кошек
  async open() {
    await this.page.goto(this.url);
  }
  // Применение фильтра "Barksi" и ожидание загрузки страницы
  async applyBarksiFilter() {
    const barksiFilter = this.page.locator(selectors.barksiFilterItem);
    await barksiFilter.click();
    await this.page.waitForLoadState('networkidle');
  }
  // Валидация скидочных цен после применения фильтра
  async validateDiscountedPrices() {
    // Получаем локаторы для старой цены, новой цены и лейбла скидки
    const oldPriceLocators = this.page.locator(selectors.oldPrice);
    const newPriceLocators = this.page.locator(selectors.newPrice);
    const discountLabelLocators = this.page.locator(selectors.discountLabel);
    // Считаем количество товаров с указанными ценами
    const count = await oldPriceLocators.count();
    // Проверяем, что айтемов ровно 5
    expect(count).toBe(5);
    // Проходимся по каждому товару
    for (let i = 0; i < count; i++) {
      const oldPriceText = (await oldPriceLocators.nth(i).textContent())?.trim() ?? '';
      const newPriceText = (await newPriceLocators.nth(i).textContent())?.trim() ?? '';
      const discountLabel = (await discountLabelLocators.nth(i).textContent())?.trim() ?? '';
      // Проверяем, что скидка содержит "95"
      if (!discountLabel.includes('95')) {
        throw new Error(`Ожидали, что скидка будет содержать "95", но получили: "${discountLabel}"`);
      }
      // Для первого товара проверяем, что новая цена начинается с "3"
      if (i === 0) {
        expect(newPriceText.startsWith('3')).toBeTruthy();
      }
    }
  }
}