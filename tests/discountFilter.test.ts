import { test } from '@playwright/test';
import { fixtures } from '../helpers/fixtures';
import { FilterPage } from '../pages/FilterPage';
import { interceptBarksiAPI } from '../mocks/barksiInterceptor';
import { isBarksiFilterAPIRequest } from '../helpers/urlMatchers';


test('Discount filtering with mocked API @regression', async ({ page }) => {
    // Создаём объект страницы фильтрации и передаём ей текущую страницу браузера + URL
    const filterPage = new FilterPage(page, fixtures.url);
    // Перехватываем сетевые запросы к API фильтра Barksi
    // isBarksiFilterAPIRequest — проверяет, является ли запрос нужным
    // interceptBarksiAPI — возвращает мокнутый (подменённый) ответ
    await page.route(
        (url) => isBarksiFilterAPIRequest(url),
        (route) => interceptBarksiAPI(route)
    );
    // Открываем страницу с игрушками
    await filterPage.open();
    // Применяем фильтр "Barksi" и ждём, пока страница загрузится
    await filterPage.applyBarksiFilter();
    // Валидируем, что на странице корректно отображаются скидочные цены
    await filterPage.validateDiscountedPrices();
});
