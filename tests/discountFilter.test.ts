import { test } from '@playwright/test';
import { fixtures } from '../helpers/fixtures';
import { FilterPage } from '../pages/FilterPage';
import { interceptBarksiAPI } from '../mocks/barksiInterceptor';
import { isBarksiFilterAPIRequest } from '../helpers/urlMatchers';


test('Discount filtering with mocked API @regression', async ({ page }) => {
    const filterPage = new FilterPage(page);
    await page.route((url) => isBarksiFilterAPIRequest(url), (route) => interceptBarksiAPI(route));
    await page.goto(fixtures.url);
    await filterPage.applyBarksiFilter();
    await filterPage.validateDiscountedPrices();
});
